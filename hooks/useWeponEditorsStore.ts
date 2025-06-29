import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getDefaultStorage } from "@/features/storage";

export interface DiceEditor {
	dice: string;
	color: string;
}

export const DefaultEditors: { [key: string]: DiceEditor } = {
	A: { dice: "4d2", color: "#5b9bd5" },
	B: { dice: "3d2+1", color: "#ed7d31" },
};

export interface WeponEditorsState {
	readonly editors: Record<string, DiceEditor>;

	reset: () => void;

	setEditor: (id: string, value: DiceEditor) => void;
}

export const useWeponEditorsStore = create<WeponEditorsState>()(
	persist(
		(set, get) => {
			return {
				editors: DefaultEditors,

				reset: () => {
					set({ editors: { ...DefaultEditors } });
				},

				setEditor: (id: string, value: DiceEditor) => {
					const current = get().editors;
					if (
						current[id].dice === value.dice &&
						current[id].color === value.color
					) {
						return;
					}
					const ediors = { ...current, [id]: value };
					set({ editors: ediors });
				},
			};
		},
		{
			name: "weapon-dice",
			storage: createJSONStorage(() => getDefaultStorage()),
		},
	),
);
