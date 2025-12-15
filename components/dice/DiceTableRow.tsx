import { TableCell, TableRow, TextField } from "@mui/material";
import { type ChangeEvent, type FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { getElement } from "@/features/access";
import { calculateDice, parseDice, rollDice } from "@/features/dice";
import { BuiltinRandom } from "@/features/random";
import { useWeaponDiceValuesStore } from "@/hooks/useWeaponDiceValuesStore";
import { useWeaponEditorsStore } from "@/hooks/useWeaponEditorsStore";
import { useWeaponPointsStore } from "@/hooks/useWeaponPointsStore";
import { NumericFormat } from "../NumericFormat";
import { EditorId } from "./EditorId";

const ErrorColSpan = 6;

interface InputValues {
	dice: string;
}

export type DiceTableRowProps = {
	id: string;
	slacker: object;
};

export const DiceTableRow: FC<DiceTableRowProps> = (props) => {
	const { id, slacker } = props;
	const frequency = useWeaponEditorsStore((a) => a.frequency);
	const editor = useWeaponEditorsStore((a) => getElement(a.editors, id));
	const setEditor = useWeaponEditorsStore((a) => a.setEditor);
	const udValue = useWeaponDiceValuesStore((a) => a.values[id]);
	const udError = useWeaponDiceValuesStore((a) => a.errors[id]);
	const setDiceValue = useWeaponDiceValuesStore((a) => a.setValue);
	const setError = useWeaponDiceValuesStore((a) => a.setError);
	const remove = useWeaponPointsStore((a) => a.remove);
	const setPoint = useWeaponPointsStore((a) => a.setPoint);

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
			{udError ? (
				<TableCell colSpan={ErrorColSpan}>{udError}</TableCell>
			) : udValue === undefined ? (
				<TableCell colSpan={ErrorColSpan}></TableCell>
			) : (
				<>
					<TableCell>
						<NumericFormat value={udValue.count} />
					</TableCell>
					<TableCell>
						<NumericFormat value={udValue.sides} />
					</TableCell>
					<TableCell>
						<NumericFormat
							value={udValue.hasFixed ? udValue.fixedValue : undefined}
						/>
					</TableCell>
					<TableCell>
						<NumericFormat value={udValue.minimum} />
					</TableCell>
					<TableCell>
						<NumericFormat value={udValue.maximum} />
					</TableCell>
					<TableCell>
						<NumericFormat value={udValue.expected} />
					</TableCell>
				</>
			)}
		</TableRow>
	);
};
