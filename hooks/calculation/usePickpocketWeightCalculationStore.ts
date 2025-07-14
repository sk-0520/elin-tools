import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getDefaultStorage } from "@/features/storage";

const DefaultState: PickpocketWeightCalculationState = {
	strength: 20,
	pickpocket: 10,
};

export interface PickpocketWeightCalculationState {
	readonly strength: number;
	readonly pickpocket: number;
}

export interface PickpocketWeightCalculationAction {
	reset: () => void;
	setStrength: (value: number) => void;
	setPickpocket: (value: number) => void;
}

export interface PickpocketWeightCalculationStore
	extends PickpocketWeightCalculationState,
		PickpocketWeightCalculationAction {}

export const usePickpocketWeightCalculationStore =
	create<PickpocketWeightCalculationStore>()(
		persist(
			(set, _get) => ({
				...DefaultState,

				reset: () => set(DefaultState),

				setStrength: (value: number) => set({ strength: value }),
				setPickpocket: (value: number) => set({ pickpocket: value }),
			}),
			{
				name: "calculation-pickpocket-weight",
				storage: createJSONStorage(() => getDefaultStorage()),
			},
		),
	);
