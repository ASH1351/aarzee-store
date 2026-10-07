'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ChevronLeft, ChevronRight, Star, Sparkles, ArrowRight } from 'lucide-react';

const SHOWCASE_PRODUCTS = PRODUCTS.filter((p) =>
  ['aarzee-royal-oud', 'aarzee-noir', 'aarzee-rose-oud', 'aarzee-amber', 'aarzee-imperial', 'aarzee-musk'].includes(p.id)
);

export function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();
  const currentProduct = SHOWCASE_PRODUCTS[currentIndex];

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_PRODUCTS.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_PRODUCTS.length) % SHOWCASE_PRODUCTS.length);
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-b border-white/5">
      {/* Background cinematic aura matching current bottle's color */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProduct.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] pointer-events-none"
          style={{ backgroundColor: currentProduct.bottleColor }}
        />
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              CINEMATIC SPOTLIGHT
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-normal">
              THE SHOWCASE
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-widest text-brand-muted mr-3">
              0{currentIndex + 1} / 0{SHOWCASE_PRODUCTS.length}
            </span>
            <button
              onClick={prevProduct}
              aria-label="Previous fragrance"
              className="p-3 rounded-full border border-white/10 hover:border-brand-gold text-white hover:bg-white/5 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextProduct}
              aria-label="Next fragrance"
              className="p-3 rounded-full border border-white/10 hover:border-brand-gold text-white hover:bg-white/5 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cinematic Main Display Card */}
        <div className="relative rounded-3xl bg-[#0a0a0a]/90 border border-white/10 p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Center Flacon Display (Large) */}
            <div className="lg:col-span-6 relative h-[380px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, scale: 0.88, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full max-w-[380px]"
                >
                  <Image
                    src={currentProduct.images[0]}
                    alt={currentProduct.name}
                    fill
                    priority
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Watermark Monogram behind */}
              <div className="absolute font-serif text-[180px] font-bold text-white/[0.02] select-none pointer-events-none">
                RZ
              </div>
            </div>

            {/* Right Information & Notes Pyramid */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono tracking-[0.25em] text-brand-gold uppercase">
                      {currentProduct.family} • {currentProduct.type}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                      <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                      <span className="text-white font-medium">{currentProduct.rating}</span>
                      <span>({currentProduct.reviewCount} Reviews)</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal leading-tight">
                      {currentProduct.name}
                    </h3>
                    <p className="text-sm font-mono tracking-widest text-brand-muted uppercase mt-2">
                      {currentProduct.subtitle}
                    </p>
                  </div>

                  <p className="text-brand-muted text-sm sm:text-base leading-relaxed font-light">
                    {currentProduct.description}
                  </p>

                  {/* Fragrance Notes Breakdown Card */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-2 border-b border-white/5">
                      <span className="font-mono text-xs uppercase tracking-widest text-brand-gold w-24">
                        TOP NOTES:
                      </span>
                      <span className="text-sm text-white font-medium">
                        {currentProduct.topNotes.join(' · ')}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-2 border-b border-white/5">
                      <span className="font-mono text-xs uppercase tracking-widest text-brand-red w-24">
                        HEART NOTES:
                      </span>
                      <span className="text-sm text-white font-medium">
                        {currentProduct.heartNotes.join(' · ')}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-amber-500 w-24">
                        BASE NOTES:
                      </span>
                      <span className="text-sm text-white font-medium">
                        {currentProduct.baseNotes.join(' · ')}
                      </span>
                    </div>
                  </div>

                  {/* Price & Purchase Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="font-serif text-3xl text-brand-gold font-medium">
                        {formatPrice(currentProduct.price)}
                      </div>
                      <div className="text-[11px] font-mono text-brand-muted">
                        Extrait Concentration • Complimentary Velvet Coffret
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => addToCart(currentProduct, currentProduct.sizes[0].size, 1)}
                        className="py-4 px-8 rounded-full bg-brand-red hover:bg-brand-red-bright text-white uppercase tracking-widest text-xs font-semibold transition-all shadow-red-glow flex items-center justify-center gap-2 group"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add To Bag</span>
                      </button>

                      <Link
                        href={`/product/${currentProduct.slug}`}
                        className="p-4 rounded-full border border-white/15 hover:border-white text-white transition-colors"
                        title="View Full Scent Profile"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Select Thumbnails Bar */}
          <div className="mt-10 pt-6 border-t border-white/5 flex items-center gap-3 overflow-x-auto scrollbar-none">
            {SHOWCASE_PRODUCTS.map((prod, idx) => (
              <button
                key={prod.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl border text-left transition-all ${
                  currentIndex === idx
                    ? 'border-brand-red bg-brand-red/10 text-white'
                    : 'border-white/5 text-brand-muted hover:border-white/20'
                }`}
              >
                <span className="font-mono text-[10px] text-brand-gold">0{idx + 1}</span>
                <span className="font-serif text-xs truncate max-w-[120px]">{prod.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
