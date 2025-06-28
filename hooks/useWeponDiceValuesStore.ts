import { create } from "zustand";
import type { DiceValue } from "@/features/dice";

export interface WeponDiceValuesState {
	readonly errors: Record<string, string>;
	readonly values: Record<string, DiceValue>;

	setError: (id: string, error: string) => void;
	setValue: (id: string, dice: DiceValue | undefined) => void;
}

export const useWeponDiceValuesStore = create<WeponDiceValuesState>(
	(set, get) => {
		return {
			errors: {},
			values: {},

			setError: (key: string, error: string) => {
				const values = { ...get().values };
				const errors = { ...get().errors, [key]: error };

				delete values[key];

				set({ values: values, errors: errors });
			},

			setValue: (key: string, dice: DiceValue | undefined) => {
				const values = { ...get().values };
				const errors = { ...get().errors };

				if (dice) {
					values[key] = dice;
				} else {
					delete values[key];
				}

				delete errors[key];

				set({ values: values, errors: errors });
			},
		};
	},
);
