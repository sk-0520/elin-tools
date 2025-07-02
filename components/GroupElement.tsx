import { Box, Paper, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";

export interface GroupElementProps {
	children: ReactNode;
	icon?: ReactNode;
	subject: string;
}

export const GroupElement: FC<GroupElementProps> = (props) => {
	const { children, icon, subject } = props;

	return (
		<Paper elevation={1} sx={{ padding: 1 }}>
			<Typography variant="h5">
				{icon}
				{subject}
			</Typography>
			<Box sx={{ marginLeft: 2 }}>{children}</Box>
		</Paper>
	);
};
