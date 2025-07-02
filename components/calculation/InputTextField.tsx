import { TextField, type TextFieldProps } from "@mui/material";
import type { FC } from "react";

export const InputTextField: FC<TextFieldProps> = (props) => {
	return <TextField focused variant="outlined" {...props} />;
};
