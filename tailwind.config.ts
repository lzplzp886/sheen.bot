import type { Config } from 'tailwindcss';

const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans], // Use Open Sans globally
      },
      fontSize: {
        base: '16px', // Default font size for body text
        sm: '14px', // Smaller text
        lg: '18px', // Larger text
      },
      colors: {
        primary: '#4790fc', // Main theme color for headers background
        secondary: '#90caf9', // Comparison to primary
        background: '#ffffff', // General background color
        body: '#8c8c8c', // Body font color when background is white
        light: '#d9d9d9', // Slightly darker background
        highlight: '#ffc107', // Emphasize or highlight
        error: '#ff0000', // Error message font color or mandatory field
        success: '#008000', // Success message font color
        extralight: '#f2f2f2', // Menu items background compared to normal background color.
      },
    },
  },

  /* include these specific styles for <body>, <h1>, <p>, etc.” and makes them consistent with the Tailwind theme */
  plugins: [
    function ({ addBase, theme }: { addBase: (base: Record<string, any>) => void; theme: (key: string) => any }) {
      addBase({
        body: {
          margin: '0',
          padding: '0',
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.regular'),
          backgroundColor: theme('colors.background'),
          color: ('colors.text.body'),
        },
        h1: {
          margin: '0',
          padding: '0',
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.semibold'),
          marginBottom: theme('spacing.5'),
        },
        p: {
          margin: '0',
          padding: '0',
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.regular'),
        },
      });
    },
  ],
};

export default config;