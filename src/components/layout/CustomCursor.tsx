'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'explore'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if device is desktop with mouse pointer
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for custom cursor label
      const customEl = target.closest('[data-cursor-label]') as HTMLElement | null;
      if (customEl) {
        const label = customEl.getAttribute('data-cursor-label');
        if (label === 'VIEW') {
          setCursorType('view');
          return;
        } else if (label === 'EXPLORE') {
          setCursorType('explore');
          return;
        }
      }

      // Check for interactive button/link
      const clickable = target.closest('button, a, input, select, textarea, [role="button"]');
      if (clickable) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central crisp dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-red pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: pos.x,
          y: pos.y,
          scale: cursorType === 'view' || cursorType === 'explore' ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Trailing follower circle / badge */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-[9px] font-bold tracking-widest text-white uppercase"
        animate={{
          x: pos.x,
          y: pos.y,
          width:
            cursorType === 'view'
              ? 54
              : cursorType === 'explore'
              ? 64
              : cursorType === 'pointer'
              ? 40
              : 28,
          height:
            cursorType === 'view'
              ? 54
              : cursorType === 'explore'
              ? 64
              : cursorType === 'pointer'
              ? 40
              : 28,
          backgroundColor:
            cursorType === 'view'
              ? 'rgba(217, 0, 0, 0.85)'
              : cursorType === 'explore'
              ? 'rgba(200, 169, 107, 0.9)'
              : 'rgba(255, 255, 255, 0.04)',
          borderColor:
            cursorType === 'pointer'
              ? 'rgba(217, 0, 0, 0.8)'
              : cursorType === 'explore'
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(255, 255, 255, 0.25)',
          color: cursorType === 'explore' ? '#050505' : '#ffffff',
          boxShadow:
            cursorType === 'view'
              ? '0 0 20px rgba(217, 0, 0, 0.6)'
              : cursorType === 'explore'
              ? '0 0 20px rgba(200, 169, 107, 0.6)'
              : 'none',
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 280, mass: 0.3 }}
        style={{
          borderRadius: '9999px',
          borderWidth: cursorType === 'view' || cursorType === 'explore' ? '0px' : '1px',
          backdropFilter: 'blur(4px)',
        }}
      >
        {cursorType === 'view' && 'VIEW'}
        {cursorType === 'explore' && 'EXPLORE'}
      </motion.div>
    </>
  );
}
