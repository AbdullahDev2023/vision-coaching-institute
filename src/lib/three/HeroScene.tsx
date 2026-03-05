"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// ─── Microscope loader — raw GLTFLoader + DRACOLoader, no useGLTF ─────────────
function MicroscopeModel() {
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [error, setError] = useState(false);
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/models/microscope.glb",
      (gltf) => {
        const scene = gltf.scene;
        scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const upgrade = (m: THREE.Material) => {
              const mat = (m as THREE.MeshStandardMaterial).clone();
              (mat as THREE.MeshStandardMaterial).metalness = Math.max((mat as THREE.MeshStandardMaterial).metalness ?? 0, 0.55);
              (mat as THREE.MeshStandardMaterial).roughness = Math.min((mat as THREE.MeshStandardMaterial).roughness ?? 1, 0.45);
              return mat;
            };
            mesh.material = Array.isArray(mesh.material) ? mesh.material.map(upgrade) : upgrade(mesh.material);
          }
        });
        // Auto-scale and centre
        const box = new THREE.Box3().setFromObject(scene);
        const size = new THREE.Vector3();
        box.getSize(size);
        const s = 4.5 / Math.max(size.x, size.y, size.z, 0.001);
        scene.scale.setScalar(s * 2.2);
        const center = new THREE.Vector3();
        box.getCenter(center);
        scene.position.set(-center.x * s * 2.2, -center.y * s * 2.2, -center.z * s * 2.2);
        scene.rotation.y = Math.PI / 2;   // right side faces viewer
        scene.rotation.x = -0.25;          // tilt slightly inward
        setModel(scene);
      },
      undefined,
      (err) => { console.error("GLB load error:", err); setError(true); }
    );
    return () => { dracoLoader.dispose(); };
  }, []);

  // Gentle idle bob animation (only when not being dragged)
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 0.7) * 0.10;
  });

  if (!model && !error) return <GemFallback />;
  if (error || !model) return <GemFallback />;
  return <group ref={ref}><primitive object={model as THREE.Group} /></group>;
}

// ─── Fallback gem ─────────────────────────────────────────────────────────────
function GemFallback() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.4;
  });
  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[1.0, 0]} />
      <meshStandardMaterial color={0xD4A017} emissive={0x1A3A8F} emissiveIntensity={0.6} roughness={0.2} metalness={0.9} wireframe />
    </mesh>
  );
}

// ─── Star Field ───────────────────────────────────────────────────────────────
function StarField() {
  const pointsObj = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xaaccff, size: 0.045, transparent: true, opacity: 0.75, sizeAttenuation: true }));
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
    const a = state.clock.getElapsedTime() * speed + phase;
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

// ─── Canvas export ────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.75], fov: 55 }}
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

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.08}
        rotateSpeed={0.7}
        zoomSpeed={1.2}
        minDistance={1.5}
        maxDistance={12}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.9}
        makeDefault
      />

      <StarField />
      <MicroscopeModel />
      {ORBIT_CONFIG.map((cfg, i) => <OrbitingShape key={i} {...cfg} />)}
      {ORBIT_CONFIG.map((cfg, i) => <OrbitRing key={i} r={cfg.r} tilt={cfg.tilt} />)}
    </Canvas>
  );
}
