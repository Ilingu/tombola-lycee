const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				// Main Colors
				primary: {
					50: "#f2f9f9",
					100: "#ddeff0",
					200: "#bfe0e2",
					300: "#92cace",
					400: "#5faab1",
					500: "#438e96",
					600: "#3b757f",
					700: "#356169",
					800: "#325158",
					900: "#2d464c"
				},
				secondary: {
					main: "rgb(183, 226, 112)",
					whither: "rgb(204, 225, 171)"
				}
			}
		},
		// Responsive
		screens: {
			xs: "450px",
			...defaultTheme.screens
		}
	},
	plugins: []
};
