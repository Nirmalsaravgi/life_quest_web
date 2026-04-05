import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Ember Orange
        ember: "#ff5f1f",
        "ember-dim": "#cc410b",
        "ember-glow": "#ff8e5e",
        // Backgrounds
        obsidian: "#0a0a0a",
        charcoal: "#121212",
        metallic: "#1f1f1f",
        "metallic-light": "#333333",
        // Secondary - Amethyst Violet
        amethyst: "#9d4edd",
        "amethyst-dim": "#5a189a",
        // Status
        "success-neon": "#4ade80",
        // Legacy
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "sans-serif"],
        tech: ["var(--font-rajdhani)", "sans-serif"],
        mono: ["var(--font-share-tech-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "2px",
        xl: "4px",
        full: "9999px",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
        scanlines:
          "repeating-linear-gradient(0deg, transparent, transparent 1px, #000 2px, #000 3px)",
        "metallic-texture":
          "radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "spin-reverse-slow": "spin 25s linear infinite reverse",
        "pulse-fast": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        flicker: "flicker 3s infinite",
      },
      keyframes: {
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: "0.99",
            filter: "brightness(1)",
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: "0.4",
            filter: "brightness(1.2)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
