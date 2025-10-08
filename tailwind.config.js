/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"Space Grotesk",
					"system-ui",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"sans-serif",
				],
			},
			colors: {
				brand: {
					light: "#22d3ee",
					DEFAULT: "#0ea5e9",
					dark: "#0f172a",
				},
			},
			boxShadow: {
				glow: "0 25px 50px -12px rgba(14, 165, 233, 0.35)",
			},
			backgroundImage: {
				grid: "radial-gradient(circle at 1px 1px, rgba(14,165,233,0.15) 1px, transparent 0)",
			},
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
