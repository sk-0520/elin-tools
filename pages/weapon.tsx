import { useEffect } from "react";
import { DiceTable } from "@/components/Dice/DiceTable";
import { DefaultPage } from "@/components/layout/DefaultPage";
import { calculateDice, parseDice, roll } from "@/features/dice";
import { BuiltRandom } from "@/features/random";
import { useWeponDiceValuesStore } from "@/hooks/useWeponDiceValuesStore";
import {
	DefaultEditors,
	useWeponEditorsStore,
} from "@/hooks/useWeponEditorsStore";
import { useWeponPointsStore } from "@/hooks/useWeponPointsStore";

const Frequency = 10_000;

export default function RootPage() {
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
			console.debug({ key, editor });
			try {
				weponPointsStore.remove(key);
				if (!editor.trim()) {
					weponEditorsStore.setEditor(key, editor);
					weponDiceValuesStore.setValue(key, undefined);
					weponPointsStore.remove(key);
				} else {
					const dice = parseDice(editor);
					const value = calculateDice(dice);
					weponEditorsStore.setEditor(key, editor);
					weponDiceValuesStore.setValue(key, value);
					const points = roll(value, Frequency, new BuiltRandom());
					weponPointsStore.setPoint(key, points);
					console.table(points);
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

	const handleEditorChanged = (id: string, editor: string) => {
		console.debug({ id, editor });
		weponEditorsStore.setEditor(id, editor);
	};

	return (
		<>
			<DefaultPage pageId="weapon">
				<DiceTable
					diseEditors={weponEditorsStore.editors}
					diseErrors={weponDiceValuesStore.errors}
					diseValues={weponDiceValuesStore.values}
					callbackEditorChanged={handleEditorChanged}
				/>
			</DefaultPage>
			<pre>{JSON.stringify(weponPointsStore.points, undefined, 2)}</pre>
		</>
	);
}
