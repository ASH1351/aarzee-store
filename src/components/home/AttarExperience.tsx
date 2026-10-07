'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, Droplets, Clock, Sparkles } from 'lucide-react';

export function AttarExperience() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#040404] text-white overflow-hidden border-b border-white/5">
      {/* Background ambient warm gold & burgundy lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-burgundy/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle geometric luxury pattern watermark */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C8A96B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Presentation Flacon / Deg Still */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#120b0b] to-[#060404] p-8 flex items-center justify-center shadow-2xl">
              {/* Subtle Ornamental Gold Framing */}
              <div className="absolute inset-4 rounded-2xl border border-brand-gold/20 pointer-events-none" />
              <div className="absolute top-6 left-6 text-[10px] font-mono tracking-widest text-brand-gold uppercase">
                TRADITIONAL HYDRO-DISTILLATION
              </div>
              <div className="absolute bottom-6 right-6 text-[10px] font-mono tracking-widest text-brand-muted/70 uppercase">
                EST. KANNAUJ, INDIA
              </div>

              {/* Attar Flacon Image */}
              <div className="relative w-full h-full max-w-[340px]">
                <Image
                  src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1200&auto=format&fit=crop"
                  alt="AARZEE Pure Rose Oud Traditional Attar Flacon"
                  fill
                  className="object-cover rounded-xl opacity-90 drop-shadow-2xl"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-10 left-10 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 max-w-[220px]">
                <div className="flex items-center gap-1.5 text-brand-gold text-xs font-mono mb-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>100% PURE OIL</span>
                </div>
                <p className="text-[11px] text-brand-muted leading-relaxed">
                  Zero Alcohol. Nourishing botanical base that absorbs directly into the skin.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-mono tracking-[0.25em] uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                HERITAGE CRAFTSMANSHIP
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-white font-normal leading-tight">
                THE SOUL OF ATTAR
              </h2>
              <p className="text-brand-gold font-serif italic text-lg sm:text-xl mt-3">
                Rooted in tradition. Refined for the modern world.
              </p>
            </div>

            <div className="space-y-4 text-brand-muted text-base font-light leading-relaxed">
              <p>
                <strong className="text-white font-serif font-medium">What is Attar?</strong>{' '}
                Attar is a traditional fragrance distilled through time-honoured craftsmanship,
                creating a rich and intimate scent experience unadulterated by evaporating alcohol or synthetic boosters.
              </p>
              <p>
                In the historic perfume capital of Kannauj, wild damask roses, aged Assam agarwood, and exotic spices
                are sealed inside massive copper stills (<span className="italic text-white">Deg</span>) with river clay.
                Over slow wood embers, the fragrant steam journeys through bamboo pipes into pure sandalwood receiver vessels (<span className="italic text-white">Bhapka</span>) submerged in cold water baths.
              </p>
            </div>

            {/* 3 Heritage Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <Flame className="w-5 h-5 text-brand-red mb-2" />
                <h4 className="font-serif text-sm font-medium text-white">Copper Alembic</h4>
                <p className="text-[11px] text-brand-muted mt-1 leading-snug">
                  Slow-fire hydro-distillation without modern scorching heat.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <Droplets className="w-5 h-5 text-brand-gold mb-2" />
                <h4 className="font-serif text-sm font-medium text-white">Non-Alcoholic</h4>
                <p className="text-[11px] text-brand-muted mt-1 leading-snug">
                  Pure concentrated perfume oil that binds to your personal skin chemistry.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <Clock className="w-5 h-5 text-brand-red mb-2" />
                <h4 className="font-serif text-sm font-medium text-white">Aged 3 Seasons</h4>
                <p className="text-[11px] text-brand-muted mt-1 leading-snug">
                  Matured in camel-skin leather flacons to round sharp edges into silk.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/attars"
                className="inline-flex items-center gap-3 py-4 px-8 rounded-full bg-brand-red hover:bg-brand-red-bright text-white uppercase tracking-[0.2em] text-xs font-semibold transition-all shadow-red-glow group"
              >
                <span>EXPLORE ATTARS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
