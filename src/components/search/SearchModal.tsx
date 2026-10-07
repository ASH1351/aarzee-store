'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

export function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchSubtitle = p.subtitle.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchFamily = p.family.toLowerCase().includes(q);
      const matchNotes = [...p.topNotes, ...p.heartNotes, ...p.baseNotes].some((n) =>
        n.toLowerCase().includes(q)
      );
      return matchName || matchSubtitle || matchCategory || matchFamily || matchNotes;
    });
  }, [query]);

  const popularTags = ['Royal Oud', 'Rose', 'Saffron', 'Amber', 'Attar Oil', 'Musk', 'Bergamot'];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl z-10 text-white overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="relative flex items-center border-b border-white/15 pb-4">
            <Search className="w-5 h-5 text-brand-gold mr-3 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search by scent name, note (Oud, Rose, Saffron) or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-base sm:text-lg text-white placeholder-brand-muted/50 focus:outline-none"
            />
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-brand-muted hover:text-white mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
            <button
              onClick={onClose}
              className="p-1 text-xs font-mono tracking-widest text-brand-muted hover:text-white px-2 py-1 rounded border border-white/10"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions / Tags */}
          <div className="pt-4 pb-2 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-brand-gold tracking-widest uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Popular:
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="text-xs px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-brand-muted hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="mt-4 max-h-[50vh] overflow-y-auto space-y-3 pr-1">
            {query.trim() === '' ? (
              <div className="text-center py-10 text-brand-muted text-xs">
                Type above to explore our library of royal Indian attars and extrait de parfums.
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-brand-muted">
                <p className="font-serif text-base text-white mb-1">No matching fragrances found</p>
                <p className="text-xs">Try searching for &quot;Oud&quot;, &quot;Saffron&quot;, or &quot;Amber&quot;.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-red/40 transition-all group"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-black/40">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-medium text-white group-hover:text-brand-gold transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-brand-muted truncate">
                      {product.subtitle}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-red/10 text-brand-red border border-brand-red/20">
                        {product.type}
                      </span>
                      <span className="text-xs font-serif text-brand-gold">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
