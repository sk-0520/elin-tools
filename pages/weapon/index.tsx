import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import {
	Box,
	Button,
	ButtonGroup,
	ToggleButton,
	Tooltip,
	Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import { DiceChart } from "@/components/dice/DiceChart";
import { DiceTable } from "@/components/dice/DiceTable";
import { DefaultPage } from "@/components/layout/DefaultPage";
import { NumericFormat } from "@/components/NumericFormat";
import { ReferenceLink } from "@/components/ReferenceLink";
import { useWeaponEditorsStore } from "@/hooks/useWeaponEditorsStore";

//const Frequencies = [10, 100, 1000, 10000, 100000] as const;
const Frequencies = [100, 1000, 10000, 100000] as const;

const Page: NextPage = () => {
	const frequency = useWeaponEditorsStore((a) => a.frequency);
	const setFrequency = useWeaponEditorsStore((a) => a.setFrequency);
	const probability = useWeaponEditorsStore((a) => a.probability);
	const setProbability = useWeaponEditorsStore((a) => a.setProbability);
	const [slacker, setSlacker] = useState({}); // 💩再計算処理

	const handleFrequencyClick = (frequency: number) => {
		setFrequency(frequency);
	};

	const handleProbabilityChanged = (probability: boolean) => {
		setProbability(probability);
	};

	return (
		<DefaultPage pageId="weapon">
			<DiceTable slacker={slacker}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "left",
						alignItems: "center",
					}}
				>
					<Typography sx={{ marginRight: "0.5ch" }}>頻度</Typography>
					<ButtonGroup
						color="secondary"
						variant="outlined"
						aria-label="Basic button group"
					>
						{Frequencies.map((a) => {
							return (
								<Tooltip key={a} title={<NumericFormat value={a} />}>
									<Button
										variant={frequency === a ? "contained" : undefined}
										onClick={(_e) => handleFrequencyClick(a)}
									>
										<Typography>
											<span
												style={{
													fontSize: "0.4em",
												}}
											>
												10
											</span>
											<sup style={{ fontSize: "0.7em" }}>{Math.log10(a)}</sup>
										</Typography>
									</Button>
								</Tooltip>
							);
						})}
					</ButtonGroup>

					<Button
						variant="contained"
						sx={{
							marginInline: "0.5ch",
						}}
						onClick={() => {
							setSlacker({});
						}}
					>
						再計算
					</Button>
					<ToggleButton
						value={"a"}
						selected={probability}
						onChange={() => handleProbabilityChanged(!probability)}
					>
						{probability ? (
							<CheckBoxOutlinedIcon />
						) : (
							<CheckBoxOutlineBlankOutlinedIcon />
						)}
						確率
					</ToggleButton>
				</Box>
			</DiceTable>
			<DiceChart />
			<ReferenceLink href="https://elins-inn.wikiru.jp/?%E6%AD%A6%E5%99%A8%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0">
				武器システム - Elin 攻略有志wiki
			</ReferenceLink>
		</DefaultPage>
	);
};

export default Page;
