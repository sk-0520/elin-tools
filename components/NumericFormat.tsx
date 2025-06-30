import { Typography } from "@mui/material";
import type { FC } from "react";

export interface NumericFormatProps {
	value: number | undefined;
}

export const NumericFormat: FC<NumericFormatProps> = (props) => {
	const { value } = props;

	return (
		<Typography
			sx={{
				textAlign: "right",
				opacity: value ? undefined : 0.8,
				fontFamily: "monospace",
			}}
		>
			{value ? value.toLocaleString() : "-"}
		</Typography>
	);
};
