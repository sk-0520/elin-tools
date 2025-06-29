import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableRow,
} from "@mui/material";
import type { FC } from "react";
import type { DiceValue } from "@/features/dice";
import type { DiceEditor } from "@/hooks/useWeponEditorsStore";
import { DiceTableRow } from "./DiceTableRow";
import { DiceTableSummary } from "./DiceTableSummary";

export type DiceTableProps = {
	editors: Record<string, DiceEditor>;
	errors: Record<string, string>;
	values: Record<string, DiceValue>;
	callbackEditorChanged: (id: string, editor: DiceEditor) => void;
};

export const DiceTable: FC<DiceTableProps> = (props) => {
	const { editors, errors, values, callbackEditorChanged } = props;

	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>*</TableCell>
					<TableCell>ダイス</TableCell>
					<TableCell>振り数</TableCell>
					<TableCell>面数</TableCell>
					<TableCell>固定値</TableCell>
					<TableCell>最小</TableCell>
					<TableCell>最大</TableCell>
					<TableCell>期待値</TableCell>
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
								callbackEditorChanged={callbackEditorChanged}
							/>
						);
					})}
			</TableBody>
			<TableFooter>
				<DiceTableSummary editors={editors} values={values} />
			</TableFooter>
		</Table>
	);
};
