import React from 'react';
import { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { AttarExperience } from '@/components/home/AttarExperience';
import { Sparkles, Droplets, ShieldCheck, Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Traditional Indian Attars | 100% Pure Perfume Oils',
  description:
    'Experience authentic, non-alcoholic Indian attars distilled in Kannauj copper stills. Pure Rose Oud, aged Assam agarwood, and botanical musks.',
};

export default function AttarsPage() {
  const attarProducts = PRODUCTS.filter(
    (p) => p.type.includes('Attar') || p.category === 'Signature Attars'
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            HERITAGE BOTANICAL OILS
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight font-normal">
            THE ATTAR ATELIER
          </h1>
          <p className="text-brand-muted text-base sm:text-lg mt-4 font-light leading-relaxed">
            Pure, non-alcoholic perfume oils distilled via sacred Deg &amp; Bhapka methods in Kannauj and Upper Assam.
            Applied with a glass wand to bond intimately with your body heat.
          </p>

          <div className="mt-8 flex justify-center gap-6 text-xs text-brand-gold font-mono uppercase tracking-wider flex-wrap">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-brand-red" /> 0% Synthetic Alcohol
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-brand-gold" /> Woodfire Distilled
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-red" /> 18+ Hours Longevity
            </span>
          </div>
        </div>

        {/* Attar Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {attarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Attar Story Experience */}
      <AttarExperience />
    </div>
  );
}
