'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { CheckoutModal } from './CheckoutModal';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    shippingFee,
    freeShippingThreshold,
    total,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCoupon(inputCoupon);
    if (ok) {
      setInputCoupon('');
      setCouponError('');
    } else {
      setCouponError('Invalid privilege code. Try "AARZEE10" for 10% off.');
    }
  };

  const handleProceedCheckout = () => {
    closeCart();
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            />

            {/* Sliding Panel */}
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
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-medium tracking-wide">
                        Your Fragrance Bag
                      </h3>
                      <p className="text-xs text-brand-muted">
                        {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeCart}
                    className="p-2 rounded-full text-brand-muted hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Free Shipping Progress Meter */}
                <div className="px-6 py-3 bg-[#0d0d0d] border-b border-white/5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-brand-muted flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                      {amountNeededForFreeShipping === 0 ? (
                        <span className="text-brand-gold font-medium">
                          Unlocked Complimentary Express Shipping
                        </span>
                      ) : (
                        <span>
                          Add <span className="text-white font-medium">{formatPrice(amountNeededForFreeShipping)}</span> for Complimentary Shipping
                        </span>
                      )}
                    </span>
                    <span className="text-brand-gold font-mono text-[10px]">{shippingProgress}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-red via-brand-gold to-brand-gold transition-all duration-500"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-brand-muted mb-4">
                        <ShoppingBag className="w-7 h-7" />
                      </div>
                      <p className="font-serif text-lg text-white mb-2">Your Bag is Empty</p>
                      <p className="text-brand-muted text-xs max-w-xs mb-6">
                        Explore our royal oud distillations and signature non-alcoholic attars.
                      </p>
                      <button
                        onClick={closeCart}
                        className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs uppercase tracking-widest text-brand-gold transition-colors"
                      >
                        Explore Fragrances
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 rounded-xl bg-[#0f0f0f] border border-white/5 hover:border-white/10 transition-colors"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-black/40 border border-white/5">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="text-sm font-serif font-medium text-white truncate">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-brand-muted/60 hover:text-brand-red transition-colors p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-[11px] text-brand-muted font-mono mt-0.5">
                              {item.size} • {item.type}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-white/10 rounded-md bg-black/50">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-0.5 text-brand-muted hover:text-white transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-mono">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-0.5 text-brand-muted hover:text-white transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-sm font-medium text-brand-gold font-serif">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer / Summary */}
                {cart.length > 0 && (
                  <div className="p-6 bg-[#0a0a0a] border-t border-white/10 space-y-4">
                    {/* Coupon Input */}
                    <div>
                      {couponCode ? (
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-brand-red/10 border border-brand-red/30 text-xs">
                          <div className="flex items-center gap-2 text-white">
                            <Tag className="w-3.5 h-3.5 text-brand-red" />
                            <span className="font-mono">{couponCode} (10% OFF APPLIED)</span>
                          </div>
                          <button
                            onClick={removeCoupon}
                            className="text-brand-muted hover:text-brand-red text-xs underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleApplyCoupon} className="flex gap-2">
                          <input
                            type="text"
                            placeholder='Privilege Code (e.g. "AARZEE10")'
                            value={inputCoupon}
                            onChange={(e) => setInputCoupon(e.target.value)}
                            className="flex-1 bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-red uppercase font-mono"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-colors"
                          >
                            Apply
                          </button>
                        </form>
                      )}
                      {couponError && (
                        <p className="text-[11px] text-brand-red mt-1">{couponError}</p>
                      )}
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-1.5 text-xs text-brand-muted border-t border-white/5 pt-3">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="text-white">{formatPrice(subtotal)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-brand-gold">
                          <span>VIP Privilege (10%)</span>
                          <span>-{formatPrice(discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-white">
                          {shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-medium text-white pt-2 border-t border-white/10 font-serif">
                        <span>Estimated Total</span>
                        <span className="text-brand-gold text-lg">{formatPrice(total)}</span>
                      </div>
                    </div>

                    {/* Checkout CTA */}
                    <button
                      onClick={handleProceedCheckout}
                      className="w-full py-4 rounded-xl bg-brand-red hover:bg-brand-red-bright text-white uppercase tracking-widest text-xs font-semibold transition-all shadow-red-glow flex items-center justify-center gap-2 group"
                    >
                      <span>PROCEED TO CHECKOUT</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}
