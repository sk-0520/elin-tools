import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableRow,
} from "@mui/material";
import type { FC, ReactNode } from "react";
import type { DiceValue } from "@/features/dice";
import type { DiceEditor } from "@/hooks/useWeponEditorsStore";
import { DiceTableRow } from "./DiceTableRow";
import { DiceTableSummary } from "./DiceTableSummary";

const DiceValueWidth = 45;

export type DiceTableProps = {
	children?: ReactNode;
	editors: Record<string, DiceEditor>;
	errors: Record<string, string>;
	values: Record<string, DiceValue>;
	onEditorChanged: (id: string, editor: DiceEditor) => void;
};

export const DiceTable: FC<DiceTableProps> = (props) => {
	const { children, editors, errors, values, onEditorChanged } = props;

	return (
		<Table sx={{ tableLayout: "fixed" }}>
			<TableHead>
				<TableRow>
					<TableCell width={30}>*</TableCell>
					<TableCell width={"100%"}>ダイス</TableCell>
					<TableCell width={DiceValueWidth}>振り数</TableCell>
					<TableCell width={DiceValueWidth}>面数</TableCell>
					<TableCell width={DiceValueWidth}>固定値</TableCell>
					<TableCell width={DiceValueWidth}>最小</TableCell>
					<TableCell width={DiceValueWidth}>最大</TableCell>
					<TableCell width={DiceValueWidth}>期待値</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{Object.entries(editors)
					.toSorted(([a, _av], [b, _bv]) => a.localeCompare(b))
					.map(([k, v]) => {
						const error = errors[k];
						const value = values[k];
						return (
							<DiceTableRow
								key={k}
								id={k}
								editor={v}
								error={error}
								value={value}
								onEditorChanged={onEditorChanged}
							/>
						);
					})}
			</TableBody>
			<TableFooter>
				<DiceTableSummary editors={editors} values={values}>
					{children}
				</DiceTableSummary>
			</TableFooter>
		</Table>
	);
};
