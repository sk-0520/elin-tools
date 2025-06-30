import { TableCell, TableRow, TextField } from "@mui/material";
import type { ChangeEvent, FC } from "react";
import { Controller, useForm } from "react-hook-form";
import type { DiceValue } from "@/features/dice";
import type { DiceEditor } from "@/hooks/useWeponEditorsStore";
import { NumericFormat } from "../NumericFormat";

interface InputValues {
	dice: string;
}

export type DiceTableRowProps = {
	id: string;
	editor: DiceEditor;
	error: string | undefined;
	value: DiceValue | undefined;
	onEditorChanged: (id: string, editor: DiceEditor) => void;
};

export const DiceTableRow: FC<DiceTableRowProps> = (props) => {
	const { id, editor, error, value, onEditorChanged } = props;
	const { control, setValue } = useForm<InputValues>({
		mode: "onChange",
		reValidateMode: "onChange",
	});

	console.debug({ id, editor });

	const handleDiceChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setValue("dice", event.target.value);
		onEditorChanged(id, {
			dice: event.target.value,
			color: editor.color,
		});
	};

	return (
		<TableRow sx={{ background: editor.color }}>
			<TableCell>{id}</TableCell>
			<TableCell>
				<Controller
					control={control}
					name="dice"
					// biome-ignore lint/correctness/noUnusedFunctionParameters: あとでー
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							size="small"
							sx={(theme) => ({
								"&:not(:focus) fieldset": {
									border: "none",
								},
								"& fieldset": {
									border: "none",
								},
								"&:hover fieldset": {
									border: "none",
								},
								backgroundColor: theme.palette.background.default,
								// borderColor: theme.palette.background.default,
							})}
							defaultValue={editor.dice}
							onChange={handleDiceChange}
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
					<TableCell>
						<NumericFormat value={value.count} />
					</TableCell>
					<TableCell>
						<NumericFormat value={value.sides} />
					</TableCell>
					<TableCell>{value.hasFixed ? value.fixedValue : "-"}</TableCell>
					<TableCell>
						<NumericFormat value={value.minimum} />
					</TableCell>
					<TableCell>
						<NumericFormat value={value.maximum} />
					</TableCell>
					<TableCell>
						<NumericFormat value={value.expected} />
					</TableCell>
				</>
			)}
		</TableRow>
	);
};
