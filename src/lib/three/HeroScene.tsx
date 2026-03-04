"use client";
import { useRef, useMemo, useEffect, Suspense, Component, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ─── Configure Draco decoder (handles Draco-compressed GLBs) ─────────────────
useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

// ─── Error boundary so GLB failures never kill the whole canvas ───────────────
interface EBState { hasError: boolean }
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  EBState
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ─── Fallback gem shown while GLB streams or if it errors ─────────────────────
function GemFallback() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.4;
  });
  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[1.0, 0]} />
      <meshStandardMaterial
        color={0xD4A017} emissive={0x1A3A8F}
        emissiveIntensity={0.6} roughness={0.2} metalness={0.9} wireframe
      />
    </mesh>
  );
}

// ─── Microscope GLB ───────────────────────────────────────────────────────────
function MicroscopeModel() {
  const { scene } = useGLTF("/models/microscope.glb");
  const ref = useRef<THREE.Group>(null);

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const upgrade = (m: THREE.Material) => {
          const mat = (m as THREE.MeshStandardMaterial).clone();
          (mat as THREE.MeshStandardMaterial).metalness = Math.max(
            (mat as THREE.MeshStandardMaterial).metalness ?? 0, 0.55
          );
          (mat as THREE.MeshStandardMaterial).roughness = Math.min(
            (mat as THREE.MeshStandardMaterial).roughness ?? 1, 0.45
          );
          return mat;
        };
        mesh.material = Array.isArray(mesh.material)
          ? mesh.material.map(upgrade)
          : upgrade(mesh.material);
      }
    });
    return c;
  }, [scene]);

  const [scale, offset] = useMemo(() => {
    const box  = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const s = maxDim > 0 ? 2.6 / maxDim : 1;
    const center = new THREE.Vector3();
    box.getCenter(center);
    return [s, center];
  }, [cloned]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.18;
    ref.current.position.y = Math.sin(t * 0.7) * 0.12;
  });

  return (
    <group
      ref={ref}
      scale={[scale, scale, scale]}
      position={[-offset.x * scale, -offset.y * scale, -offset.z * scale]}
    >
      <primitive object={cloned} />
    </group>
  );
}
useGLTF.preload("/models/microscope.glb");

// ─── Star Field ───────────────────────────────────────────────────────────────
function StarField() {
  const pointsObj = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r     = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: 0xaaccff, size: 0.045, transparent: true, opacity: 0.75, sizeAttenuation: true }),
    );
  }, []);
  useFrame((_, dt) => { pointsObj.rotation.y += dt * 0.018; });
  return <primitive object={pointsObj} />;
}

// ─── Orbiting shapes ──────────────────────────────────────────────────────────
const ORBIT_CONFIG = [
  { geo: "tetrahedron", r: 2.6, speed: 0.50, phase: 0,             tilt: 0.3,  color: 0xD4A017, size: 0.20 },
  { geo: "octahedron",  r: 3.0, speed: 0.35, phase: Math.PI / 2,   tilt: -0.4, color: 0x4488ff, size: 0.18 },
  { geo: "icosahedron", r: 3.3, speed: 0.28, phase: Math.PI,       tilt: 0.5,  color: 0x44ddaa, size: 0.16 },
  { geo: "tetrahedron", r: 2.8, speed: 0.42, phase: Math.PI * 1.5, tilt: -0.3, color: 0xff6688, size: 0.17 },
] as const;

function OrbitingShape({ r, speed, phase, color, size, geo }: typeof ORBIT_CONFIG[number]) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const a = t * speed + phase;
    ref.current.position.set(Math.cos(a) * r, Math.sin(a * 0.6) * 0.6, Math.sin(a) * r * 0.5);
    ref.current.rotation.x += 0.015;
    ref.current.rotation.y += 0.010;
  });
  const geoNode = useMemo(() => {
    if (geo === "octahedron")  return <octahedronGeometry args={[size, 0]} />;
    if (geo === "icosahedron") return <icosahedronGeometry args={[size, 0]} />;
    return <tetrahedronGeometry args={[size, 0]} />;
  }, [geo, size]);
  return (
    <mesh ref={ref}>
      {geoNode}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} metalness={0.7} transparent opacity={0.9} />
    </mesh>
  );
}

// ─── Orbit rings ──────────────────────────────────────────────────────────────
function OrbitRing({ r, tilt }: { r: number; tilt: number }) {
  const lineObj = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r * 0.5));
    }
    const obj = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: 0xD4A017, transparent: true, opacity: 0.14 }),
    );
    obj.rotation.x = tilt;
    return obj;
  }, [r, tilt]);
  return <primitive object={lineObj} />;
}

// ─── Mouse parallax group ─────────────────────────────────────────────────────
function SceneGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse    = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / size.width  - 0.5) * 2;
      mouse.current.y = -(e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [size]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.current.x * 0.28 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (mouse.current.y * 0.14 - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <StarField />
      <ModelErrorBoundary fallback={<GemFallback />}>
        <Suspense fallback={<GemFallback />}>
          <MicroscopeModel />
        </Suspense>
      </ModelErrorBoundary>
      {ORBIT_CONFIG.map((cfg, i) => <OrbitingShape key={i} {...cfg} />)}
      {ORBIT_CONFIG.map((cfg, i) => <OrbitRing key={i} r={cfg.r} tilt={cfg.tilt} />)}
    </group>
  );
}

// ─── Canvas export ────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 55 }}
      style={{ width: "100%", height: "100%", display: "block", background: "transparent" }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[ 3,  4,  3]} intensity={3.0} color={0xD4A017} />
      <pointLight position={[-3, -2, -3]} intensity={1.5} color={0x4466ff} />
      <pointLight position={[ 0,  0,  5]} intensity={0.8} color={0xffffff} />
      <pointLight position={[ 0,  4,  0]} intensity={1.2} color={0xffeebb} />
      <pointLight position={[ 2, -3,  2]} intensity={0.9} color={0x44aaff} />
      <SceneGroup />
    </Canvas>
  );
}
