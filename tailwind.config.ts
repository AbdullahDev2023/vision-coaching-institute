import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A1F5C",
          light: "#1A3A8F",
          dark: "#050D1F",
        },
        gold: {
          DEFAULT: "#D4A017",
          light: "#F0C842",
          shimmer: "#FFE066",
        },
        bg: {
          dark: "#050D1F",
          light: "#F8F9FF",
          card: "#0D1B4B",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        hindi: ["var(--font-noto-devanagari)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4A017 0%, #F0C842 50%, #D4A017 100%)",
        "blue-gradient": "linear-gradient(135deg, #050D1F 0%, #0A1F5C 50%, #1A3A8F 100%)",
        "hero-gradient": "radial-gradient(ellipse at top, #1A3A8F 0%, #050D1F 70%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "fade-in": "fadeIn 0.6s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
