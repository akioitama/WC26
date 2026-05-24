"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/**
 * 3D football scene used in the hero. Lazy-mounted via next/dynamic.
 */
function HoloBall() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.45;
    group.current.rotation.x += delta * 0.12;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.8) * 0.2;
  });

  return (
    <group ref={group}>
      {/* Outer ball */}
      <mesh>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#0d6dff"
          roughness={0.25}
          metalness={0.65}
          emissive="#2bd2ff"
          emissiveIntensity={0.4}
          flatShading
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshBasicMaterial color="#3affd9" wireframe transparent opacity={0.5} />
      </mesh>
      {/* Inner glow core */}
      <mesh>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshBasicMaterial color="#3affd9" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function Rings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (a.current) a.current.rotation.x += delta * 0.5;
    if (b.current) b.current.rotation.y += delta * 0.4;
    if (c.current) c.current.rotation.z += delta * 0.6;
  });
  return (
    <group>
      <mesh ref={a} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.4, 0.012, 8, 96]} />
        <meshBasicMaterial color="#2bd2ff" transparent opacity={0.7} />
      </mesh>
      <mesh ref={b} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[2.7, 0.008, 8, 96]} />
        <meshBasicMaterial color="#f5c451" transparent opacity={0.55} />
      </mesh>
      <mesh ref={c} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[3.1, 0.006, 8, 96]} />
        <meshBasicMaterial color="#3affd9" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function StadiumScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 5]} intensity={0.9} color="#bfe6ff" />
      <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#f5c451" />
      <Suspense fallback={null}>
        <HoloBall />
        <Rings />
        <Stars
          radius={50}
          depth={20}
          count={1200}
          factor={3}
          saturation={0}
          fade
          speed={0.3}
        />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}
