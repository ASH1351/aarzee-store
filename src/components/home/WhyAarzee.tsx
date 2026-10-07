'use client';

import React from 'react';
import { Sparkles, Clock, Droplet, Crown } from 'lucide-react';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AUTHENTIC CRAFT',
    description: 'Thoughtfully crafted fragrances inspired by timeless traditions and ancestral copper alembic distillation.',
  },
  {
    icon: Clock,
    title: 'LONG-LASTING',
    description: 'Formulated with high extrait concentrations designed to stay with you throughout the day and evening.',
  },
  {
    icon: Droplet,
    title: 'PREMIUM INGREDIENTS',
    description: 'Carefully selected botanical absolutes, wild Assam agarwood, and ethically harvested royal florals.',
  },
  {
    icon: Crown,
    title: 'MADE TO BE REMEMBERED',
    description: 'Scents created to leave an unforgettable impression and become your undeniable sovereign presence.',
  },
];

export function WhyAarzee() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#060606] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-[0.25em] text-brand-gold uppercase block mb-2">
            EXCELLENCE IN PERFUMERY
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
            THE AARZEE DISTINCTION
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-8 rounded-2xl bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 hover:border-brand-red/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold group-hover:text-brand-red group-hover:border-brand-red/40 transition-colors mb-6">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-[10px] font-mono tracking-widest text-brand-muted/60 mb-1">
                  PILLAR 0{idx + 1}
                </div>

                <h3 className="font-serif text-lg font-medium text-white mb-2 tracking-wide group-hover:text-brand-white transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
