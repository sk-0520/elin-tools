import { Box, Button, ButtonGroup, Tooltip, Typography } from "@mui/material";
import type { NextPage } from "next";
import { DiceChart } from "@/components/dice/DiceChart";
import { DiceTable } from "@/components/dice/DiceTable";
import { DefaultPage } from "@/components/layout/DefaultPage";
import { NumericFormat } from "@/components/NumericFormat";
import { ReferenceLink } from "@/components/ReferenceLink";
import { useWeponEditorsStore } from "@/hooks/useWeponEditorsStore";

const Frequencies = [100, 1000, 10000, 100000] as const;

const Page: NextPage = () => {
	// // biome-ignore lint/correctness/useExhaustiveDependencies: 初回
	// useEffect(() => {
	// 	const editors = weponEditorsStore.editors;
	// 	if (Object.keys(editors).length === 0) {
	// 		console.info("リセット");
	// 		weponEditorsStore.reset();
	// 	}
	// }, []);

	// // ダイス入力
	// useEffect(() => {
	// 	console.assert(slacker);
	// 	const editors = weponEditorsStore.editors;
	// 	console.log({ editors });
	// 	for (const [key, editor] of Object.entries(editors)) {
	// 		try {
	// 			weponPointsStore.remove(key);
	// 			if (!editor.dice.trim()) {
	// 				weponEditorsStore.setEditor(key, editor);
	// 				weponDiceValuesStore.setValue(key, undefined);
	// 				weponPointsStore.remove(key);
	// 			} else {
	// 				const dice = parseDice(editor.dice);
	// 				const value = calculateDice(dice);
	// 				weponEditorsStore.setEditor(key, editor);
	// 				weponDiceValuesStore.setValue(key, value);
	// 				const points = rollDice(
	// 					value,
	// 					weponEditorsStore.frequency,
	// 					new BuiltinRandom(),
	// 				);
	// 				weponPointsStore.setPoint(key, points);
	// 			}
	// 		} catch (ex) {
	// 			console.error(ex);
	// 			weponDiceValuesStore.setError(key, `${ex}`);
	// 		}
	// 	}
	// }, [
	// 	weponEditorsStore.editors,
	// 	weponEditorsStore.frequency,
	// 	weponEditorsStore.setEditor,
	// 	weponDiceValuesStore.setError,
	// 	weponDiceValuesStore.setValue,
	// 	weponPointsStore.remove,
	// 	weponPointsStore.setPoint,
	// 	slacker,
	// ]);

	// const handleEditorChanged = (id: string, editor: DiceEditor) => {
	// 	console.debug({ id, editor });
	// 	weponEditorsStore.setEditor(id, editor);
	// };

	// const editorIds = useWeponEditorsStore(
	// 	useShallow((a) => Object.keys(a.editors)),
	// );

	const frequency = useWeponEditorsStore((a) => a.frequency);
	const setFrequency = useWeponEditorsStore((a) => a.setFrequency);

	const handleFrequencyClick = (frequency: number) => {
		setFrequency(frequency);
	};

	return (
		<DefaultPage pageId="weapon">
			<DiceTable>
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
											frequency === a ? "contained" : undefined
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
							// for (const [key, value] of Object.entries(
							// 	weponDiceValuesStore.values,
							// )) {
							// 	const points = rollDice(
							// 		value,
							// 		weponEditorsStore.frequency,
							// 		new BuiltinRandom(),
							// 	);
							// 	weponPointsStore.setPoint(key, points);
							// }
							/*
							setSlacker({});
							*/
						}}
					>
						再計算
					</Button>
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
