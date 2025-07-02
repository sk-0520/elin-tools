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
	slacker: object;
};

export const DiceTable: FC<DiceTableProps> = (props) => {
	const { children, slacker } = props;

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
				{editorIds.map((a) => (
					<DiceTableRow key={a} id={a} slacker={slacker} />
				))}
			</TableBody>
			<TableFooter>
				<DiceTableSummary>{children}</DiceTableSummary>
			</TableFooter>
		</Table>
	);
};
