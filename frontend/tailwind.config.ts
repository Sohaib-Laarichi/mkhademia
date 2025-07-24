import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Brand Colors
      colors: {
        // Brand Primary
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Main brand color
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Accent Orange
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Main accent color
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        // Enhanced Grays
        gray: {
          0: '#ffffff',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        // Semantic Colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#16a34a',
          600: '#15803d',
          700: '#166534',
          800: '#14532d',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#dc2626',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      
      // Typography
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        '2xs': ['12px', '16px'],
        'xs': ['14px', '20px'],
        'sm': ['16px', '24px'],
        'base': ['16px', '24px'],
        'md': ['18px', '28px'],
        'lg': ['24px', '32px'],
        'xl': ['32px', '40px'],
        '2xl': ['40px', '48px'],
      },
      
      // Spacing (4pt grid)
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
      
      // Border Radius
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
      
      // Box Shadows
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 16px rgba(0, 0, 0, 0.12)',
        'xl': '0 12px 24px rgba(0, 0, 0, 0.15)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'focus': '0 0 0 3px rgba(14, 165, 233, 0.1)',
      },
      
      // Animation & Transitions
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '400': '400ms',
      },
      
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      // Layout & Grid
      maxWidth: {
        'container': '1200px',
        'prose': '65ch',
      },
      
      // Breakpoints (already defined but can be customized)
      screens: {
        'xs': '360px',
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      
      // Backdrop Blur
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
      },
      
      // Animation Keyframes
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
      
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'slide-up': 'slide-up 0.25s ease-out',
        'slide-down': 'slide-down 0.25s ease-out',
        'scale-in': 'scale-in 0.15s ease-out',
        'bounce-subtle': 'bounce-subtle 2s infinite',
      },
    },
  },
  plugins: [
    // Custom plugin for RTL support
    function({ addUtilities, addComponents }: any) {
      // RTL utilities
      addUtilities({
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
        '.rtl-flip': {
          '[dir="rtl"] &': {
            transform: 'scaleX(-1)',
          },
        },
      });
      
      // Custom components
      addComponents({
        // Button variants
        '.btn': {
          '@apply inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2': {},
        },
        '.btn-primary': {
          '@apply bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500 active:bg-brand-700': {},
        },
        '.btn-secondary': {
          '@apply bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 active:bg-gray-300': {},
        },
        '.btn-accent': {
          '@apply bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 active:bg-accent-700': {},
        },
        '.btn-outline': {
          '@apply border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-brand-500': {},
        },
        '.btn-ghost': {
          '@apply text-gray-700 hover:bg-gray-100 focus:ring-gray-500': {},
        },
        
        // Input variants
        '.input': {
          '@apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 transition-colors duration-150': {},
        },
        '.input-error': {
          '@apply border-error-500 focus:ring-error-500 focus:border-error-500': {},
        },
        
        // Card variants
        '.card': {
          '@apply bg-white rounded-lg shadow-md border border-gray-200': {},
        },
        '.card-hover': {
          '@apply hover:shadow-lg hover:border-gray-300 transition-all duration-250': {},
        },
        
        // Text utilities
        '.text-balance': {
          'text-wrap': 'balance',
        },
      });
    },
  ],
  // Enable dark mode support
  darkMode: 'class',
};

export default config;