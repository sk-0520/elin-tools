import type { NextPage } from "next";
import { useEffect } from "react";
import { DiceChart } from "@/components/Dice/DiceChart";
import { DiceTable } from "@/components/Dice/DiceTable";
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

const Frequency = 10_000;

const Page: NextPage = () => {
	const weponEditorsStore = useWeponEditorsStore();
	const weponDiceValuesStore = useWeponDiceValuesStore();
	const weponPointsStore = useWeponPointsStore();

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
						Frequency,
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

	return (
		<>
			<DefaultPage pageId="weapon">
				<DiceTable
					editors={weponEditorsStore.editors}
					errors={weponDiceValuesStore.errors}
					values={weponDiceValuesStore.values}
					callbackEditorChanged={handleEditorChanged}
				/>
				{0 < Object.keys(weponDiceValuesStore.values).length && (
					<DiceChart
						editors={weponEditorsStore.editors}
						values={weponDiceValuesStore.values}
						points={weponPointsStore.points}
					/>
				)}
			</DefaultPage>
		</>
	);
};

export default Page;
