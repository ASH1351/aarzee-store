'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FragranceCategory } from '@/types/product';

export function FeaturedCollection() {
  const [activeCategory, setActiveCategory] = useState<string>('All Fragrances');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All Fragrances') {
      return PRODUCTS.slice(0, 6);
    }
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070707] border-b border-white/5 overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-red/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-burgundy/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              CURATED HAUTE COLLECTION
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white font-normal">
              THE AARZEE COLLECTION
            </h2>
            <p className="text-brand-muted text-sm sm:text-base mt-3 font-light">
              Crafted for moments that deserve to be remembered. Each formulation is steeped
              in natural botanicals and aged agarwood essences.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-brand-gold hover:text-white transition-colors pb-1 border-b border-brand-gold/40 hover:border-white self-start md:self-end"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase font-mono tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-red text-white shadow-red-glow font-medium'
                    : 'bg-white/5 text-brand-muted hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
