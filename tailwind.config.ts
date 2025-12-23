import type { Config } from 'tailwindcss';

const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  darkMode: 'class',      // 强制深色模式
  
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  safelist: [
    'animate-borderSpin',          // 我们给外环用的动画类
    // 如需保证特定颜色 ring 不被清理，可再加：
    // 'ring-yellow-400', 'ring-yellow-500',
    // 也可用正则：
    // { pattern: /ring-yellow-(400|500)/ },
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
        body: '#1a1a1a', // Body font color when background is white
        darklight: '#8c8c8c', // Icons, headlines with less black than body 
        light: '#d9d9d9', // Slightly darker background
        highlight: '#ffc107', // Emphasize or highlight
        error: '#ff0000', // Error message font color or mandatory field
        success: '#008000', // Success message font color
        extralight: '#f2f2f2', // Menu items background compared to normal background color.
      },
      // Progress bar for enrollment form
      keyframes: {
        progressStripes: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "40px 0" },
        },
        /* 新增 borderSpin for academy workshop page */
        borderSpin: {
          '0%':   { boxShadow: '0 0 0 8px rgb(252, 203, 7) inset' },
          '50%':  { boxShadow: '0 0 0 8px rgb(68, 0, 255) inset' },
          '100%': { boxShadow: '0 0 0 8px rgb(222, 210, 164) inset' },
        },
      },
      animation: {
        // 使背景在水平方向平移，呈现斜纹滚动效果
        "striped-progress": "progressStripes 1s linear infinite",
        /** 新增同名动画供academy workshop使用 */
        borderSpin: 'borderSpin 2.8s linear infinite',
      },
    },
  },

  /* include these specific styles for <body>, <h1>, <p>, etc.” and makes them consistent with the Tailwind theme */
  plugins: [
    require('@tailwindcss/typography'), //This adds a bunch of .prose styles—everything from heading sizes & weights, to list-styles, code blocks, tables, blockquotes, etc.
    function ({ addBase, theme }: { addBase: (base: Record<string, any>) => void; theme: (key: string) => any }) {
      addBase({
        body: {
          margin: '0',
          padding: '0',
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.normal'),
          backgroundColor: theme('colors.background'),
          color: theme('colors.body'),
        },
        h1: {
          margin: '0',
          padding: '0',
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.semibold'),
        },
        p: {
          margin: '0',
          padding: '0',
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.normal'),
        },
      });
    },
  ],
};

export default config;