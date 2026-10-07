'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FRAGRANCE_CATEGORIES } from '@/data/fragranceNotes';
import { Sparkles, ArrowRight, Wind } from 'lucide-react';

export function FragranceNotesExplorer() {
  const [selectedCatId, setSelectedCatId] = useState('woody');
  const [hoveredNote, setHoveredNote] = useState<string | null>('OUD');

  const activeCategory = FRAGRANCE_CATEGORIES.find((c) => c.id === selectedCatId) || FRAGRANCE_CATEGORIES[0];
  const activeNoteData = activeCategory.notes.find((n) => n.name === hoveredNote) || activeCategory.notes[0];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#060606] border-b border-white/5 overflow-hidden">
      {/* Dynamic scent visualization glow based on active category */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none transition-colors duration-700 opacity-20"
        style={{ backgroundColor: activeCategory.accentColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            OLFACTORY TAXONOMY
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight font-normal">
            DISCOVER YOUR NOTES
          </h2>
          <p className="text-brand-muted text-sm sm:text-base mt-3 font-light">
            Every master blend tells a story written in raw botanicals, sun-warmed spices, and aged woods.
            Hover across notes to uncover their sensory soul.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          {FRAGRANCE_CATEGORIES.map((cat) => {
            const isSelected = selectedCatId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCatId(cat.id);
                  setHoveredNote(cat.notes[0].name);
                }}
                className={`py-3 px-6 rounded-full text-xs sm:text-sm font-mono tracking-[0.2em] uppercase transition-all duration-300 border ${
                  isSelected
                    ? 'border-brand-red bg-brand-red/15 text-white shadow-red-glow font-semibold'
                    : 'border-white/10 text-brand-muted hover:border-white/20 hover:text-white bg-black/40'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Interactive Notes Exploration Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0a0a0a] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Left Column: Interactive Notes Selector */}
          <div className="lg:col-span-6 space-y-4">
            <div className="mb-4">
              <span className="text-xs font-mono tracking-widest text-brand-gold uppercase">
                {activeCategory.tagline}
              </span>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                {activeCategory.description}
              </p>
            </div>

            <div className="space-y-3">
              {activeCategory.notes.map((note) => {
                const isActive = hoveredNote === note.name;
                return (
                  <div
                    key={note.name}
                    onMouseEnter={() => setHoveredNote(note.name)}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-brand-gold bg-white/[0.06] shadow-lg translate-x-2'
                        : 'border-white/5 bg-white/[0.01] hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-2.5 h-2.5 rounded-full transition-transform duration-300"
                          style={{
                            backgroundColor: isActive ? activeCategory.accentColor : '#444',
                            transform: isActive ? 'scale(1.3)' : 'scale(1)',
                          }}
                        />
                        <h4 className="font-serif text-lg font-medium text-white tracking-wider">
                          {note.name}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-brand-muted tracking-wider">
                        {note.character}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Scent Visualization Card */}
          <div className="lg:col-span-6 relative h-full min-h-[340px] rounded-2xl bg-gradient-to-b from-[#141010] to-[#080808] border border-white/10 p-8 flex flex-col justify-between overflow-hidden">
            {/* Animated Scent Mist Particles Simulation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.15, 0.35, 0.15],
                  rotate: [0, 90, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[80px]"
                style={{ backgroundColor: activeCategory.accentColor }}
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-brand-gold text-xs font-mono tracking-widest uppercase mb-2">
                <Wind className="w-4 h-4 animate-pulse" />
                SCENT PROFILE VISUALIZATION
              </div>
              <h3 className="text-3xl font-serif text-white font-normal">
                {activeNoteData.name}
              </h3>
              <p className="text-xs font-mono text-brand-gold mt-1">
                {activeNoteData.character}
              </p>
              <p className="text-brand-muted text-sm leading-relaxed mt-4 font-light">
                {activeNoteData.description}
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10">
              <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block mb-2">
                FEATURED IN SIGNATURE FLACONS:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeNoteData.featuredIn.map((fragranceName) => (
                  <Link
                    key={fragranceName}
                    href="/shop"
                    className="px-3 py-1 rounded-full bg-black/60 border border-white/10 hover:border-brand-red text-white text-xs font-serif hover:text-brand-gold transition-colors flex items-center gap-1.5"
                  >
                    <span>{fragranceName}</span>
                    <ArrowRight className="w-3 h-3 text-brand-muted" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
