import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Shield, Compass, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story & Heritage | The Art of Fragrance',
  description:
    'Learn about the founding ethos of AARZEE STORE. Preserving Indian attar heritage, Kannauj hydro-distillation, and modern haute perfumery.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-40 left-1/3 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            THE HOUSE CHRONICLES
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight font-normal leading-[1.08]">
            ROOTED IN TRADITION. <br />
            <span className="gold-gradient-text italic font-medium">REFINED FOR ETERNITY.</span>
          </h1>
          <p className="text-brand-muted text-base sm:text-lg mt-6 font-light leading-relaxed">
            AARZEE STORE was founded on a singular conviction: that true luxury is not ephemeral marketing,
            but time, rare nature, and ancestral Indian distillation elevated to world-class art.
          </p>
        </div>

        {/* Hero Visual Display */}
        <div className="relative h-[420px] sm:h-[540px] rounded-3xl overflow-hidden border border-white/10 mb-20 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1800&auto=format&fit=crop"
            alt="Kannauj Artisan Perfumery Alembics"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase">
                THE HISTORIC CRADLE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                Kannauj, Uttar Pradesh &amp; Golaghat, Assam
              </h3>
            </div>
            <div className="text-xs font-mono text-brand-muted">
              EST. HERITAGE ARCHIVES // 2026
            </div>
          </div>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono tracking-widest text-brand-gold uppercase">
              PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal leading-tight">
              More than a scent. A sacred personal aura.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-brand-muted text-base sm:text-lg font-light leading-relaxed">
            <p>
              In antiquity, royal durbars of the subcontinent were anointed with custom attars distilled from
              thousands of Damask rose petals, rare ambergris, and resinous wild agarwood. These formulas were not
              formulated to mask odors, but to express supreme sovereignty, serenity, and spiritual presence.
            </p>
            <p>
              Over the last century, much of global perfumery succumbed to petrochemical aldehydes and mass-produced
              synthetic shortcuts. At AARZEE STORE, we resurrect the uncompromising standards of royal perfumery:
              distilling in centuries-old copper cauldrons sealed with mud, cooling in sandalwood receiver flasks,
              and aging each batch until its sharpness transforms into velvet.
            </p>
          </div>
        </div>

        {/* Three Guiding Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10 mb-20">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#111] to-[#080808] border border-white/5 space-y-4">
            <Shield className="w-6 h-6 text-brand-gold" />
            <h4 className="font-serif text-xl text-white">Unadulterated Purity</h4>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              We never dilute our attars with synthetic carriers or mineral oils. When you purchase an AARZEE oil,
              you experience 100% pure botanical and resinous concentration.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#111] to-[#080808] border border-white/5 space-y-4">
            <Compass className="w-6 h-6 text-brand-red" />
            <h4 className="font-serif text-xl text-white">Ethical Stewardship</h4>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Our musks are 100% cruelty-free botanical ambrettes. Our sandalwood is sourced exclusively from sustainable
              government plantations in Mysore with verifiable replanting certificates.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#111] to-[#080808] border border-white/5 space-y-4">
            <Heart className="w-6 h-6 text-brand-gold" />
            <h4 className="font-serif text-xl text-white">Artisanal Empowerment</h4>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              We work hand-in-hand with multi-generational master distillers in Kannauj and Assam, preserving indigenous
              alembic techniques that have withstood centuries of changing tides.
            </p>
          </div>
        </div>

        {/* CTA to Shop */}
        <div className="text-center pt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 py-4 px-10 rounded-full bg-brand-red hover:bg-brand-red-bright text-white uppercase tracking-[0.2em] text-xs font-semibold transition-all shadow-red-glow group"
          >
            <span>DISCOVER THE FLACONS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
