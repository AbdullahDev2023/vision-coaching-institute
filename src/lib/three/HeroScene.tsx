"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Central Atom: nucleus + 3 electron rings + 3 electrons ───────────────────
function AcademicAtom() {
  const groupRef = useRef<THREE.Group>(null);

  // Electron positions (one per ring)
  const eRefs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];

  const rings = useMemo(() => [
    { tilt: new THREE.Euler(0,   0,   0),           speed: 0.80, color: 0xD4A017 },
    { tilt: new THREE.Euler(Math.PI / 3, 0, 0),     speed: 0.60, color: 0x4488ff },
    { tilt: new THREE.Euler(-Math.PI / 4, Math.PI / 6, 0), speed: 0.95, color: 0x44ddaa },
  ], []);

  const ringObjects = useMemo(() =>
    rings.map(({ tilt, color }) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * 1.7, Math.sin(a) * 1.7, 0));
      }
      const obj = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 }),
      );
      obj.rotation.copy(tilt);
      return obj;
    }), [rings]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Slow bob + gentle spin of whole atom
    groupRef.current.rotation.y = t * 0.12;
    groupRef.current.position.y = Math.sin(t * 0.65) * 0.08;

    // Animate each electron along its ring
    eRefs.forEach((ref, i) => {
      if (!ref.current) return;
      const angle = t * rings[i].speed;
      const local = new THREE.Vector3(Math.cos(angle) * 1.7, Math.sin(angle) * 1.7, 0);
      local.applyEuler(rings[i].tilt);
      ref.current.position.copy(local);
    });
  });

  return (
    <group ref={groupRef}>
      {/* Nucleus */}
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color={0xD4A017}
          emissive={0xD4A017}
          emissiveIntensity={0.55}
          roughness={0.18}
          metalness={0.88}
        />
      </mesh>
      {/* Nucleus inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.58, 24, 24]} />
        <meshStandardMaterial
          color={0xFFE080}
          emissive={0xD4A017}
          emissiveIntensity={0.22}
          transparent
          opacity={0.12}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Rings */}
      {ringObjects.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}

      {/* Electrons */}
      {eRefs.map((ref, i) => (
        <mesh key={i} ref={ref}>
          <sphereGeometry args={[0.10, 16, 16]} />
          <meshStandardMaterial
            color={rings[i].color}
            emissive={rings[i].color}
            emissiveIntensity={0.9}
            roughness={0.1}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Star Field ───────────────────────────────────────────────────────────────
function StarField() {
  const pointsObj = useMemo(() => {
    const count = 2000;
    const pos   = new Float32Array(count * 3);
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
    const t = state.clock.getElapsedTime();
    const a = t * speed + phase;
    if (!ref.current) return;
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
      <AcademicAtom />
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
