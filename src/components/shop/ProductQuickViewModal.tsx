'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Heart, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Product, ProductSize } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/utils';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductQuickViewModal({ product, isOpen, onClose }: ProductQuickViewModalProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<ProductSize>('30ml');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product || !isOpen) return null;

  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];
  const activePrice = currentSizeObj.price;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#090909] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 my-8 text-white"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-white/10 text-brand-muted hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Visual Flacon Side */}
            <div className="relative h-[320px] md:h-full min-h-[380px] bg-gradient-to-b from-[#141414] to-[#080808] flex items-center justify-center p-8 overflow-hidden">
              <div
                className="absolute inset-0 opacity-30 blur-[90px] pointer-events-none"
                style={{ backgroundColor: product.bottleColor || '#D90000' }}
              />
              <div className="relative w-full h-full max-w-[280px]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-brand-gold uppercase">
                  {product.type}
                </span>
              </div>
            </div>

            {/* Product Details Side */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <span className="text-xs text-brand-muted">
                    {product.rating} ({product.reviewCount} connoisseurs)
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                  {product.name}
                </h3>
                <p className="text-xs text-brand-gold tracking-widest uppercase font-mono mt-1">
                  {product.subtitle}
                </p>

                <p className="text-xs text-brand-muted mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Fragrance Pyramid Summary */}
                <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1.5">
                  <div className="flex">
                    <span className="w-16 font-mono text-[10px] text-brand-gold uppercase">TOP:</span>
                    <span className="text-brand-white">{product.topNotes.join(' · ')}</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 font-mono text-[10px] text-brand-red uppercase">HEART:</span>
                    <span className="text-brand-white">{product.heartNotes.join(' · ')}</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 font-mono text-[10px] text-amber-500 uppercase">BASE:</span>
                    <span className="text-brand-white">{product.baseNotes.join(' · ')}</span>
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-5">
                  <label className="block text-[11px] font-mono tracking-wider text-brand-muted mb-2">
                    SELECT VOLUME / BOTTLE SIZE:
                  </label>
                  <div className="flex gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.size}
                        onClick={() => setSelectedSize(s.size)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                          selectedSize === s.size
                            ? 'border-brand-red bg-brand-red/15 text-white font-semibold'
                            : 'border-white/10 text-brand-muted hover:border-white/20'
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-serif text-2xl text-brand-gold font-medium">
                    {formatPrice(activePrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-brand-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-[10px] text-brand-muted uppercase font-mono">
                    (Inclusive of all luxury taxes)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-brand-red hover:bg-brand-red-bright text-white uppercase tracking-widest text-xs font-semibold transition-all shadow-red-glow flex items-center justify-center gap-2"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    inWishlist
                      ? 'border-brand-red bg-brand-red/15 text-brand-red'
                      : 'border-white/10 text-brand-muted hover:text-white hover:border-white/25'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-brand-red' : ''}`} />
                </button>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="p-3.5 rounded-xl border border-white/10 hover:border-white/30 text-white text-xs flex items-center justify-center transition-colors"
                  title="Full Details Page"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
