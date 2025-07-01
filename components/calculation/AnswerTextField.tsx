import type { TextFieldProps } from "@mui/material";
import type { FC } from "react";
import { InputTextField } from "./InputTextField";

export const AnswerTextField: FC<TextFieldProps> = (props) => {
	return (
		<InputTextField
			color="secondary"
			slotProps={{
				input: {
					readOnly: true,
				},
			}}
			{...props}
		/>
	);
};
