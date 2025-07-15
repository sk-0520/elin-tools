import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import type { FC } from "react";
import { AnswerTextField } from "@/components/calculation/AnswerTextField";
import { InputTextField } from "@/components/calculation/InputTextField";
import { GroupElement } from "@/components/GroupElement";
import { ReferenceLink } from "@/components/ReferenceLink";
import { convertFloatChain, toDisplayFloat } from "@/features/calculation";
import { usePickpocketWeightCalculationStore } from "@/hooks/calculation/usePickpocketWeightCalculationStore";

export const PickpocketWeightCalculator: FC = () => {
	const { strength, pickpocket, setStrength, setPickpocket } =
		usePickpocketWeightCalculationStore();

	const weight = strength * 0.1 + pickpocket * 0.2 + 1;

	return (
		<GroupElement icon={<FitnessCenterOutlinedIcon />} subject="盗める重さ">
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>筋力</TableCell>
						<TableCell>
							<InputTextField
								value={strength}
								onChange={(ev) =>
									convertFloatChain(ev.target.value, (a) => setStrength(a))
								}
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>窃盗</TableCell>
						<TableCell>
							<InputTextField
								value={toDisplayFloat(pickpocket)}
								onChange={(ev) =>
									convertFloatChain(ev.target.value, (a) => setPickpocket(a))
								}
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>重さ</TableCell>
						<TableCell>
							<AnswerTextField value={toDisplayFloat(weight)} />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<ReferenceLink href="https://ylvapedia.wiki/wiki/Elin:%E3%82%A2%E3%83%93%E3%83%AA%E3%83%86%E3%82%A3/%E3%82%B9%E3%83%AA%E3%81%AE%E6%89%8B">
				Elin:アビリティ/スリの手 - Ylvapedia
			</ReferenceLink>
		</GroupElement>
	);
};
