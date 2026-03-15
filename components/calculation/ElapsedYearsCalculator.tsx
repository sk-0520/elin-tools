import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Alert, Table, TableBody, TableCell, TableRow } from "@mui/material";
import type { FC } from "react";
import { AnswerTextField } from "@/components/calculation/AnswerTextField";
import { InputTextField } from "@/components/calculation/InputTextField";
import { GroupElement } from "@/components/GroupElement";
import { convertIntChain, toElapsedYears } from "@/features/calculation";
import { useElapsedYearsCalculatorStore } from "@/hooks/calculation/useElapsedYearsCalculatorStore";
export const ElapsedYearsCalculator: FC = () => {
	const { days, setDays } = useElapsedYearsCalculatorStore();

	const { year, month, day } = toElapsedYears(days);

	return (
		<GroupElement icon={<CalendarMonthIcon />} subject="経過時間">
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>経過日数</TableCell>
						<TableCell>
							<InputTextField
								value={days}
								onChange={(ev) =>
									convertIntChain(ev.target.value, (a) => setDays(a))
								}
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>年/月/日</TableCell>
						<TableCell>
							<AnswerTextField value={`${year}/${month}/${day}`} />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<Alert severity="info">
				1 年を 360 日(1か月30日)で計算。 正確な暦が分からない。
			</Alert>
		</GroupElement>
	);
};
