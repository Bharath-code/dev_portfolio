/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'stone-50': '#fafaf9',
                'stone-100': '#f5f5f4',
                'stone-200': '#e7e5e4',
                'stone-300': '#d6d3d1',
                'stone-400': '#a8a29e',
                'stone-500': '#78716c',
                'stone-600': '#57534e',
                'stone-700': '#44403c',
                'stone-800': '#292524',
                'stone-900': '#1c1917',
            },
            fontFamily: {
                sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['"Archivo Black"', 'Impact', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
                serif: ['"Instrument Serif"', 'Georgia', 'serif'],
            },
        },
    },
    plugins: [],
};