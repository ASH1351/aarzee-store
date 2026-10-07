'use client';

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { PerfumeBottleModel, FragranceMistParticles } from './PerfumeBottleModel';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface NoteItem {
  stage: 'TOP NOTES' | 'HEART NOTES' | 'BASE NOTES';
  notes: string;
  description: string;
  position: 'top-left' | 'center-right' | 'bottom-left';
  bottleTarget: 'cap' | 'heart' | 'base';
}

const NOTES_DATA: NoteItem[] = [
  {
    stage: 'TOP NOTES',
    notes: 'Bergamot · Saffron · Citrus',
    description: 'Crisp luminous opening, radiating warm saffron threads and cold-pressed citrus zest.',
    position: 'top-left',
    bottleTarget: 'cap',
  },
  {
    stage: 'HEART NOTES',
    notes: 'Taif Rose · Jasmine Sambac · Aged Oud',
    description: 'Opulent floral-woody core, steeped over rare Assam agarwood and royal Taif petals.',
    position: 'center-right',
    bottleTarget: 'heart',
  },
  {
    stage: 'BASE NOTES',
    notes: 'Smoked Amber · White Musk · Sandalwood',
    description: 'Enduring sacred trail of golden ambergris and creamy Mysore sandalwood lasting over 16 hours.',
    position: 'bottom-left',
    bottleTarget: 'base',
  },
];

export function EssenceShowcase3D() {
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [liquidColor, setLiquidColor] = useState('#D90000');

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-brand-black overflow-hidden border-t border-b border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-brand-burgundy/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            3D Interactive Experience
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white mb-4">
            THE ESSENCE OF AARZEE
          </h2>
          <p className="text-brand-muted text-base sm:text-lg font-light leading-relaxed">
            Drag to rotate the flacon in full 360°. Explore the tripartite olfactory architecture,
            from radiant top aromatics to deep sacred base resins.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-brand-muted/70 mt-3">
            <Compass className="w-3.5 h-3.5 text-brand-gold" />
            <span>Interactive 360° Studio Orbit • Touch or Drag to Inspect</span>
          </div>
        </div>

        {/* 3D Bottle & Floating Annotations Stage */}
        <div className="relative min-h-[520px] md:min-h-[640px] rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0a0a] to-[#040404] p-4 sm:p-8 flex items-center justify-center shadow-2xl overflow-hidden">
          {/* Subtle Grid Watermark / Coordinates */}
          <div className="absolute top-4 left-6 text-[10px] tracking-widest text-brand-muted/40 uppercase font-mono">
            FLACON SPECIFICATION // REF. RZ-2026-OUD
          </div>
          <div className="absolute top-4 right-6 text-[10px] tracking-widest text-brand-gold/60 uppercase font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            32% EXTRAIT CONCENTRATION
          </div>

          {/* Interactive Three.js Canvas */}
          <div className="w-full h-[450px] sm:h-[550px] md:h-[600px] cursor-grab active:cursor-grabbing">
            <Canvas
              camera={{ position: [0, 0.4, 5.0], fov: 40 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <ambientLight intensity={0.6} color="#ffe8d1" />
              <directionalLight position={[-4, 5, 4]} intensity={2.2} color="#fcedd2" />
              <directionalLight position={[4, 2, 2]} intensity={1.0} color="#ffffff" />
              <pointLight position={[0, -0.6, -3]} intensity={7.0} color="#e00000" distance={9} />
              <pointLight position={[0, 2.5, 1]} intensity={2.0} color="#c8a96b" />

              <Suspense fallback={null}>
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.7}
                  rotateSpeed={0.8}
                />
                <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
                  <PerfumeBottleModel
                    scale={1.45}
                    liquidColor={liquidColor}
                    accentColor="#C8A96B"
                    rotationSpeed={0.15}
                  />
                </Float>
                <FragranceMistParticles count={50} color="#E00000" />
                <ContactShadows
                  position={[0, -2.0, 0]}
                  opacity={0.7}
                  scale={6}
                  blur={2.4}
                  far={3.8}
                  color="#000000"
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Floating Notes Annotations (Desktop Layout with Connecting Lines) */}
          <div className="absolute inset-0 pointer-events-none p-6 md:p-10 flex flex-col justify-between">
            {/* Top Note: Top Left */}
            <div className="max-w-xs pointer-events-auto self-start bg-black/75 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-brand-gold/60 transition-all shadow-xl group">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                <span className="text-[11px] font-mono tracking-widest text-brand-gold uppercase">
                  {NOTES_DATA[0].stage}
                </span>
              </div>
              <h4 className="text-white font-serif text-lg font-medium group-hover:text-brand-gold transition-colors">
                {NOTES_DATA[0].notes}
              </h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                {NOTES_DATA[0].description}
              </p>
              <div className="mt-2 text-[10px] text-brand-muted/70 tracking-wider">
                EVAPORATION: 0 – 30 MINUTES
              </div>
            </div>

            {/* Heart Note: Center Right */}
            <div className="max-w-xs pointer-events-auto self-end bg-black/75 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-brand-red/60 transition-all shadow-xl group">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest text-brand-red uppercase">
                  {NOTES_DATA[1].stage}
                </span>
              </div>
              <h4 className="text-white font-serif text-lg font-medium group-hover:text-brand-red transition-colors">
                {NOTES_DATA[1].notes}
              </h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                {NOTES_DATA[1].description}
              </p>
              <div className="mt-2 text-[10px] text-brand-muted/70 tracking-wider">
                LONGEVITY: 30 MIN – 6 HOURS
              </div>
            </div>

            {/* Base Note: Bottom Left */}
            <div className="max-w-xs pointer-events-auto self-start bg-black/75 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-brand-gold/60 transition-all shadow-xl group">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <span className="text-[11px] font-mono tracking-widest text-brand-gold-light uppercase">
                  {NOTES_DATA[2].stage}
                </span>
              </div>
              <h4 className="text-white font-serif text-lg font-medium group-hover:text-brand-gold-light transition-colors">
                {NOTES_DATA[2].notes}
              </h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                {NOTES_DATA[2].description}
              </p>
              <div className="mt-2 text-[10px] text-brand-muted/70 tracking-wider">
                TENACITY: 6 – 24+ HOURS
              </div>
            </div>
          </div>

          {/* Interactive Liquid Hue Selector at bottom right */}
          <div className="absolute bottom-4 right-6 pointer-events-auto hidden sm:flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-[10px] text-brand-muted font-mono tracking-wider">FLUID ESSENCE:</span>
            <button
              onClick={() => setLiquidColor('#D90000')}
              className={`w-4 h-4 rounded-full border ${liquidColor === '#D90000' ? 'ring-2 ring-white scale-110' : 'opacity-70'} transition-all`}
              style={{ backgroundColor: '#D90000' }}
              title="Royal Ruby Oud"
            />
            <button
              onClick={() => setLiquidColor('#4A0000')}
              className={`w-4 h-4 rounded-full border ${liquidColor === '#4A0000' ? 'ring-2 ring-white scale-110' : 'opacity-70'} transition-all`}
              style={{ backgroundColor: '#4A0000' }}
              title="Dark Burgundy Saffron"
            />
            <button
              onClick={() => setLiquidColor('#C8A96B')}
              className={`w-4 h-4 rounded-full border ${liquidColor === '#C8A96B' ? 'ring-2 ring-white scale-110' : 'opacity-70'} transition-all`}
              style={{ backgroundColor: '#C8A96B' }}
              title="Golden Amber Nectar"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
