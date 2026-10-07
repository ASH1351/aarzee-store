'use client';

import React, { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WishlistDrawer } from '@/components/cart/WishlistDrawer';
import { SearchModal } from '@/components/search/SearchModal';
import { CustomCursor } from './CustomCursor';
import { LoadingScreen } from './LoadingScreen';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <LoadingScreen />
        <CustomCursor />
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
        <main className="min-h-screen relative overflow-hidden">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <WishlistDrawer />
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </WishlistProvider>
    </CartProvider>
  );
}
