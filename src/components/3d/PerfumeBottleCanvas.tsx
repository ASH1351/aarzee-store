'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import { PerfumeBottleModel, FragranceMistParticles } from './PerfumeBottleModel';
import Image from 'next/image';

interface PerfumeBottleCanvasProps {
  className?: string;
  liquidColor?: string;
  accentColor?: string;
  interactive?: boolean;
  scale?: number;
  rotationSpeed?: number;
  showParticles?: boolean;
  fallbackImage?: string;
}

export function PerfumeBottleCanvas({
  className = 'w-full h-full min-h-[420px]',
  liquidColor = '#D90000',
  accentColor = '#C8A96B',
  interactive = true,
  scale = 1.35,
  rotationSpeed = 0.5,
  showParticles = true,
  fallbackImage = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
}: PerfumeBottleCanvasProps) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [webglSupported, setWebglSupported] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  if (!isClient) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="w-16 h-16 rounded-full border-2 border-brand-red border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!webglSupported) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
        <Image
          src={fallbackImage}
          alt="AARZEE Luxury Fragrance Flacon"
          fill
          className="object-contain p-8 drop-shadow-2xl"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-radial-red opacity-40 pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative select-none ${className}`}
      data-cursor-label="EXPLORE"
    >
      {/* Cinematic Red Rim Glow Layer in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-brand-red/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-brand-burgundy/40 blur-[60px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0.4, 5.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.7} color="#fff6e8" />
        {/* Key Golden Rim Light */}
        <directionalLight position={[-4, 6, 3]} intensity={2.4} color="#f2dfb3" castShadow />
        {/* Soft Front Fill */}
        <directionalLight position={[0, 2, 4]} intensity={1.2} color="#ffffff" />
        {/* Dramatic Back Red Rim Light */}
        <pointLight position={[0, -0.5, -2.5]} intensity={6.5} color="#e00000" distance={8} />
        {/* Golden Bottom Sparkle */}
        <pointLight position={[2, -2, 2]} intensity={1.5} color="#c8a96b" distance={6} />

        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.3}>
            <PerfumeBottleModel
              liquidColor={liquidColor}
              accentColor={accentColor}
              interactive={interactive}
              mousePosition={mousePos}
              scale={scale}
              rotationSpeed={rotationSpeed}
            />
          </Float>

          {showParticles && (
            <>
              <FragranceMistParticles count={45} color="#E00000" />
              <FragranceMistParticles count={25} color="#DFC28B" />
            </>
          )}

          <ContactShadows
            position={[0, -1.9, 0]}
            opacity={0.65}
            scale={6}
            blur={2.5}
            far={3.5}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
