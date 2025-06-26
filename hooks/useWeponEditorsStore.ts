import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { DiceValue } from "@/features/dice";
import { getDefaultStorage } from "@/features/storage";

export const DefaultEditors = { A: "", B: "" };

export interface WeponEditorsState {
	readonly editors: Record<string, string>;
	readonly errors: Record<string, string>;
	readonly values: Record<string, DiceValue>;

	reset: () => void;

	setEditor: (key: string, dice: string) => void;
}

export const useWeponEditorsStore = create<WeponEditorsState>()(
	persist(
		(set, get) => {
			return {
				editors: DefaultEditors,
				errors: {},
				values: {},

				reset: () => {
					set({ editors: { ...DefaultEditors }, values: {} });
				},

				setEditor: (key: string, dice: string) => {
					const current = get().editors;
					if (current[key] === dice) {
						return;
					}
					const ediors = { ...current, [key]: dice };
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
