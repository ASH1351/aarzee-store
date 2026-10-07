import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030303] text-white border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-brand-red/50 group-hover:border-brand-red shadow-lg transition-all group-hover:shadow-red-glow">
                <Image
                  src="/logo.png"
                  alt="AARZEE STORE"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-[0.2em] font-semibold text-white">
                  AARZEE STORE
                </span>
                <span className="text-[10px] tracking-[0.25em] text-brand-gold uppercase font-mono">
                  THE ART OF FRAGRANCE
                </span>
              </div>
            </Link>

            <p className="text-brand-muted text-sm leading-relaxed max-w-sm font-light">
              Bridging centuries of Indian hydro-distillation heritage with modern French haute parfumerie.
              Every vial is aged, non-alcoholic, and hand-blended to become your intimate olfactory signature.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow AARZEE on Instagram"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-muted hover:text-brand-red hover:border-brand-red/60 transition-all hover:scale-105"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow AARZEE on Facebook"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:border-white/40 transition-all hover:scale-105"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Subscribe to AARZEE on YouTube"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-muted hover:text-brand-red hover:border-brand-red/60 transition-all hover:scale-105"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-brand-gold">
              SHOP
            </h4>
            <ul className="flex flex-col space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="text-brand-muted hover:text-white transition-colors">
                  All Fragrances
                </Link>
              </li>
              <li>
                <Link href="/attars" className="text-brand-muted hover:text-white transition-colors">
                  Signature Attars
                </Link>
              </li>
              <li>
                <Link href="/perfumes" className="text-brand-muted hover:text-white transition-colors">
                  Luxury Perfumes
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-brand-muted hover:text-white transition-colors">
                  Royal Oud Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: HELP */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-brand-gold">
              HELP
            </h4>
            <ul className="flex flex-col space-y-2.5 text-sm">
              <li>
                <Link href="/contact" className="text-brand-muted hover:text-white transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link href="/contact#shipping" className="text-brand-muted hover:text-white transition-colors">
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact#returns" className="text-brand-muted hover:text-white transition-colors">
                  Returns &amp; Exchange
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="text-brand-muted hover:text-white transition-colors">
                  Fragrance FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: ABOUT & LEGAL */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-brand-gold">
              HERITAGE
            </h4>
            <ul className="flex flex-col space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-brand-muted hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-brand-muted hover:text-white transition-colors">
                  Kannauj Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-muted hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-muted hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-muted hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted/70 gap-4">
          <p>© 2026 AARZEE STORE. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] tracking-widest text-brand-gold/60">
              CRAFTED FOR CONNOISSEURS
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors py-1 px-2 rounded hover:bg-white/5"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
