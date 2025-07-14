import { create } from "zustand";
import type { DiceValue } from "@/features/dice";

const DefaultState: WeaponDiceValuesState = {
	errors: {},
	values: {},
};

export interface WeaponDiceValuesState {
	readonly errors: Record<string, string>;
	readonly values: Record<string, DiceValue>;
}

export interface WeaponDiceValuesAction {
	setError: (id: string, error: string) => void;
	setValue: (id: string, dice: DiceValue | undefined) => void;
}

export interface WeaponDiceValuesStore
	extends WeaponDiceValuesState,
		WeaponDiceValuesAction {}

export const useWeaponDiceValuesStore = create<WeaponDiceValuesStore>(
	(set, get) => {
		return {
			...DefaultState,

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
