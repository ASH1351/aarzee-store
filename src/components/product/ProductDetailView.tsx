'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, ChevronDown, ChevronUp, ShieldCheck, Truck, RotateCcw, Droplets, Sparkles, Check } from 'lucide-react';
import { Product, ProductSize } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/utils';
import { PerfumeBottleCanvas } from '@/components/3d/PerfumeBottleCanvas';
import { ProductCard } from '@/components/shop/ProductCard';
import { PRODUCTS } from '@/data/products';
import { CheckoutModal } from '@/components/cart/CheckoutModal';

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0].size);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'3d' | 'image'>('3d');
  const [openAccordion, setOpenAccordion] = useState<string | null>('notes');
  const [isInstantCheckoutOpen, setIsInstantCheckoutOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];
  const activePrice = currentSizeObj.price;

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    setIsInstantCheckoutOpen(true);
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20">
      {/* Background ambient lighting */}
      <div
        className="absolute top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-25"
        style={{ backgroundColor: product.bottleColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-brand-muted mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/${product.type.includes('Attar') ? 'attars' : 'perfumes'}`} className="hover:text-white transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-brand-gold">{product.name}</span>
        </nav>

        {/* Top Product Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: 3D Flacon Interactive Viewer & Images */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="relative min-h-[480px] sm:min-h-[560px] rounded-3xl bg-gradient-to-b from-[#111] to-[#070707] border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Mode Toggle Button (3D View vs Still Photo) */}
              <div className="absolute top-4 left-4 z-20 flex gap-2 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10">
                <button
                  onClick={() => setActiveTab('3d')}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all ${
                    activeTab === '3d'
                      ? 'bg-brand-red text-white'
                      : 'text-brand-muted hover:text-white'
                  }`}
                >
                  3D STUDIO
                </button>
                <button
                  onClick={() => setActiveTab('image')}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all ${
                    activeTab === 'image'
                      ? 'bg-brand-red text-white'
                      : 'text-brand-muted hover:text-white'
                  }`}
                >
                  STILL GALLERY
                </button>
              </div>

              {activeTab === '3d' ? (
                <div className="w-full h-full min-h-[520px]">
                  <PerfumeBottleCanvas
                    className="w-full h-full"
                    liquidColor={product.bottleColor}
                    accentColor="#C8A96B"
                    scale={1.5}
                    rotationSpeed={0.3}
                  />
                </div>
              ) : (
                <div className="relative w-full h-full max-w-[360px] p-8">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Specifications, Notes & Purchase Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono tracking-[0.25em] text-brand-gold uppercase">
                  {product.category} • {product.family}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-brand-gold">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <span className="text-white font-medium">{product.rating}</span>
                  <span className="text-brand-muted">({product.reviewCount})</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal leading-tight">
                {product.name}
              </h1>

              <p className="text-sm font-mono tracking-widest text-brand-gold-light uppercase mt-2">
                {product.subtitle}
              </p>

              {/* Price display */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl text-brand-gold font-medium">
                  {formatPrice(activePrice)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-brand-muted line-through font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-[10px] font-mono text-brand-muted tracking-wider">
                  ALL TAXES INCLUDED
                </span>
              </div>

              <p className="text-brand-muted text-sm sm:text-base leading-relaxed mt-4 font-light">
                {product.description}
              </p>

              {/* Fragrance Profile Snapshot */}
              <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                <div className="flex text-xs">
                  <span className="w-20 font-mono text-brand-gold uppercase tracking-wider">TOP:</span>
                  <span className="text-white">{product.topNotes.join(' · ')}</span>
                </div>
                <div className="flex text-xs">
                  <span className="w-20 font-mono text-brand-red uppercase tracking-wider">HEART:</span>
                  <span className="text-white">{product.heartNotes.join(' · ')}</span>
                </div>
                <div className="flex text-xs">
                  <span className="w-20 font-mono text-amber-500 uppercase tracking-wider">BASE:</span>
                  <span className="text-white">{product.baseNotes.join(' · ')}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono tracking-wider text-brand-muted uppercase">
                    BOTTLE SIZE / VOLUME:
                  </label>
                  <span className="text-xs font-mono text-brand-gold">{selectedSize}</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-3 rounded-xl border text-xs font-mono flex flex-col items-center justify-center transition-all ${
                        selectedSize === s.size
                          ? 'border-brand-red bg-brand-red/15 text-white font-semibold shadow-red-glow'
                          : 'border-white/10 text-brand-muted hover:border-white/20'
                      }`}
                    >
                      <span className="text-sm">{s.size}</span>
                      <span className="text-[10px] text-brand-gold mt-0.5">{formatPrice(s.price)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mt-6 flex items-center gap-4">
                <label className="text-xs font-mono tracking-wider text-brand-muted uppercase">
                  QUANTITY:
                </label>
                <div className="flex items-center border border-white/10 rounded-xl bg-black/40 px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 text-brand-muted hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 text-brand-muted hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTAs: ADD TO BAG & BUY NOW */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-4 px-6 rounded-full bg-brand-red hover:bg-brand-red-bright text-white uppercase tracking-widest text-xs font-semibold transition-all shadow-red-glow flex items-center justify-center gap-2 group"
                >
                  {addedNotice ? (
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
                  onClick={handleBuyNow}
                  className="flex-1 py-4 px-6 rounded-full border border-brand-gold/60 hover:border-brand-gold text-white uppercase tracking-widest text-xs font-semibold transition-all bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span>BUY NOW</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-full border transition-colors ${
                    inWishlist
                      ? 'border-brand-red bg-brand-red/15 text-brand-red'
                      : 'border-white/10 text-brand-muted hover:text-white'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-brand-red' : ''}`} />
                </button>
              </div>

              {/* Trust highlights */}
              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-brand-muted">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-gold" />
                  <span>Complimentary Shipping Over ₹2,999</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  <span>100% Authentic Indian Craftsmanship</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Component Section */}
        <div className="mt-20 max-w-4xl mx-auto border-t border-white/10 pt-12 space-y-4">
          <h2 className="text-2xl font-serif text-white font-medium mb-6">
            Flacon Dossier & Scent Specifications
          </h2>

          {/* Accordion 1: Fragrance Notes */}
          <div className="rounded-2xl border border-white/10 bg-[#090909] overflow-hidden">
            <button
              onClick={() => toggleAccordion('notes')}
              className="w-full p-5 text-left flex items-center justify-between font-serif text-base text-white hover:text-brand-gold transition-colors"
            >
              <span>Fragrance Notes & Olfactory Architecture</span>
              {openAccordion === 'notes' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'notes' && (
              <div className="p-5 pt-0 text-sm text-brand-muted space-y-3 leading-relaxed border-t border-white/5">
                <p>
                  <strong className="text-white">Top Notes:</strong> {product.topNotes.join(', ')} —
                  Radiant opening aromatics designed to awaken the senses immediately upon skin contact.
                </p>
                <p>
                  <strong className="text-white">Heart Notes:</strong> {product.heartNotes.join(', ')} —
                  The sovereign core of the composition that matures between thirty minutes and four hours.
                </p>
                <p>
                  <strong className="text-white">Base Notes:</strong> {product.baseNotes.join(', ')} —
                  Deep lingering resins and temple woods providing unmatched 16+ hour tenacity.
                </p>
              </div>
            )}
          </div>

          {/* Accordion 2: Ingredients */}
          <div className="rounded-2xl border border-white/10 bg-[#090909] overflow-hidden">
            <button
              onClick={() => toggleAccordion('ingredients')}
              className="w-full p-5 text-left flex items-center justify-between font-serif text-base text-white hover:text-brand-gold transition-colors"
            >
              <span>Ingredients & Artisanal Formula</span>
              {openAccordion === 'ingredients' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'ingredients' && (
              <div className="p-5 pt-0 text-sm text-brand-muted space-y-2 border-t border-white/5">
                <p className="font-mono text-xs">{product.ingredients.join(', ')}</p>
                <p className="text-xs text-brand-muted/70 mt-2">
                  Formulated without phthalates, synthetic coal-tar colorants, or harsh petroleum derivatives.
                  Distilled with respect for skin biome and ancestral Indian perfumery science.
                </p>
              </div>
            )}
          </div>

          {/* Accordion 3: How to Use */}
          <div className="rounded-2xl border border-white/10 bg-[#090909] overflow-hidden">
            <button
              onClick={() => toggleAccordion('usage')}
              className="w-full p-5 text-left flex items-center justify-between font-serif text-base text-white hover:text-brand-gold transition-colors"
            >
              <span>Application Ritual & Longevity Guide</span>
              {openAccordion === 'usage' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'usage' && (
              <div className="p-5 pt-0 text-sm text-brand-muted space-y-2 leading-relaxed border-t border-white/5">
                <p>{product.applicationGuide}</p>
                <p className="text-xs text-brand-gold">
                  Longevity: {product.longevity} • Projection / Sillage: {product.sillage}
                </p>
              </div>
            )}
          </div>

          {/* Accordion 4: Shipping & Returns */}
          <div className="rounded-2xl border border-white/10 bg-[#090909] overflow-hidden">
            <button
              onClick={() => toggleAccordion('shipping')}
              className="w-full p-5 text-left flex items-center justify-between font-serif text-base text-white hover:text-brand-gold transition-colors"
            >
              <span>Shipping, Delivery & Returns Policy</span>
              {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'shipping' && (
              <div className="p-5 pt-0 text-sm text-brand-muted space-y-2 leading-relaxed border-t border-white/5">
                <p>
                  Orders are dispatched within 24 hours in our tamper-proof royal velvet presentation coffret.
                  Domestic express transit takes 2–4 business days via BlueDart Air.
                </p>
                <p>
                  Due to the hygienic nature of haute perfumery and concentrated attar oils, unsealed bottles cannot be returned. We include a complimentary 1.5ml discovery vial with every full bottle so you may experience the fragrance before unsealing the main flacon.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products: You May Also Admire */}
        <div className="mt-28 border-t border-white/10 pt-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono tracking-widest text-brand-gold uppercase block mb-1">
              CURATED PAIRINGS
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white">
              You May Also Admire
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isInstantCheckoutOpen}
        onClose={() => setIsInstantCheckoutOpen(false)}
      />
    </div>
  );
}
