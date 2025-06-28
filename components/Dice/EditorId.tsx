import {
	Chip,
	type ChipProps,
	createTheme,
	type Theme,
	ThemeProvider,
} from "@mui/material";
import type { FC } from "react";

export interface EditorIdProps {
	id: string;
	color: string;
	strong?: boolean;
	size?: ChipProps["size"];
}

export const EditorId: FC<EditorIdProps> = (props) => {
	const { id, color, strong, size } = props;
	return (
		<ThemeProvider
			theme={(theme: Theme) =>
				createTheme({
					...theme,
					palette: {
						...theme.palette,
						primary: {
							main: color,
						},
					},
				})
			}
		>
			<Chip
				label={id}
				color="primary"
				variant={strong ? "filled" : "outlined"}
				size={size}
			/>
		</ThemeProvider>
	);
};
