import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getDefaultStorage } from "@/features/storage";

const DefaultState: PickpocketWeightCalculationState = {
	strength: 20,
	pickpocket: 10,
};

interface PickpocketWeightCalculationState {
	readonly strength: number;
	readonly pickpocket: number;
}

interface PickpocketWeightCalculationAction {
	setStrength: (value: number) => void;
	setPickpocket: (value: number) => void;
}

export const usePickpocketWeightCalculationStore = create<
	PickpocketWeightCalculationState & PickpocketWeightCalculationAction
>()(
	persist(
		(set, _get) => ({
			...DefaultState,

			setStrength: (value: number) => set({ strength: value }),
			setPickpocket: (value: number) => set({ pickpocket: value }),
		}),
		{
			name: "calculation-pickpocket-weight",
			storage: createJSONStorage(() => getDefaultStorage()),
		},
	),
);
