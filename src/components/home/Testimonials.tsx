'use client';

import React from 'react';
import { REVIEWS } from '@/data/reviews';
import { Star, ShieldCheck, Sparkles, Quote } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050505] border-b border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            CONNOISSEUR APPRAISALS
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight font-normal">
            LOVED BY FRAGRANCE ENTHUSIASTS
          </h2>
          <p className="text-brand-muted text-sm sm:text-base mt-3 font-light">
            Verified collectors and perfume critics share their personal impressions of AARZEE creations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#111] to-[#080808] border border-white/5 hover:border-brand-gold/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Gold Stars */}
                <div className="flex items-center gap-1 mb-4 text-brand-gold">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-brand-red/40 mb-3" />

                <h4 className="font-serif text-base font-medium text-white mb-2 leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h4>

                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-light">
                  {review.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-medium text-white">{review.author}</h5>
                  <span className="text-[10px] text-brand-muted font-mono">{review.location}</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono text-brand-gold">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
