'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { FragranceCategory, FragranceFamily } from '@/types/product';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Fragrances');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const FAMILIES: ('All' | FragranceFamily)[] = [
    'All',
    'Spicy Oud',
    'Woody Oriental',
    'Floral Amber',
    'Musk & Leather',
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory =
        selectedCategory === 'All Fragrances' || p.category === selectedCategory;
      const matchFamily = selectedFamily === 'All' || p.family === selectedFamily;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        [...p.topNotes, ...p.heartNotes, ...p.baseNotes].some((n) =>
          n.toLowerCase().includes(q)
        );

      return matchCategory && matchFamily && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedFamily, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24">
      {/* Background ambient red glow */}
      <div className="absolute top-32 right-1/4 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            CATALOG OF CREATIONS
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight font-normal">
            ALL FRAGRANCES
          </h1>
          <p className="text-brand-muted text-sm sm:text-base mt-3 font-light leading-relaxed">
            Explore our complete collection of artisanal Indian attars, pure extrait de parfums,
            and rare aged oud distillations.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#0b0b0b] border border-white/10 mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by scent, notes, or accord..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-red font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-brand-muted uppercase">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#141414] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-3.5 py-2 rounded-xl border border-white/10 hover:border-brand-gold text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-gold" />
              <span>Families ({selectedFamily})</span>
            </button>
          </div>
        </div>

        {/* Olfactory Family Selector Dropdown (Toggleable) */}
        {isFilterOpen && (
          <div className="p-4 rounded-xl bg-[#0f0f0f] border border-white/10 mb-8 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-brand-gold mr-2 uppercase">
              Olfactory Family:
            </span>
            {FAMILIES.map((fam) => (
              <button
                key={fam}
                onClick={() => setSelectedFamily(fam)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedFamily === fam
                    ? 'bg-brand-red text-white'
                    : 'bg-white/5 text-brand-muted hover:text-white hover:bg-white/10'
                }`}
              >
                {fam}
              </button>
            ))}
          </div>
        )}

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? 'bg-brand-red text-white shadow-red-glow font-medium'
                    : 'bg-white/5 text-brand-muted hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-xs text-brand-muted font-mono mb-6 pb-2 border-b border-white/5">
          <span>SHOWING {filteredProducts.length} CREATIONS</span>
          {(selectedCategory !== 'All Fragrances' || selectedFamily !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All Fragrances');
                setSelectedFamily('All');
                setSearchQuery('');
              }}
              className="text-brand-red hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-[#090909] border border-white/5">
            <p className="font-serif text-xl text-white mb-2">No fragrances match your criteria</p>
            <p className="text-xs text-brand-muted mb-6">Try clearing your filters or search term.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Fragrances');
                setSelectedFamily('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-brand-red text-white text-xs uppercase tracking-widest font-mono"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
