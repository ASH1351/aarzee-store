export type FragranceCategory = 
  | 'Signature Attars'
  | 'Luxury Perfumes'
  | 'Oud Collection'
  | 'Royal Collection'
  | 'Everyday Essentials';

export type FragranceFamily = 'Woody Oriental' | 'Floral Amber' | 'Fresh Citrus' | 'Spicy Oud' | 'Musk & Leather';

export type ProductSize = '6ml' | '12ml' | '30ml' | '50ml' | '100ml';

export interface FragranceNoteDetail {
  name: string;
  category: 'citrus' | 'floral' | 'woody' | 'oriental' | 'spice';
  description?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: FragranceCategory;
  family: FragranceFamily;
  type: 'Attar (Pure Perfume Oil)' | 'Extrait de Parfum' | 'Eau de Parfum';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  story: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  sizes: {
    size: ProductSize;
    price: number;
    inStock: boolean;
  }[];
  bottleColor: string; // for 3D accent & card glow
  accentColor: string;
  images: string[];
  features: string[];
  concentration: string;
  longevity: string; // e.g. "14+ Hours"
  sillage: 'Intimate' | 'Moderate' | 'Commanding' | 'Enormous';
  origin: string;
  ingredients: string[];
  applicationGuide: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  size: ProductSize;
  price: number;
  quantity: number;
  image: string;
  type: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
}
