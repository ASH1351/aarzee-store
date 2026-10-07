'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show once per session or initial page load
    const hasLoaded = sessionStorage.getItem('aarzee_initial_loaded');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('aarzee_initial_loaded', 'true');
          }, 350);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle ambient red backlight */}
          <div className="absolute w-80 h-80 rounded-full bg-brand-red/15 blur-[100px] pointer-events-none" />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-brand-red/60 shadow-[0_0_40px_rgba(217,0,0,0.4)] mb-8"
          >
            <Image
              src="/logo.png"
              alt="AARZEE STORE"
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-white font-medium uppercase text-center mb-2"
          >
            AARZEE STORE
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-[11px] sm:text-xs tracking-[0.35em] text-brand-gold uppercase font-mono mb-8"
          >
            THE ART OF FRAGRANCE
          </motion.p>

          {/* Thin Luxury Progress Line */}
          <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-red via-brand-gold to-brand-red"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="mt-4 text-[10px] font-mono tracking-widest text-brand-muted"
          >
            {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
