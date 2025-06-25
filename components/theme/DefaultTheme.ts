import { createTheme } from "@mui/material/styles";
import { DefaultFontFamily } from "./DefaultFonts";

export const DefaultTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#2E7D32",
			light: "#4CAF50",
			dark: "#1B5E20",
		},
		secondary: {
			main: "#FF6B6B",
			light: "#FF8A8A",
			dark: "#D32F2F",
		},
		error: {
			main: "#d32f2f",
			light: "#ef5350",
			dark: "#c62828",
		},
		warning: {
			main: "#ffa726",
			light: "#ffb74d",
			dark: "#f57c00",
		},
		info: {
			main: "#29b6f6",
			light: "#4fc3f7",
			dark: "#0288d1",
		},
		success: {
			main: "#66bb6a",
			light: "#81c784",
			dark: "#388e3c",
		},
		background: {
			default: "#ffffff",
			paper: "#f5f5f5",
		},
		text: {
			primary: "rgba(0, 0, 0, 0.87)",
			secondary: "rgba(0, 0, 0, 0.6)",
			disabled: "rgba(0, 0, 0, 0.38)",
		},
		divider: "rgba(0, 0, 0, 0.12)",
		action: {
			active: "rgba(0, 0, 0, 0.54)",
			hover: "rgba(0, 0, 0, 0.04)",
			selected: "rgba(0, 0, 0, 0.08)",
			disabled: "rgba(0, 0, 0, 0.26)",
			disabledBackground: "rgba(0, 0, 0, 0.12)",
		},
		grey: {
			50: "#fafafa",
			100: "#f5f5f5",
			200: "#eeeeee",
			300: "#e0e0e0",
			400: "#bdbdbd",
			500: "#9e9e9e",
			600: "#757575",
			700: "#616161",
			800: "#424242",
			900: "#212121",
		},
	},
	typography: {
		button: {
			textTransform: "none",
		},
		fontFamily: DefaultFontFamily,
		h1: {
			fontWeight: 600,
		},
	},
	shape: {
		borderRadius: 8,
	},
	transitions: {
		duration: {
			standard: 300,
		},
	},
});
