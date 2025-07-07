import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getValue } from "@/features/access";
import { getDefaultStorage } from "@/features/storage";

export interface DiceEditor {
	dice: string;
	color: string;
}

const DefaultState: WeaponEditorsState = {
	editors: {
		A: { dice: "6d3", color: "#5b9bd5" },
		B: { dice: "4d2+1", color: "#ed7d31" },
	},
	frequency: 1000,
	probability: true,
};

interface WeaponEditorsState {
	readonly editors: Record<string, DiceEditor>;
	readonly frequency: number;
	readonly probability: boolean;
}

interface WeaponEditorsAction {
	reset: () => void;

	setEditor: (id: string, value: DiceEditor) => void;
	setFrequency: (frequency: number) => void;
	setProbability: (probability: boolean) => void;
}

export const useWeaponEditorsStore = create<
	WeaponEditorsState & WeaponEditorsAction
>()(
	persist(
		(set, get) => {
			return {
				...DefaultState,

				reset: () => {
					set(DefaultState);
				},

				setEditor: (id: string, value: DiceEditor) => {
					const current = get().editors;
					const currentEditor = getValue(current, id);
					if (
						currentEditor.dice === value.dice &&
						currentEditor.color === value.color
					) {
						return;
					}
					const editors = { ...current, [id]: value };
					set({ editors: editors });
				},

				setFrequency: (frequency: number) => {
					set({ frequency: frequency });
				},

				setProbability: (probability: boolean) => {
					set({ probability: probability });
				},
			};
		},
		{
			name: "weapon-editors",
			storage: createJSONStorage(() => getDefaultStorage()),
		},
	),
);
