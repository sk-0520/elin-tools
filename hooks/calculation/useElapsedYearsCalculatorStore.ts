import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getDefaultStorage } from "@/features/storage";

const DefaultState: ElapsedYearsCalculatorState = {
	days: 30 * 12,
};

export interface ElapsedYearsCalculatorState {
	readonly days: number;
}

export interface ElapsedYearsCalculatorAction {
	reset: () => void;
	setDays: (value: number) => void;
}

export interface ElapsedYearsCalculatorStore
	extends ElapsedYearsCalculatorState,
		ElapsedYearsCalculatorAction {}

export const useElapsedYearsCalculatorStore =
	create<ElapsedYearsCalculatorStore>()(
		persist(
			(set, _get) => ({
				...DefaultState,

				reset: () => set(DefaultState),

				setDays: (value: number) => set({ days: value }),
			}),
			{
				name: "calculation-elapsed-years",
				storage: createJSONStorage(() => getDefaultStorage()),
			},
		),
	);
