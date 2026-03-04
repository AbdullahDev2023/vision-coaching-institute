"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Particle Star Field ─────────────────────────────────────────────────────
function StarField() {
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const pointsObj = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0xaaccff, size: 0.04, transparent: true, opacity: 0.7, sizeAttenuation: true });
    return new THREE.Points(geo, mat);
  }, [positions]);

  useFrame((_, dt) => { pointsObj.rotation.y += dt * 0.02; });
  return <primitive object={pointsObj} />;
}

// ─── Central Dodecahedron ─────────────────────────────────────────────────────
function CentralGem() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const glowRef  = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRef.current) { outerRef.current.rotation.y = t * 0.3; outerRef.current.rotation.x = Math.sin(t * 0.2) * 0.2; }
    if (innerRef.current) { innerRef.current.rotation.y = -t * 0.2; innerRef.current.rotation.z = t * 0.15; }
    if (glowRef.current)  { glowRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.04); }
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color={0x1A3A8F} transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial color={0x0A1F5C} emissive={0x1A3A8F} emissiveIntensity={0.6} roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh ref={outerRef}>
        <dodecahedronGeometry args={[1.1, 0]} />
        <meshBasicMaterial color={0xD4A017} wireframe />
      </mesh>
      <mesh rotation={[0.4, 0.4, 0]}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial color={0xF0C842} wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// ─── Orbiting Shapes ─────────────────────────────────────────────────────────
const ORBIT_CONFIG = [
  { geo: "tetrahedron", r: 2.4, speed: 0.5,  phase: 0,             tilt: 0.3,  color: 0xD4A017, size: 0.22 },
  { geo: "octahedron",  r: 2.8, speed: 0.35, phase: Math.PI / 2,   tilt: -0.4, color: 0x4488ff, size: 0.20 },
  { geo: "icosahedron", r: 3.1, speed: 0.28, phase: Math.PI,       tilt: 0.5,  color: 0x44ddaa, size: 0.18 },
  { geo: "tetrahedron", r: 2.6, speed: 0.42, phase: Math.PI * 1.5, tilt: -0.3, color: 0xff6688, size: 0.19 },
] as const;

function OrbitingShape({ r, speed, phase, color, size, geo }: typeof ORBIT_CONFIG[number]) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t  = state.clock.getElapsedTime();
    const a  = t * speed + phase;
    if (ref.current) {
      ref.current.position.set(Math.cos(a) * r, Math.sin(a * 0.6) * 0.6, Math.sin(a) * r * 0.5);
      ref.current.rotation.x += 0.015;
      ref.current.rotation.y += 0.01;
    }
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

// ─── Orbit Rings ──────────────────────────────────────────────────────────────
function OrbitRing({ r, tilt }: { r: number; tilt: number }) {
  const lineObj = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r * 0.5));
    }
    const obj = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: 0xD4A017, transparent: true, opacity: 0.12 })
    );
    obj.rotation.x = tilt;
    return obj;
  }, [r, tilt]);
  return <primitive object={lineObj} />;
}

// ─── Mouse Parallax Group ─────────────────────────────────────────────────────
function SceneGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse    = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useMemo(() => {
    if (typeof window === "undefined") return;
    const h = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / size.width  - 0.5) * 2;
      mouse.current.y = -(e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [size]);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.current.x * 0.3  - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (mouse.current.y * 0.15 - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <StarField />
      <CentralGem />
      {ORBIT_CONFIG.map((cfg, i) => <OrbitingShape key={i} {...cfg} />)}
      {ORBIT_CONFIG.map((cfg, i) => <OrbitRing key={i} r={cfg.r} tilt={cfg.tilt} />)}
    </group>
  );
}

// ─── Exported Canvas ──────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }} style={{ background: "transparent" }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]}   intensity={2}   color={0xD4A017} />
      <pointLight position={[-3, -2, -3]} intensity={1}   color={0x4466ff} />
      <pointLight position={[0, 0, 4]}   intensity={0.5} color={0xffffff} />
      <SceneGroup />
    </Canvas>
  );
}
