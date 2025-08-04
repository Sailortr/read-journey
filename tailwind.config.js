// tailwind.config.js

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1C1C1E",
        "dark-secondary": "#2C2C2E",
        primary: "#34D399",
        accent: "#6366F1",
        "accent-dark": "#4F46E5",
        background: "#121212", // arka plan rengi
      },
    },
  },
  plugins: [],
};
