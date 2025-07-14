import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { MapCondition, MapImplementation, MapKind } from "@/features/map";
import { getDefaultStorage } from "@/features/storage";

const DefaultState: GlobalMapState = {
	controller: true,
	isVisibles: {
		base: true,
		nefia: true,
		sample: false,
	},
	conditions: {
		return: false,
		festival: false,
		implementation: false,
	},
	implementations: {
		notImplemented: false,
		inProgress: true,
		completed: true,
	},
};

export interface GlobalMapState {
	readonly controller: boolean;
	readonly isVisibles: Record<MapKind, boolean>;
	readonly conditions: Record<MapCondition, boolean>;
	readonly implementations: Record<MapImplementation, boolean>;
}

export interface GlobalMapAction {
	reset: () => void;

	setController: (isVisible: boolean) => void;
	setVisible: (kind: MapKind, isVisible: boolean) => void;
	setCondition: (condition: MapCondition, isEnabled: boolean) => void;
	setImplementation: (
		implementation: MapImplementation,
		isEnabled: boolean,
	) => void;
}

export interface GlobalMapStore extends GlobalMapState, GlobalMapAction {}

export const useGlobalMapStore = create<GlobalMapStore>()(
	persist(
		(set, get) => ({
			...DefaultState,

			reset: () => {
				set(DefaultState);
			},

			setController: (isVisible: boolean) => {
				set({ controller: isVisible });
			},

			setVisible: (kind: MapKind, isVisible: boolean) => {
				const isVisibles = { ...get().isVisibles, [kind]: isVisible };
				set({ isVisibles: isVisibles });
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
