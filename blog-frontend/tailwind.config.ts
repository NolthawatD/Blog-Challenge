import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				"custom-green": "#243831",
				"custom-page-bg": "#BBC2C0",
				"green-500": "#243831",
				"green-300": "#2B5F44",
				"green-100": "#D8E9E4",
				"golden-500": "#C5A365",
				"custom-black": "#000000",
				"custom-white": "#FFFFF",
				"custom-text": "#191919",
				"grey-100": "#BBC2C0",
				"grey-300": "#939494",
				"custom-success": "#49A569",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	variants: {},
	plugins: [],
};
export default config;
