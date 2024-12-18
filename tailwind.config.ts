import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const textStrokePlugin = plugin(({ addUtilities }) => {
  const newUtilities = {
    '.text-stroke-sm': {
      '-webkit-text-stroke-width': '1px',
      '-webkit-text-stroke-color': 'white',
      'color': 'rgb(9 9 11 / var(--tw-bg-opacity, 1))',
    },
    '.text-stroke-lg': {
      '-webkit-text-stroke-width': '2px',
      '-webkit-text-stroke-color': 'white',
      'color': 'rgb(9 9 11 / var(--tw-bg-opacity, 1))',
    },
  };
  addUtilities(newUtilities);
});

const textShadowPlugin = plugin(({ addUtilities }) => {
  const newUtilities = {
    '.text-shadow-sm': {
      'text-shadow': '1px 1px 2px rgba(255, 255, 255, 0.35)',
    },
    '.text-shadow-md': {
      'text-shadow': '2px 2px 4px rgba(255, 255, 255, 0.35)',
    },
    '.text-shadow-lg': {
      'text-shadow': '4px 4px 6px rgba(255, 255, 255, 0.5)',
    },
    '.text-shadow-none': {
      'text-shadow': 'none',
    },
  };

  addUtilities(newUtilities);
});

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./assets/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [textStrokePlugin, textShadowPlugin],
} satisfies Config;
