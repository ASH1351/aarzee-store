export interface FragranceNoteCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  glowColor: string;
  notes: {
    name: string;
    description: string;
    character: string;
    featuredIn: string[];
  }[];
}

export const FRAGRANCE_CATEGORIES: FragranceNoteCategory[] = [
  {
    id: 'citrus',
    name: 'CITRUS',
    tagline: 'Luminous, crisp and awakening',
    description: 'Bright solar essences that burst forth on the initial opening, providing immediate clarity and sparkling elegance.',
    accentColor: '#DFC28B',
    glowColor: 'rgba(223, 194, 139, 0.4)',
    notes: [
      {
        name: 'BERGAMOT',
        description: 'Sun-kissed Calabrian zest with Earl Grey tea undertones and sparkling freshness.',
        character: 'Bright · Zesty · Aristocratic',
        featuredIn: ['AARZEE ROYAL OUD', 'AARZEE SANTAL VEIL'],
      },
      {
        name: 'LEMON',
        description: 'Cold-pressed Sicilian lemon peel offering crystalline radiance and invigorating tartness.',
        character: 'Crisp · Vibrant · Radiant',
        featuredIn: ['AARZEE NOIR', 'AARZEE AMBER'],
      },
      {
        name: 'ORANGE',
        description: 'Rich Spanish bitter orange blossom peel blending sweet nectar with aromatic bitterness.',
        character: 'Warm · Uplifting · Sweet Balsam',
        featuredIn: ['AARZEE AMBER'],
      },
    ],
  },
  {
    id: 'floral',
    name: 'FLORAL',
    tagline: 'Velvety, romantic and immortal',
    description: 'Hand-picked blossoms distilled at dawn to capture the fleeting essence of dew-soaked petals.',
    accentColor: '#D90000',
    glowColor: 'rgba(217, 0, 0, 0.4)',
    notes: [
      {
        name: 'ROSE',
        description: 'Deep crimson Taif and Centifolia roses steeped in nectar, embodying royal Indian heritage.',
        character: 'Velvety · Sovereign · Intoxicating',
        featuredIn: ['AARZEE ROSE OUD', 'AARZEE ROYAL OUD'],
      },
      {
        name: 'JASMINE',
        description: 'Night-blooming Jasmine Sambac with hypnotic narcotic richness and animalic warmth.',
        character: 'Hypnotic · Lush · Seductive',
        featuredIn: ['AARZEE NOIR', 'AARZEE ROYAL OUD'],
      },
      {
        name: 'IRIS',
        description: 'Precious orris concrete aged for five years, exuding powdery suede and cool aristocratic grace.',
        character: 'Powdery · Ethereal · Sophisticated',
        featuredIn: ['AARZEE MUSK', 'AARZEE SANTAL VEIL'],
      },
    ],
  },
  {
    id: 'woody',
    name: 'WOODY',
    tagline: 'Ancient, grounding and sovereign',
    description: 'Precious resins and heartwoods aged in temple cellars, grounding the spirit in eternal stability.',
    accentColor: '#8B0000',
    glowColor: 'rgba(139, 0, 0, 0.5)',
    notes: [
      {
        name: 'OUD',
        description: 'Sacred Assam agarwood with complex dark smoke, medicinal leather, and sweet resinous balsamic heart.',
        character: 'Sacred · Smoky · Magnetic',
        featuredIn: ['AARZEE ROYAL OUD', 'DEHN AL OUD HINDI', 'AARZEE ROSE OUD'],
      },
      {
        name: 'SANDALWOOD',
        description: 'Ethically sourced Mysore sandalwood offering unmatched creamy serenity and spiritual grounding.',
        character: 'Creamy · Sacred · Meditative',
        featuredIn: ['AARZEE SANTAL VEIL', 'AARZEE ROYAL OUD', 'AARZEE MUSK'],
      },
      {
        name: 'CEDAR',
        description: 'Dry Himalayan Atlas cedarwood with pencil-shaving crispness and aristocratic strength.',
        character: 'Dry · Clean · Regal',
        featuredIn: ['AARZEE IMPERIAL', 'AARZEE SANTAL VEIL'],
      },
    ],
  },
  {
    id: 'oriental',
    name: 'ORIENTAL',
    tagline: 'Warm, magnetic and unforgettable',
    description: 'Sensory spices and sun-warmed golden balms that linger in the air like an unforgettable signature.',
    accentColor: '#C8A96B',
    glowColor: 'rgba(200, 169, 107, 0.4)',
    notes: [
      {
        name: 'AMBER',
        description: 'Golden fossil resin with warm vanilla nuances, benzoin balsamic sweetness, and comforting radiance.',
        character: 'Resinous · Golden · Sensual',
        featuredIn: ['AARZEE AMBER', 'AARZEE ROYAL OUD', 'AARZEE ROSE OUD'],
      },
      {
        name: 'MUSK',
        description: 'Ethical cruelty-free botanical ambrette accord that creates a seamless second-skin allure.',
        character: 'Velvety · Intimate · Enduring',
        featuredIn: ['AARZEE MUSK', 'AARZEE IMPERIAL', 'AARZEE NOIR'],
      },
      {
        name: 'SAFFRON',
        description: 'Pampore Kashmiri red gold threads offering bitter-sweet leather and luminous culinary nobility.',
        character: 'Opulent · Spiced · Royal',
        featuredIn: ['AARZEE ROYAL OUD', 'AARZEE IMPERIAL', 'AARZEE ROSE OUD'],
      },
    ],
  },
];
