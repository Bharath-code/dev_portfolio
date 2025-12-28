/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'void-black': '#000000',
                'tech-white': '#F4F4F5',
                'signal-emerald': '#10B981',
                'off-charcoal': '#121212',
                'surface-dark': '#18181B',
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
                display: ['"Archivo Black"', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
