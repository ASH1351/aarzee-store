'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const GALLERY_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    title: 'The Obsidian Flacon',
    tag: '#AarzeeRoyalOud',
  },
  {
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
    title: 'Midnight Distillation in Kannauj',
    tag: '#HauteParfumerie',
  },
  {
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop',
    title: 'Velvet Taif Rose Distillate',
    tag: '#PureAttar',
  },
  {
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
    title: 'Golden Balsamic Resins',
    tag: '#AarzeeAmber',
  },
];

export function InstagramGallery() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#040404] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-brand-gold uppercase block mb-2">
              VISUAL CHRONICLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
              FOLLOW THE AARZEE EXPERIENCE
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full border border-white/10 hover:border-brand-red text-white text-xs font-mono tracking-widest uppercase transition-colors hover:bg-white/5 self-start sm:self-end group"
          >
            <InstagramIcon className="w-4 h-4 text-brand-gold group-hover:text-brand-red transition-colors" />
            <span>@AARZEESTORE</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-muted" />
          </a>
        </div>

        {/* Visual Editorial Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden block border border-white/5"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase">
                  {item.tag}
                </span>
                <h4 className="text-sm font-serif text-white font-medium mt-1">
                  {item.title}
                </h4>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
