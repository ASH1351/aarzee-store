'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function BrandStory() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#040404] text-white overflow-hidden border-b border-white/5">
      {/* Background imagery with luxury dark overlay */}
      <div className="absolute inset-0 z-0 opacity-20 filter grayscale contrast-125">
        <Image
          src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1800&auto=format&fit=crop"
          alt="Kannauj Fragrance Still Atmosphere"
          fill
          className="object-cover"
        />
      </div>

      {/* Atmospheric Vignette & Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60 z-0" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-mono tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            THE PHILOSOPHY
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-white font-normal leading-[1.08]">
            MORE THAN A <br />
            <span className="gold-gradient-text italic font-medium">FRAGRANCE.</span>
          </h2>

          <div className="space-y-6 text-brand-white/90 text-lg sm:text-xl font-serif font-light leading-relaxed">
            <p className="text-xl sm:text-2xl text-white font-normal">
              A fragrance is more than a scent. <br />
              It is memory. <br />
              It is presence. <br />
              It is identity.
            </p>

            <p className="text-brand-muted text-base sm:text-lg font-sans font-light leading-relaxed">
              AARZEE STORE brings together traditional attar craftsmanship and modern fragrance culture
              to create scents made to become part of your story. Every formulation begins with wild agarwood,
              Kannauj rose hydro-distillates, and sacred Mysore sandalwood, slow-aged until it achieves supreme resonance.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/about"
              className="py-4 px-8 rounded-full bg-brand-red hover:bg-brand-red-bright text-white uppercase tracking-[0.2em] text-xs font-semibold transition-all shadow-red-glow flex items-center gap-3 group"
            >
              <span>DISCOVER OUR STORY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-brand-muted">
              <span className="w-8 h-[1px] bg-brand-gold/50" />
              <span>THE ROYAL HOUSE OF AARZEE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
