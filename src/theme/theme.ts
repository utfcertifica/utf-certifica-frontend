import { extendTheme } from "@mui/joy/styles";
import { colors, type ColorType } from "./colors";

declare module "@mui/joy/styles" {
	interface PaletteCommonOverrides extends ColorType {}
}

export const theme = extendTheme({
	colorSchemes: {
		light: {
			palette: {
				common: colors,
			},
		},
	},
	components: {
		JoyFormLabel: {
			styleOverrides: {
				root: {
					fontSize: "0.875rem",
					fontWeight: "bold",
					color: colors["black-100"],
				},
			},
		},
		JoyInput: {
			styleOverrides: {
				root: {
					padding: "1.5rem",
					borderRadius: "1rem",
					boxShadow: "none",
					border: `1px solid ${colors["gray-300"]}`,
					backgroundColor: colors["gray-100"],
					color: colors["gray-900"],
				},
				input: {
					"&::placeholder": {
						opacity: 1,
						fontSize: "1rem",
						color: colors["gray-900"],
					},
				},
			},
		},
	},
});
