'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShieldCheck, Sparkles, CreditCard, Banknote, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, total, subtotal, discount, shippingFee, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
      // Trigger luxury celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D90000', '#C8A96B', '#F5F2EE'],
        });
      } catch (err) {
        console.log(err);
      }
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 my-8 text-white"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full text-brand-muted hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-brand-red/10 border border-brand-red flex items-center justify-center mx-auto text-brand-red">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-brand-gold">
                  ORDER CONFIRMED // #RZ-{(Math.random() * 100000).toFixed(0)}
                </span>
                <h3 className="font-serif text-3xl font-medium mt-1">Thank You For Your Order</h3>
                <p className="text-brand-muted text-sm mt-3 max-w-md mx-auto leading-relaxed">
                  Your artisanal flacon is being carefully prepared and packaged in our velvet-lined royal presentation coffret. An SMS and email confirmation will be sent shortly.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs space-y-2">
                <div className="flex justify-between text-brand-muted">
                  <span>Shipping Concierge:</span>
                  <span className="text-white font-medium">BlueDart Luxury Express</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Estimated Delivery:</span>
                  <span className="text-brand-gold font-medium">2–4 Business Days</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-4 rounded-xl bg-brand-red hover:bg-brand-red-bright text-white uppercase tracking-widest text-xs font-semibold transition-all shadow-red-glow"
              >
                Continue Exploring
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-brand-gold text-xs font-mono tracking-widest uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  Direct Luxury Checkout
                </div>
                <h3 className="font-serif text-2xl font-medium mt-1">Delivery & Concierge Details</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono tracking-wider text-brand-muted mb-1">
                      FULL NAME *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Vikramaditya Rathore"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-brand-muted/40 focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-wider text-brand-muted mb-1">
                      PHONE NUMBER *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-brand-muted/40 focus:outline-none focus:border-brand-red"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wider text-brand-muted mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-brand-muted/40 focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wider text-brand-muted mb-1">
                    SHIPPING ADDRESS *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Apartment, Suite, Street name"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-brand-muted/40 focus:outline-none focus:border-brand-red resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono tracking-wider text-brand-muted mb-1">
                      CITY *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Mumbai"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-brand-muted/40 focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-wider text-brand-muted mb-1">
                      PIN CODE *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 400001"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-brand-muted/40 focus:outline-none focus:border-brand-red"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="pt-2">
                  <label className="block text-xs font-mono tracking-wider text-brand-muted mb-2">
                    PAYMENT PREFERENCE
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                      className={`p-2.5 rounded-lg border text-xs flex flex-col items-center justify-center gap-1 transition-all ${
                        formData.paymentMethod === 'upi'
                          ? 'border-brand-red bg-brand-red/10 text-white'
                          : 'border-white/10 text-brand-muted hover:border-white/20'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-brand-gold" />
                      <span>Instant UPI / QR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className={`p-2.5 rounded-lg border text-xs flex flex-col items-center justify-center gap-1 transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'border-brand-red bg-brand-red/10 text-white'
                          : 'border-white/10 text-brand-muted hover:border-white/20'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-brand-gold" />
                      <span>Card / NetBanking</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-2.5 rounded-lg border text-xs flex flex-col items-center justify-center gap-1 transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-brand-red bg-brand-red/10 text-white'
                          : 'border-white/10 text-brand-muted hover:border-white/20'
                      }`}
                    >
                      <Banknote className="w-4 h-4 text-brand-gold" />
                      <span>Cash On Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Order Summary Recap */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-brand-muted">
                    <span>Items ({cart.length})</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-brand-gold">
                      <span>VIP Privilege Discount:</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-brand-muted">
                    <span>Express Delivery:</span>
                    <span>{shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-white font-medium text-sm pt-2 border-t border-white/10">
                    <span>Grand Total:</span>
                    <span className="text-brand-gold font-serif text-base">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-brand-red hover:bg-brand-red-bright text-white uppercase tracking-widest text-xs font-semibold transition-all shadow-red-glow flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>CONFIRM & PLACE LUXURY ORDER</span>
                      <span>•</span>
                      <span>{formatPrice(total)}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
