'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PerfumeBottleModelProps {
  bottleColor?: string;
  liquidColor?: string;
  accentColor?: string;
  interactive?: boolean;
  mousePosition?: { x: number; y: number };
  scale?: number;
  rotationSpeed?: number;
}

export function PerfumeBottleModel({
  liquidColor = '#D90000',
  accentColor = '#C8A96B',
  interactive = true,
  mousePosition,
  scale = 1,
  rotationSpeed = 0.4,
}: PerfumeBottleModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const capRef = useRef<THREE.Group>(null);

  // Subtle floating and rotation animation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Gentle continuous idle rotation
    groupRef.current.rotation.y += delta * rotationSpeed * 0.5;

    // Mouse tilt interaction if enabled
    if (interactive && mousePosition) {
      const targetRotX = (mousePosition.y - 0.5) * 0.3;
      const targetRotZ = -(mousePosition.x - 0.5) * 0.3;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.05);
    }

    // Subtle breathing float on Y
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;

    // Liquid subtle pulsation
    if (liquidRef.current) {
      const mat = liquidRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat && mat.emissiveIntensity !== undefined) {
        mat.emissiveIntensity = 0.35 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  // Materials
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0f0a0a'),
        metalness: 0.1,
        roughness: 0.12,
        transmission: 0.72,
        ior: 1.54,
        thickness: 0.6,
        transparent: true,
        opacity: 0.92,
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
      }),
    []
  );

  const liquidMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(liquidColor),
        emissive: new THREE.Color('#3A0000'),
        emissiveIntensity: 0.4,
        roughness: 0.15,
        metalness: 0.1,
        transmission: 0.5,
        transparent: true,
        opacity: 0.88,
        ior: 1.33,
      }),
    [liquidColor]
  );

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentColor),
        metalness: 0.95,
        roughness: 0.22,
      }),
    [accentColor]
  );

  const blackCeramicMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#080808'),
        metalness: 0.4,
        roughness: 0.25,
      }),
    []
  );

  return (
    <group ref={groupRef} scale={scale} dispose={null} position={[0, -0.4, 0]}>
      {/* 1. Heavy Obsidian/Black Glass Outer Flacon */}
      <mesh castShadow receiveShadow material={glassMaterial} position={[0, 0.8, 0]}>
        <boxGeometry args={[1.6, 2.2, 0.9, 2, 2, 2]} />
      </mesh>

      {/* 2. Glass Base Heavy Chamfer */}
      <mesh material={glassMaterial} position={[0, -0.35, 0]}>
        <boxGeometry args={[1.65, 0.2, 0.95]} />
      </mesh>

      {/* 3. Deep Ruby Red Liquid Core */}
      <mesh ref={liquidRef} material={liquidMaterial} position={[0, 0.7, 0]}>
        <boxGeometry args={[1.35, 1.8, 0.7]} />
      </mesh>

      {/* 4. Glass Dip Tube (Inner Spray Straw) */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.7, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.35}
          roughness={0.1}
        />
      </mesh>

      {/* 5. Shoulder Bevel & Neck Transition */}
      <mesh material={goldMaterial} position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0.42, 0.55, 0.15, 32]} />
      </mesh>

      {/* 6. Gold Atomizer Neck Ring */}
      <mesh material={goldMaterial} position={[0, 2.08, 0]}>
        <cylinderGeometry args={[0.32, 0.35, 0.2, 32]} />
      </mesh>

      {/* 7. Heavy Luxury Cap (Black & Gold) */}
      <group ref={capRef} position={[0, 2.45, 0]}>
        {/* Cap Base Ring */}
        <mesh material={goldMaterial} position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.46, 0.46, 0.08, 32]} />
        </mesh>
        {/* Main Monolith Cap Body */}
        <mesh material={blackCeramicMaterial} position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.9, 0.75, 0.75]} />
        </mesh>
        {/* Cap Top Gold Inset */}
        <mesh material={goldMaterial} position={[0, 0.53, 0]}>
          <boxGeometry args={[0.82, 0.04, 0.68]} />
        </mesh>
      </group>

      {/* 8. Front Metallic Aarzee Signature Badge */}
      <group position={[0, 0.85, 0.46]}>
        {/* Badge Border */}
        <mesh material={goldMaterial}>
          <boxGeometry args={[1.05, 1.25, 0.02]} />
        </mesh>
        {/* Inner Black Plate */}
        <mesh material={blackCeramicMaterial} position={[0, 0, 0.012]}>
          <boxGeometry args={[0.98, 1.18, 0.01]} />
        </mesh>
        {/* Red Brand Accent Bar */}
        <mesh position={[0, 0.38, 0.02]}>
          <boxGeometry args={[0.4, 0.04, 0.01]} />
          <meshStandardMaterial color="#D90000" emissive="#900000" emissiveIntensity={0.6} />
        </mesh>
        {/* Gold Monogram Accent */}
        <mesh position={[0, 0, 0.02]}>
          <ringGeometry args={[0.18, 0.22, 32]} />
          <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// Micro fragrance particles floating in ambient air
export function FragranceMistParticles({ count = 60, color = '#E00000' }: { count?: number; color?: string }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      sc[i] = Math.random() * 0.06 + 0.02;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const array = positionsAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Drift upwards
      array[i * 3 + 1] += delta * 0.18;
      // Gentle drift sideways
      array[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.002;

      // Wrap around
      if (array[i * 3 + 1] > 3.5) {
        array[i * 3 + 1] = -2.5;
        array[i * 3] = (Math.random() - 0.5) * 4;
      }
    }
    positionsAttr.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
