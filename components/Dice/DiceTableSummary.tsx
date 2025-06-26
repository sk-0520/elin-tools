import { TableCell, TableRow, TextField } from "@mui/material";
import type { ChangeEvent, FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { type DiceValue, rankDice } from "@/features/dice";
import { DiceRanking } from "./DiceRanking";

export type DiceTableSummaryProps = {
	readonly values: Record<string, DiceValue>;
};

export const DiceTableSummary: FC<DiceTableSummaryProps> = (props) => {
	const { values } = props;

	const summary = {
		count: rankDice(values, "count"),
		sides: rankDice(values, "sides"),
		fixedValue: rankDice(values, "fixedValue"),
		minimum: rankDice(values, "minimum"),
		maximum: rankDice(values, "maximum"),
	};

	return (
		<TableRow>
			<TableCell></TableCell>
			<TableCell>どっち</TableCell>
			<TableCell><DiceRanking items={summary.count} /></TableCell>
			<TableCell><DiceRanking items={summary.sides} /></TableCell>
			<TableCell><DiceRanking items={summary.fixedValue} /></TableCell>
			<TableCell><DiceRanking items={summary.minimum} /></TableCell>
			<TableCell><DiceRanking items={summary.maximum} /></TableCell>
		</TableRow>
	);
};
