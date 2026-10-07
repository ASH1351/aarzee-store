'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Compass } from 'lucide-react';
import { PerfumeBottleCanvas } from '@/components/3d/PerfumeBottleCanvas';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#050505]">
      {/* Cinematic Red Rim & Burgundy Backlight Ambient Gradients */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-red/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-brand-burgundy/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-red opacity-30 pointer-events-none" />

      {/* Subtle Luxury Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.85)_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-140px)]">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 sm:space-y-8 pt-6 lg:pt-0">
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/5 max-w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.25em] text-brand-gold uppercase">
                THE ART OF FRAGRANCE
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-1"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-white leading-[1.08]">
                WEAR YOUR <br />
                <span className="gold-gradient-text font-serif italic font-medium">
                  SIGNATURE.
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-mono tracking-[0.3em] text-brand-muted/80 uppercase pt-2">
                HAUTE PARFUMERIE • PURE ATTAR OILS
              </p>
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-brand-muted text-base sm:text-lg max-w-xl leading-relaxed font-light"
            >
              Discover timeless attars and refined fragrances crafted to leave an unforgettable impression.
              Distilled in traditional copper alembics, perfected for modern royalty.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link
                href="/shop"
                className="py-4 px-8 rounded-full bg-brand-red hover:bg-brand-red-bright text-white uppercase tracking-[0.2em] text-xs font-semibold transition-all duration-300 shadow-red-glow flex items-center justify-center gap-3 group"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/attars"
                className="py-4 px-8 rounded-full border border-brand-gold/40 hover:border-brand-gold text-brand-white hover:text-white uppercase tracking-[0.2em] text-xs font-medium transition-all duration-300 bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2"
              >
                <span>DISCOVER ATTARS</span>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg"
            >
              <div className="flex flex-col">
                <span className="font-serif text-lg font-medium text-white">100% Pure</span>
                <span className="text-[11px] text-brand-muted">Artisanal Distillation</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-4">
                <span className="font-serif text-lg font-medium text-brand-gold">16+ Hours</span>
                <span className="text-[11px] text-brand-muted">Obsidian Longevity</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-4">
                <span className="font-serif text-lg font-medium text-white">Kannauj & Assam</span>
                <span className="text-[11px] text-brand-muted">Heritage Roots</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Perfume Bottle Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 relative w-full h-[450px] sm:h-[540px] lg:h-[620px] flex items-center justify-center"
          >
            {/* 3D Bottle Canvas */}
            <PerfumeBottleCanvas
              className="w-full h-full"
              liquidColor="#D90000"
              accentColor="#C8A96B"
              scale={1.45}
              rotationSpeed={0.35}
            />

            {/* Subtle Interactive Label Tag at bottom */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-brand-muted uppercase flex items-center gap-2 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-ping" />
              <span>3D STUDIO • MOVE CURSOR TO TILT</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
