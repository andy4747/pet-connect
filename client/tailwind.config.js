module.exports = {
	purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
				gray: '#FBFBFF',
				yellow: '#FDD446',
				'theme-color': '#F94F4F',
				'border-color': '#E8E8E8',
				'body-color': '#747E88',
				'heading-color': '#162447',
				shadow: '#9D6A6A',
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
