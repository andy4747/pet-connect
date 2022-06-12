module.exports = {
	content: [
		'./pages/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'pet-red': '#fa5959',
				'pet-blue': '#242a45',
				'pet-light-blue': '#0d2c54',
				'pet-indigo': '#094074',
				'pet-purple': '#5267df',
				'pet-white': '#f7f7f7',
				'pet-grey': '#9194a2',
				'pet-light-grey': '#E5E7EB',
				white: '#ffffff',
				black: '#38424D',
				yellow: '#FDD446',
				'theme-color': '#F94F4F',
				'border-color': '#E8E8E8',
				'body-color': '#747E88',
				'heading-color': '#162447',
				shadow: '#9D6A6A',
			},
		},
		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
		fontFamily: {
			Poppins: ['Poppins, sans-serif'],
		},
		fontSize: {
			tiny: '0.68rem',
			xs: '.75rem',
			sm: '.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '4rem',
			'7xl': '5rem',
		},
		container: {
			center: true,
			padding: '1rem',
			screens: {
				lg: '1124px',
				xl: '1124px',
				'2xl': '1124px',
			},
		},
	},
	variants: {},
	plugins: [],
};
