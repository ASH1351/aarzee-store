'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export function WishlistDrawer() {
  const { wishlist, isWishlistOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#080808] border-l border-white/10 text-white flex flex-col justify-between shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red">
                    <Heart className="w-5 h-5 fill-brand-red" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium tracking-wide">
                      Curated Wishlist
                    </h3>
                    <p className="text-xs text-brand-muted">
                      {wishlist.length} {wishlist.length === 1 ? 'fragrance' : 'fragrances'} saved
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeWishlist}
                  className="p-2 rounded-full text-brand-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="text-center py-20 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-brand-muted mb-4">
                      <Heart className="w-7 h-7" />
                    </div>
                    <p className="font-serif text-lg text-white mb-2">No Fragrances Saved</p>
                    <p className="text-brand-muted text-xs max-w-xs mb-6">
                      Explore our collections and tap the heart icon to save your desired scents.
                    </p>
                    <button
                      onClick={closeWishlist}
                      className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs uppercase tracking-widest text-brand-gold transition-colors"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#0f0f0f] border border-white/5 hover:border-white/10 transition-colors flex gap-4"
                    >
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-black/40 border border-white/5">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-serif font-medium text-white truncate">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="text-brand-muted/60 hover:text-brand-red transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-brand-muted font-mono mt-0.5">
                            {item.category} • {item.family}
                          </p>
                          <p className="text-sm font-serif text-brand-gold font-medium mt-1">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => {
                              addToCart(item, item.sizes[0].size, 1);
                              removeFromWishlist(item.id);
                            }}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-brand-red hover:bg-brand-red-bright text-white text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Move to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 text-center">
                <button
                  onClick={closeWishlist}
                  className="w-full py-3 rounded-xl border border-white/10 hover:border-white/30 text-white text-xs uppercase tracking-widest font-medium transition-colors"
                >
                  Return to Boutique
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
