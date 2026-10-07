import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Curated Collections | Royal Oud & Signature Attars',
  description:
    'Explore the themed collections of AARZEE STORE: The Royal Collection, Oud Line, Signature Attars, and Everyday Essentials.',
};

const THEMED_COLLECTIONS = [
  {
    title: 'THE ROYAL COLLECTION',
    subtitle: 'Sovereign blends infused with Kashmir saffron, Taif rose, and aged Cambodian woods.',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
    category: 'Royal Collection',
    count: '3 Master Flacons',
  },
  {
    title: 'THE OUD COLLECTION',
    subtitle: 'Uncompromising Assam & Hindi agarwood distillations aged up to 15 years.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
    category: 'Oud Collection',
    count: '4 Rare Distillations',
  },
  {
    title: 'SIGNATURE ATTARS',
    subtitle: 'Time-honoured non-alcoholic perfume oils crafted in Kannauj copper alembics.',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1200&auto=format&fit=crop',
    category: 'Signature Attars',
    count: 'Pure Oil Flacons',
  },
  {
    title: 'EVERYDAY ESSENTIALS',
    subtitle: 'Refined, versatile modern signatures offering serene sandalwood and warm amber radiance.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop',
    category: 'Everyday Essentials',
    count: 'Daily Sophistication',
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            THEMATIC ANTHOLOGIES
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight font-normal">
            CURATED COLLECTIONS
          </h1>
          <p className="text-brand-muted text-base sm:text-lg mt-4 font-light leading-relaxed">
            Delve into curated olfactory narratives crafted around rare single-origin botanicals,
            regal ceremonies, and private sanctuary rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {THEMED_COLLECTIONS.map((col) => (
            <Link
              key={col.title}
              href={`/shop?category=${encodeURIComponent(col.category)}`}
              className="group relative h-[420px] rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-end p-8 sm:p-10 transition-all duration-500 hover:border-brand-red/50 hover:shadow-card-luxury"
            >
              {/* Background image */}
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark luxury gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              {/* Content */}
              <div className="relative z-10 space-y-3">
                <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gold uppercase">
                  {col.count}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium group-hover:text-brand-white transition-colors">
                  {col.title}
                </h3>

                <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-md font-light">
                  {col.subtitle}
                </p>

                <div className="pt-2 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-red group-hover:text-white transition-colors">
                  <span>Explore Anthologies</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
