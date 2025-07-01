import { Box, Button, ButtonGroup, Tooltip, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import { DiceChart } from "@/components/dice/DiceChart";
import { DiceTable } from "@/components/dice/DiceTable";
import { DefaultPage } from "@/components/layout/DefaultPage";
import { NumericFormat } from "@/components/NumericFormat";
import { calculateDice, parseDice, rollDice } from "@/features/dice";
import { BuiltinRandom } from "@/features/random";
import { useWeponDiceValuesStore } from "@/hooks/useWeponDiceValuesStore";
import {
	type DiceEditor,
	useWeponEditorsStore,
} from "@/hooks/useWeponEditorsStore";
import { useWeponPointsStore } from "@/hooks/useWeponPointsStore";

const Frequencies = [100, 1000, 10000, 100000] as const;

const Page: NextPage = () => {
	const weponEditorsStore = useWeponEditorsStore();
	const weponDiceValuesStore = useWeponDiceValuesStore();
	const weponPointsStore = useWeponPointsStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: 初回
	useEffect(() => {
		const editors = weponEditorsStore.editors;
		if (Object.keys(editors).length === 0) {
			console.info("リセット");
			weponEditorsStore.reset();
		}
	}, []);

	// ダイス入力
	useEffect(() => {
		const editors = weponEditorsStore.editors;
		console.log({ editors });
		for (const [key, editor] of Object.entries(editors)) {
			try {
				weponPointsStore.remove(key);
				if (!editor.dice.trim()) {
					weponEditorsStore.setEditor(key, editor);
					weponDiceValuesStore.setValue(key, undefined);
					weponPointsStore.remove(key);
				} else {
					const dice = parseDice(editor.dice);
					const value = calculateDice(dice);
					weponEditorsStore.setEditor(key, editor);
					weponDiceValuesStore.setValue(key, value);
					const points = rollDice(
						value,
						weponEditorsStore.frequency,
						new BuiltinRandom(),
					);
					weponPointsStore.setPoint(key, points);
				}
			} catch (ex) {
				console.error(ex);
				weponDiceValuesStore.setError(key, `${ex}`);
			}
		}
	}, [
		weponEditorsStore.editors,
		weponEditorsStore.frequency,
		weponEditorsStore.setEditor,
		weponDiceValuesStore.setError,
		weponDiceValuesStore.setValue,
		weponPointsStore.remove,
		weponPointsStore.setPoint,
	]);

	const handleEditorChanged = (id: string, editor: DiceEditor) => {
		console.debug({ id, editor });
		weponEditorsStore.setEditor(id, editor);
	};

	const handleFrequencyClick = (frequency: number) => {
		weponEditorsStore.setFrequency(frequency);
	};

	return (
		<DefaultPage pageId="weapon">
			<DiceTable
				editors={weponEditorsStore.editors}
				errors={weponDiceValuesStore.errors}
				values={weponDiceValuesStore.values}
				onEditorChanged={handleEditorChanged}
			>
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
										variant={
											weponEditorsStore.frequency === a
												? "contained"
												: undefined
										}
										onClick={(_e) => handleFrequencyClick(a)}
									>
										<Typography>
											10
											<sup>{Math.log10(a)}</sup>
										</Typography>
									</Button>
								</Tooltip>
							);
						})}
					</ButtonGroup>

					<Button
						variant="contained"
						sx={{
							marginLeft: "2ch",
						}}
						onClick={() => {
							for (const [key, value] of Object.entries(
								weponDiceValuesStore.values,
							)) {
								const points = rollDice(
									value,
									weponEditorsStore.frequency,
									new BuiltinRandom(),
								);
								weponPointsStore.setPoint(key, points);
							}
						}}
					>
						再計算
					</Button>
				</Box>
			</DiceTable>
			{0 < Object.keys(weponDiceValuesStore.values).length && (
				<DiceChart
					editors={weponEditorsStore.editors}
					values={weponDiceValuesStore.values}
					points={weponPointsStore.points}
				/>
			)}
		</DefaultPage>
	);
};

export default Page;
