import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-r-custom': 'linear-gradient(to right, #FF4B2B, #FF416C)',
      },
    },
  },
  plugins: [],
};

export default config;


