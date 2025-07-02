import { TableCell, TableRow, TextField } from "@mui/material";
import { type ChangeEvent, type FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { calculateDice, parseDice, rollDice } from "@/features/dice";
import { BuiltinRandom } from "@/features/random";
import { useWeponDiceValuesStore } from "@/hooks/useWeponDiceValuesStore";
import { useWeponEditorsStore } from "@/hooks/useWeponEditorsStore";
import { useWeponPointsStore } from "@/hooks/useWeponPointsStore";
import { NumericFormat } from "../NumericFormat";
import { EditorId } from "./EditorId";

const ErrorColSpan = 6;

interface InputValues {
	dice: string;
}

export type DiceTableRowProps = {
	id: string;
	// editor: DiceEditor;
	// error: string | undefined;
	// value: DiceValue | undefined;
	// onEditorChanged: (id: string, editor: DiceEditor) => void;
};

export const DiceTableRow: FC<DiceTableRowProps> = (props) => {
	//const { id, editor, error, value, onEditorChanged } = props;
	const { id } = props;
	const frequency = useWeponEditorsStore((a) => a.frequency);
	const editor = useWeponEditorsStore((a) => a.editors[id]);
	const setEditor = useWeponEditorsStore((a) => a.setEditor);
	const value = useWeponDiceValuesStore((a) => a.values[id]);
	const error = useWeponDiceValuesStore((a) => a.errors[id]);
	const setDiceValue = useWeponDiceValuesStore((a) => a.setValue);
	const setError = useWeponDiceValuesStore((a) => a.setError);
	const remove = useWeponPointsStore((a) => a.remove);
	const setPoint = useWeponPointsStore((a) => a.setPoint);

	const { control, setValue } = useForm<InputValues>({
		mode: "onChange",
		reValidateMode: "onChange",
	});

	console.debug({ id });

	useEffect(() => {
		if (!editor.dice.trim()) {
			setDiceValue(id, undefined);
			remove(id);
		} else {
			try {
				const dice = parseDice(editor.dice);
				const value = calculateDice(dice);
				setDiceValue(id, value);
				const points = rollDice(value, frequency, new BuiltinRandom());
				setPoint(id, points);
			} catch (ex) {
				console.error(ex);
				setError(id, `${ex}`);
			}
		}
	}, [id, editor.dice, frequency, setError, setDiceValue, remove, setPoint]);

	const handleDiceChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setValue("dice", event.target.value);
		setEditor(id, {
			dice: event.target.value,
			color: editor.color,
		});
	};

	return (
		<TableRow sx={{ background: `${editor.color}99` }}>
			<TableCell sx={{ color: "red" }}>
				<EditorId
					id={id}
					color={editor.color}
					strong={true}
					size="medium"
				></EditorId>
			</TableCell>
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
								width: "100%",
								minWidth: "12ch",
							})}
							defaultValue={editor.dice}
							onChange={handleDiceChange}
						/>
					)}
				/>
			</TableCell>
			{error ? (
				<TableCell colSpan={ErrorColSpan}>{error}</TableCell>
			) : value === undefined ? (
				<TableCell colSpan={ErrorColSpan}></TableCell>
			) : (
				<>
					<TableCell>
						<NumericFormat value={value.count} />
					</TableCell>
					<TableCell>
						<NumericFormat value={value.sides} />
					</TableCell>
					<TableCell>
						<NumericFormat
							value={value.hasFixed ? value.fixedValue : undefined}
						/>
					</TableCell>
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
