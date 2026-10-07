import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#F5F2EE",
        brand: {
          red: "#D90000",
          "red-bright": "#E00000",
          "red-dark": "#8B0000",
          burgundy: "#4A0000",
          "burgundy-deep": "#200000",
          black: "#050505",
          "black-soft": "#0d0d0d",
          "black-card": "#111111",
          gold: "#C8A96B",
          "gold-light": "#DFC28B",
          "gold-dark": "#9E7D3B",
          white: "#F5F2EE",
          muted: "#9C9890",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Cinzel", "Playfair Display", "serif"],
      },
      boxShadow: {
        "red-glow": "0 0 35px -5px rgba(217, 0, 0, 0.4)",
        "red-glow-lg": "0 0 60px 0px rgba(217, 0, 0, 0.5)",
        "gold-glow": "0 0 25px -5px rgba(200, 169, 107, 0.3)",
        "card-luxury": "0 20px 40px -15px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "radial-red": "radial-gradient(circle at center, rgba(217, 0, 0, 0.25) 0%, rgba(74, 0, 0, 0.1) 40%, transparent 70%)",
        "radial-red-strong": "radial-gradient(circle at center, rgba(224, 0, 0, 0.35) 0%, rgba(74, 0, 0, 0.15) 50%, transparent 80%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
