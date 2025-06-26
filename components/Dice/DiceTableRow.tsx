import { TableCell, TableRow, TextField } from "@mui/material";
import type { ChangeEvent, FC } from "react";
import { Controller, useForm } from "react-hook-form";
import type { DiceValue } from "@/features/dice";
import { NumericFormat } from "../NumericFormat";

interface InputValues {
	editor: string;
}

export type DiceTableRowProps = {
	id: string;
	editor: string;
	error: string | undefined;
	value: DiceValue | undefined;
	callbackEditorChanged: (id: string, editor: string) => void;
};

export const DiceTableRow: FC<DiceTableRowProps> = (props) => {
	const { id, editor, error, value, callbackEditorChanged } = props;
	const { control, setValue } = useForm<InputValues>({
		mode: "onChange",
		reValidateMode: "onChange",
	});

	console.debug({ id, editor });

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setValue("editor", event.target.value);
		callbackEditorChanged(id, event.target.value);
	};

	return (
		<TableRow>
			<TableCell>{id}</TableCell>
			<TableCell>
				<Controller
					control={control}
					name="editor"
					// biome-ignore lint/correctness/noUnusedFunctionParameters: あとでー
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							defaultValue={editor}
							onChange={handleChange}
						/>
					)}
				/>
			</TableCell>
			{error ? (
				<TableCell colSpan={5}>{error}</TableCell>
			) : value === undefined ? (
				<TableCell colSpan={5}></TableCell>
			) : (
				<>
					<TableCell><NumericFormat value={value.count} /></TableCell>
					<TableCell><NumericFormat value={value.sides} /></TableCell>
					<TableCell>
						{value.hasFixed ? value.fixedValue : "-"}
					</TableCell>
					<TableCell><NumericFormat value={value.minimum} /></TableCell>
					<TableCell><NumericFormat value={value.maximum} /></TableCell>
				</>
			)}
		</TableRow>
	);
};
