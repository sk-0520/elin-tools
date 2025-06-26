import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import type { FC } from "react";
import type { DiceValue } from "@/features/dice";
import { DiceTableRow } from "./DiceTableRow";

export type DiceTableProps = {
	diseEditors: Record<string, string>;
	diseErrors: Record<string, string>;
	diseValues: Record<string, DiceValue>;
	callbackEditorChanged: (id: string, editor: string) => void;
};

export const DiceTable: FC<DiceTableProps> = (props) => {
	const { diseEditors, diseErrors, diseValues, callbackEditorChanged } = props;

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
				</TableRow>
			</TableHead>
			<TableBody>
				{Object.entries(diseEditors).map(([k, v]) => {
					const error = diseErrors[k];
					const value = diseValues[k];
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
		</Table>
	);
};
