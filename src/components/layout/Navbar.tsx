'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { wishlist, openWishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Attars', href: '/attars' },
    { name: 'Perfumes', href: '/perfumes' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Identity / Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group relative z-50 focus:outline-none"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-brand-red/40 group-hover:border-brand-red transition-all shadow-md group-hover:shadow-red-glow">
                <Image
                  src="/logo.png"
                  alt="AARZEE STORE Official Logo"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-serif tracking-[0.22em] text-sm sm:text-base font-semibold group-hover:text-brand-white transition-colors">
                  AARZEE STORE
                </span>
                <span className="text-[9px] tracking-[0.25em] text-brand-gold uppercase font-mono">
                  HAUTE PARFUMERIE
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors py-1 ${
                      isActive
                        ? 'text-brand-white'
                        : 'text-brand-muted hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-red shadow-[0_0_8px_#D90000]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions (Search, Wishlist, Cart) */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                aria-label="Search fragrances"
                className="p-2 text-brand-muted hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={openWishlist}
                aria-label="View wishlist"
                className="p-2 text-brand-muted hover:text-brand-red transition-colors rounded-full hover:bg-white/5 relative focus:outline-none"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-brand-red text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-black shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={openCart}
                aria-label="Open shopping bag"
                className="p-2 text-white hover:text-brand-gold transition-colors rounded-full hover:bg-white/5 relative focus:outline-none"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-brand-red text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-black shadow-[0_0_8px_#D90000]">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 text-white hover:text-brand-gold transition-colors focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 lg:hidden bg-[#050505]/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col space-y-6">
              <div className="text-center pb-4 border-b border-white/10">
                <p className="text-brand-gold text-xs uppercase tracking-widest font-mono">
                  AARZEE ATELIER
                </p>
                <p className="text-brand-muted text-xs mt-1">
                  Luxury Perfumes & Traditional Indian Attars
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-xl font-serif tracking-wider transition-colors py-2 border-b border-white/5 flex items-center justify-between ${
                      pathname === link.href ? 'text-brand-red' : 'text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold/60" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full py-3 px-4 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-medium"
              >
                <Search className="w-4 h-4 text-brand-gold" />
                Search Catalog
              </button>
              <div className="text-center text-[10px] text-brand-muted tracking-widest font-mono pt-2">
                HANDCRAFTED IN KANNAUJ & ASSAM
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
