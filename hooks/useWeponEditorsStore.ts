import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getDefaultStorage } from "@/features/storage";

export interface DiceEditor {
	dice: string;
	color: string;
}

const DefaultState: WeponEditorsState = {
	editors: {
		A: { dice: "6d3", color: "#5b9bd5" },
		B: { dice: "4d2+1", color: "#ed7d31" },
	},
	frequency: 1000,
};

interface WeponEditorsState {
	readonly editors: Record<string, DiceEditor>;
	readonly frequency: number;
}

interface WeponEditorsAction {
	reset: () => void;

	setEditor: (id: string, value: DiceEditor) => void;
	setFrequency: (frequency: number) => void;
}

export const useWeponEditorsStore = create<
	WeponEditorsState & WeponEditorsAction
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
					if (
						current[id].dice === value.dice &&
						current[id].color === value.color
					) {
						return;
					}
					const ediors = { ...current, [id]: value };
					set({ editors: ediors });
				},

				setFrequency: (frequency: number) => {
					set({ frequency: frequency });
				},
			};
		},
		{
			name: "weapon-dice",
			storage: createJSONStorage(() => getDefaultStorage()),
		},
	),
);
