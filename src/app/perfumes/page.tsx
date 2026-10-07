import React from 'react';
import { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { Sparkles, Crown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Luxury Perfumes & Extraits | Haute Parfumerie',
  description:
    'Discover concentrated Extrait de Parfum and Eau de Parfum creations by AARZEE STORE. Featuring Aarzee Royal Oud, Noir, and Imperial.',
};

export default function PerfumesPage() {
  const perfumeProducts = PRODUCTS.filter(
    (p) => p.type.includes('Extrait') || p.type.includes('Eau de Parfum')
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            HIGH-CONCENTRATION EXTRAITS
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight font-normal">
            HAUTE PERFUMES
          </h1>
          <p className="text-brand-muted text-base sm:text-lg mt-4 font-light leading-relaxed">
            Formulated at exceptional extrait concentrations (28%–33% pure fragrance compounds)
            for commanding sillage, atomic projection, and multi-faceted dry-downs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {perfumeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
