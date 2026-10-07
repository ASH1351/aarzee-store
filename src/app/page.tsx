import React from 'react';
import { Hero } from '@/components/home/Hero';
import { EssenceShowcase3D } from '@/components/3d/EssenceShowcase3D';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { AttarExperience } from '@/components/home/AttarExperience';
import { FragranceNotesExplorer } from '@/components/home/FragranceNotesExplorer';
import { BrandStory } from '@/components/home/BrandStory';
import { WhyAarzee } from '@/components/home/WhyAarzee';
import { Testimonials } from '@/components/home/Testimonials';
import { InstagramGallery } from '@/components/home/InstagramGallery';
import { Newsletter } from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-[#050505]">
      {/* 1. Cinematic Hero Section with 3D Flacon */}
      <Hero />

      {/* 2. 3D Perfume Experience (The Essence of Aarzee) */}
      <EssenceShowcase3D />

      {/* 3. Featured Collection */}
      <FeaturedCollection />

      {/* 4. Horizontal / Scent Switcher Product Showcase */}
      <ProductShowcase />

      {/* 5. Attar Experience (The Soul of Attar) */}
      <AttarExperience />

      {/* 6. Fragrance Notes Explorer */}
      <FragranceNotesExplorer />

      {/* 7. Brand Story (More Than a Fragrance) */}
      <BrandStory />

      {/* 8. Why Aarzee 4-Pillars */}
      <WhyAarzee />

      {/* 9. Social Proof / Connoisseur Testimonials */}
      <Testimonials />

      {/* 10. Instagram Visual Lifestyle Grid */}
      <InstagramGallery />

      {/* 11. Luxury VIP Newsletter */}
      <Newsletter />
    </div>
  );
}
