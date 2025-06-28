import { TableCell, TableRow } from "@mui/material";
import type { FC } from "react";
import { type DiceValue, rankDice } from "@/features/dice";
import type { DiceEditor } from "@/hooks/useWeponEditorsStore";
import { DiceRanking } from "./DiceRanking";

export type DiceTableSummaryProps = {
	readonly editors: Record<string, DiceEditor>;
	readonly values: Record<string, DiceValue>;
};

export const DiceTableSummary: FC<DiceTableSummaryProps> = (props) => {
	const { editors, values } = props;

	const summary = {
		count: rankDice(values, "count"),
		sides: rankDice(values, "sides"),
		fixedValue: rankDice(values, "fixedValue"),
		minimum: rankDice(values, "minimum"),
		maximum: rankDice(values, "maximum"),
		expected: rankDice(values, "expected"),
	};

	return (
		<TableRow>
			<TableCell></TableCell>
			<TableCell>どっち?</TableCell>
			<TableCell>
				<DiceRanking editors={editors} items={summary.count} />
			</TableCell>
			<TableCell>
				<DiceRanking editors={editors} items={summary.sides} />
			</TableCell>
			<TableCell>
				<DiceRanking editors={editors} items={summary.fixedValue} />
			</TableCell>
			<TableCell>
				<DiceRanking editors={editors} items={summary.minimum} />
			</TableCell>
			<TableCell>
				<DiceRanking editors={editors} items={summary.maximum} />
			</TableCell>
			<TableCell>
				<DiceRanking editors={editors} items={summary.expected} />
			</TableCell>
		</TableRow>
	);
};
