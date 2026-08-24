/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080B12",
        panel: "#0E141F",
        "panel-2": "#121A28",
        line: "#1E2836",
        "line-soft": "#161F2C",
        text: "#DCE3EC",
        "text-dim": "#7C8BA0",
        "text-faint": "#4B5568",
        amber: "#F5A623",
        teal: "#3FD0C9",
        rose: "#F2545B",
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
