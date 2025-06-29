import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { MapCondition, MapKind } from "@/features/map";
import { getDefaultStorage } from "@/features/storage";

export const DefaultVisible: Record<MapKind, boolean> = {
	base: true,
	nefia: true,
	sample: false,
};

export const DefaultConditions: Record<MapCondition, boolean> = {
	return: false,
	festival: false,
	ignoreClosed: true,
};

export interface GlobalMapState {
	readonly isVisibles: Record<MapKind, boolean>;
	readonly conditions: Record<MapCondition, boolean>;

	reset: () => void;

	setVisible: (kind: MapKind, visible: boolean) => void;
	setCondition: (condition: MapCondition, isEnabled: boolean) => void;
}

export const useGlobalMapStore = create<GlobalMapState>()(
	persist(
		(set, get) => ({
			isVisibles: DefaultVisible,
			conditions: DefaultConditions,

			reset: () => {
				set({
					isVisibles: DefaultVisible,
					conditions: DefaultConditions,
				});
			},

			setVisible: (kind, visible) => {
				const isVisible = { ...get().isVisibles, [kind]: visible };
				set({ isVisibles: isVisible });
			},

			setCondition: (condition: MapCondition, isEnabled: boolean) => {
				const conditions = {
					...get().conditions,
					[condition]: isEnabled,
				};
				set({ conditions: conditions });
			},
		}),
		{
			name: "global-map",
			storage: createJSONStorage(() => getDefaultStorage()),
		},
	),
);
