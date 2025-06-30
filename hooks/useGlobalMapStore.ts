import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { MapCondition, MapImplementation, MapKind } from "@/features/map";
import { getDefaultStorage } from "@/features/storage";

export const DefaultVisible: Record<MapKind, boolean> = {
	base: true,
	nefia: true,
	sample: false,
};

export const DefaultConditions: Record<MapCondition, boolean> = {
	return: false,
	festival: false,
	implementation: false,
};

export const DefaultImplementations: Record<MapImplementation, boolean> = {
	notImplemented: false,
	inProgress: true,
	completed: true,
};

export interface GlobalMapState {
	readonly isVisibles: Record<MapKind, boolean>;
	readonly conditions: Record<MapCondition, boolean>;
	readonly implementations: Record<MapImplementation, boolean>;

	reset: () => void;

	setVisible: (kind: MapKind, visible: boolean) => void;
	setCondition: (condition: MapCondition, isEnabled: boolean) => void;
	setImplementation: (
		implementation: MapImplementation,
		isEnabled: boolean,
	) => void;
}

export const useGlobalMapStore = create<GlobalMapState>()(
	persist(
		(set, get) => ({
			isVisibles: DefaultVisible,
			conditions: DefaultConditions,
			implementations: DefaultImplementations,

			reset: () => {
				set({
					isVisibles: DefaultVisible,
					conditions: DefaultConditions,
					implementations: DefaultImplementations,
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

			setImplementation: (
				implementation: MapImplementation,
				isEnabled: boolean,
			) => {
				const implementations = {
					...get().implementations,
					[implementation]: isEnabled,
				};
				set({ implementations: implementations });
			},
		}),
		{
			name: "global-map",
			storage: createJSONStorage(() => getDefaultStorage()),
		},
	),
);
