import { Box, Button, TextField } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { DiceChart } from "@/components/dice/DiceChart";
import { DiceTable } from "@/components/dice/DiceTable";
import { DefaultPage } from "@/components/layout/DefaultPage";
import { calculateDice, parseDice, rollDice } from "@/features/dice";
import { BuiltinRandom } from "@/features/random";
import { useWeponDiceValuesStore } from "@/hooks/useWeponDiceValuesStore";
import {
	DefaultEditors,
	type DiceEditor,
	useWeponEditorsStore,
} from "@/hooks/useWeponEditorsStore";
import { useWeponPointsStore } from "@/hooks/useWeponPointsStore";

//const Frequency = 10_000;

interface InputValues {
	frequency: number;
}

const Page: NextPage = () => {
	const weponEditorsStore = useWeponEditorsStore();
	const weponDiceValuesStore = useWeponDiceValuesStore();
	const weponPointsStore = useWeponPointsStore();
	const { control, setValue, getValues, handleSubmit } = useForm<InputValues>({
		mode: "onBlur",
		reValidateMode: "onBlur",
		// defaultValues: {
		// 	frequency: weponEditorsStore.frequency,
		// },
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: 初回
	useEffect(() => {
		const editors = weponEditorsStore.editors;
		if (Object.keys(editors).length < Object.keys(DefaultEditors).length) {
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

	const handleFrequencyChange = () => {
		const frequency = getValues("frequency");
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
					<Button
						variant="contained"
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

					{/* こんな頑張らんでもプルダウンとかシークバーでいい気がしてきた */}
					<Controller
						control={control}
						name="frequency"
						rules={{
							required: true,
							validate: (value: unknown) => {
								if (typeof value !== "string") {
									return false;
								}
								const numValue = Number.parseInt(value);
								return !Number.isNaN(numValue);
							},
						}}
						// biome-ignore lint/correctness/noUnusedFunctionParameters: あとでー
						render={({ field, formState: { errors } }) => (
							<TextField
								label="頻度"
								{...field}
								size="small"
								type="number"
								sx={{
									textAlign: "right",
									width: "20ch",
								}}
								// inputMode="numeric"
								// slotProps={{
								// 	htmlInput: {
								// 		pattern: "^[1-9][0-9]*$",
								// 	},
								// }}
								defaultValue={weponEditorsStore.frequency}
								onBlur={handleSubmit(handleFrequencyChange)}
							/>
						)}
					/>
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
