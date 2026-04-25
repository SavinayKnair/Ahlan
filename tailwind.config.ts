import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Palette
        pearl: "#F8F6F2",
        sand: "#E8D5B7",
        champagne: "#C9A84C",
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8C96D",
          dark: "#A07C2E",
        },
        ocean: {
          DEFAULT: "#1A6B8A",
          light: "#2E9EC4",
          deep: "#0D3D52",
        },
        palm: {
          DEFAULT: "#2D6A4F",
          light: "#40916C",
          mist: "#D8F3DC",
        },
        // Dark Mode Palette
        midnight: "#0A0A0F",
        luxgold: "#D4AF37",
        aqua: {
          DEFAULT: "#00CED1",
          light: "#40E0D0",
        },
        // Neutrals
        cream: "#FDF8F0",
        warmgray: "#6B6560",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Poppins", "system-ui", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-ocean": "linear-gradient(135deg, #0D3D52 0%, #1A6B8A 50%, #2E9EC4 100%)",
        "gradient-gold": "linear-gradient(135deg, #A07C2E 0%, #C9A84C 50%, #E8C96D 100%)",
        "gradient-luxury": "linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 50%, #16213e 100%)",
        "gradient-pearl": "linear-gradient(135deg, #F8F6F2 0%, #E8D5B7 100%)",
      },
      animation: {
        "wave": "wave 8s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-in": "slideIn 0.5s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "particle": "particle 8s linear infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "translateY(0) scaleX(1)" },
          "50%": { transform: "translateY(-20px) scaleX(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201,168,76,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(201,168,76,0.8)" },
        },
        particle: {
          "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(-100px) rotate(720deg)", opacity: "0" },
        },
      },
      boxShadow: {
        "luxury": "0 25px 60px rgba(0,0,0,0.15), 0 10px 25px rgba(0,0,0,0.1)",
        "gold-glow": "0 0 30px rgba(201,168,76,0.3)",
        "ocean-glow": "0 0 30px rgba(26,107,138,0.4)",
        "glass": "0 8px 32px rgba(0,0,0,0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
export default config;
