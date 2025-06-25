import { ThemeProvider } from "@mui/material/styles";

import { Head, Html, Main, NextScript } from "next/document";
import { DefaultTheme } from "@/components/theme/DefaultTheme";

export default function Document() {
	return (
		<Html lang="ja">
			<Head />
			<ThemeProvider theme={DefaultTheme}>
				<body>
					<Main />
					<NextScript />
				</body>
			</ThemeProvider>
		</Html>
	);
}
