/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			keyframes: {
				translate_top: {
					'0%': {
						translate: '0px -20px',
					},
					'100%': {
						transform: '0px',
					},
				},
			},
			animation: {
				translate_top: 'translate_top 1s ease-in-out',
			},
		},
	},
	plugins: [],
};
