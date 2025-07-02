import { TableCell, TableRow } from "@mui/material";
import type { FC, ReactNode } from "react";
import { rankDice } from "@/features/dice";
import { useWeponDiceValuesStore } from "@/hooks/useWeponDiceValuesStore";
import { DiceRanking } from "./DiceRanking";

export type DiceTableSummaryProps = {
	readonly children?: ReactNode;
	// readonly editors: Record<string, DiceEditor>;
	// readonly values: Record<string, DiceValue>;
};

export const DiceTableSummary: FC<DiceTableSummaryProps> = (props) => {
	// const { children, editors, values } = props;
	const { children } = props;
	const values = useWeponDiceValuesStore((a) => a.values);

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
			<TableCell colSpan={2}>{children}</TableCell>
			<TableCell>
				<DiceRanking items={summary.count} />
			</TableCell>
			<TableCell>
				<DiceRanking items={summary.sides} />
			</TableCell>
			<TableCell>
				<DiceRanking items={summary.fixedValue} />
			</TableCell>
			<TableCell>
				<DiceRanking items={summary.minimum} />
			</TableCell>
			<TableCell>
				<DiceRanking items={summary.maximum} />
			</TableCell>
			<TableCell>
				<DiceRanking items={summary.expected} />
			</TableCell>
		</TableRow>
	);
};
