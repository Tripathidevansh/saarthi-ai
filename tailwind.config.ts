import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B1F3A", // Deep Navy
          dark: "#051122",
        },
        saffron: {
          DEFAULT: "#FF9933", // Saffron
          light: "#ffb77a",
        },
        green: {
          DEFAULT: "#138808", // India Green
          light: "#21b012",
        },
        ashoka: "#000080", // Ashoka Blue
        charcoal: "#10182B", // Charcoal-navy
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        hi: ["var(--font-hi)", "sans-serif"],
        bn: ["var(--font-bn)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
