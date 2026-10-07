'use client';

import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#030303] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-red/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-mono tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          VIP OLFACTORY CIRCLE
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight font-normal mb-4">
          ENTER THE WORLD OF AARZEE
        </h2>

        <p className="text-brand-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light mb-8">
          Be the first to discover new fragrances, exclusive collections and private offers.
          Receive an exclusive 10% welcome privilege code upon subscription.
        </p>

        {isSubscribed ? (
          <div className="p-6 rounded-2xl bg-white/5 border border-brand-red/30 max-w-md mx-auto flex items-center justify-center gap-3 text-white">
            <div className="p-1.5 rounded-full bg-brand-red/20 text-brand-red">
              <Check className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-serif font-medium">Welcome to the Private Circle</p>
              <p className="text-xs text-brand-gold font-mono">Use code &quot;AARZEE10&quot; for 10% off your first flacon.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[#101010] border border-white/10 rounded-full px-5 py-3.5 text-sm text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-red"
            />
            <button
              type="submit"
              className="py-3.5 px-8 rounded-full bg-brand-red hover:bg-brand-red-bright text-white uppercase tracking-widest text-xs font-semibold transition-all shadow-red-glow flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <span>JOIN THE JOURNEY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}

        <p className="text-[10px] text-brand-muted/60 uppercase font-mono tracking-widest mt-6">
          NO SPAM. ONLY PRIVILEGED INVITATIONS & NEW HARVEST RELEASES.
        </p>
      </div>
    </section>
  );
}
