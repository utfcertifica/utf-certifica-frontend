import { extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
	interface PaletteCommonOverrides {
		"black-50": true;
		"black-100": true;
		"gray-50": true;
		"purple-50": true;
	}
}

export const theme = extendTheme({
	colorSchemes: {
		light: {
			palette: {
				common: {
					"black-50": "rgba(38, 42, 65, 1)",
					"black-100": "rgba(10, 10, 10, 0.5)",
					"gray-50": "rgba(136, 136, 136, 1)",
					"purple-50": "rgba(67, 57, 242, 1)",
				},
			},
		},
	},
});
