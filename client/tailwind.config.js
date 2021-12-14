module.exports = {
	purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'pet-red': '#fa5959',
				'pet-blue': '#242a45',
				'pet-purple': '#5267df',
				'pet-white': '#f7f7f7',
				'pet-grey': '#9194a2',
				'pet-light-grey': '#E5E7EB',
			},
		},
		fontFamily: {
			Poppins: ['Poppins, sans-serif'],
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
