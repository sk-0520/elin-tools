import { ThemeProvider } from "@mui/material";
import { DefaultTheme } from "@/components/theme/DefaultTheme";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<ThemeProvider theme={DefaultTheme}>
				<body>{children}</body>
			</ThemeProvider>
		</html>
	);
}
