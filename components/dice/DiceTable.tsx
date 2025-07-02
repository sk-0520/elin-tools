import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableRow,
} from "@mui/material";
import type { FC, ReactNode } from "react";
import { useShallow } from "zustand/react/shallow";
import { useWeponEditorsStore } from "@/hooks/useWeponEditorsStore";
import { DiceTableRow } from "./DiceTableRow";
import { DiceTableSummary } from "./DiceTableSummary";

const DiceValueWidth = 45;

export type DiceTableProps = {
	children?: ReactNode;
	/*
	editorIds: Record<string, DiceEditor>;
	errors: Record<string, string>;
	values: Record<string, DiceValue>;
	onEditorChanged: (id: string, editor: DiceEditor) => void;
	*/
};

export const DiceTable: FC<DiceTableProps> = (props) => {
	// const { children, editors, errors, values, onEditorChanged } = props;
	const { children } = props;

	const editorIds = useWeponEditorsStore(
		useShallow((a) =>
			Object.keys(a.editors).toSorted((aa, bb) => aa.localeCompare(bb)),
		),
	);

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
				{/* {Object.entries(editors)
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
					})} */}
				{editorIds.map((a) => (
					<DiceTableRow key={a} id={a} />
				))}
			</TableBody>
			<TableFooter>
				<DiceTableSummary>{children}</DiceTableSummary>
			</TableFooter>
		</Table>
	);
};
