import { Box, Paper, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";

export interface GroupElementProps {
	children: ReactNode;
	subject: string;
}

export const GroupElement: FC<GroupElementProps> = (props) => {
	const { children, subject } = props;

	return (
		<Paper sx={{ padding: 1 }}>
			<Typography variant="h5">{subject}</Typography>
			<Box sx={{ marginLeft: 2 }}>{children}</Box>
		</Paper>
	);
};
