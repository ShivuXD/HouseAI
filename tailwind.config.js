/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#06080c",
        charcoal: {
          DEFAULT: "#11161d",
          light: "#1a2230",
          glass: "#1a2332",
        },
        steel: {
          DEFAULT: "#2c3e50",
          light: "#3d5266",
        },
        brass: {
          DEFAULT: "#c9a961",
          dim: "#9c7f44",
          bright: "#e0c179",
        },
        paper: "#e8e3d8",
        muted: "#7c8794",
      },
      fontFamily: {
        serif: ["'Source Serif 4'", "'Lora'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Courier New'", "monospace"],
      },
      animation: {
        "float-slow": "float 18s ease-in-out infinite",
        "float-med": "float 12s ease-in-out infinite",
        flicker: "flicker 4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0,0)" },
          "33%": { transform: "translate(12px,-18px)" },
          "66%": { transform: "translate(-10px,10px)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.85" },
          "50%": { opacity: "0.92" },
          "55%": { opacity: "0.8" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0,0,0,0.45)",
        "glow-brass": "0 0 24px rgba(201,169,97,0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
