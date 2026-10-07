'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/utils';
import { ProductQuickViewModal } from './ProductQuickViewModal';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(false)}
        className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#111111] to-[#0a0a0a] border border-white/5 hover:border-brand-red/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-luxury overflow-hidden"
        data-cursor-label="VIEW"
      >
        {/* Ambient Red Glow on Card Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 30%, rgba(217, 0, 0, 0.18) 0%, transparent 70%)`,
          }}
        />

        {/* Top Badges & Wishlist Button */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            {product.isBestSeller && (
              <span className="text-[9px] font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-brand-red text-white uppercase font-semibold shadow-sm">
                SIGNATURE
              </span>
            )}
            <span className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-brand-gold uppercase">
              {product.type.split(' ')[0]}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-label="Save to wishlist"
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-brand-muted hover:text-brand-red hover:border-brand-red/50 transition-colors"
          >
            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-brand-red text-brand-red' : ''}`} />
          </button>
        </div>

        {/* Flacon Visual */}
        <Link
          href={`/product/${product.slug}`}
          className="relative h-64 sm:h-72 w-full flex items-center justify-center p-6 overflow-hidden block"
        >
          <div className="relative w-full h-full max-h-[220px]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain drop-shadow-xl transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Quick View Hover Pill */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsQuickViewOpen(true);
            }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 shadow-lg"
          >
            <Eye className="w-3 h-3" />
            Quick Inspect
          </button>
        </Link>

        {/* Content Section */}
        <div className="p-5 pt-2 flex flex-col justify-between flex-1 border-t border-white/5">
          <div>
            <div className="flex items-center justify-between text-xs text-brand-muted mb-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gold/80">
                {product.family}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                <span className="font-medium text-white">{product.rating}</span>
                <span className="text-[10px] text-brand-muted">({product.reviewCount})</span>
              </div>
            </div>

            <Link href={`/product/${product.slug}`}>
              <h3 className="font-serif text-lg font-medium text-white group-hover:text-brand-white transition-colors">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-brand-muted line-clamp-2 mt-1 leading-relaxed font-light">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing & Add to Bag CTA */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <div>
              <div className="font-serif text-lg text-brand-gold font-medium">
                {formatPrice(product.price)}
              </div>
              <div className="text-[10px] font-mono text-brand-muted">
                From {product.sizes[0].size}
              </div>
            </div>

            <button
              onClick={() => addToCart(product, product.sizes[0].size, 1)}
              className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-brand-red text-white text-xs uppercase tracking-wider font-medium border border-white/10 hover:border-brand-red transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:shadow-red-glow"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
