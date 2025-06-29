import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MapKind } from "@/features/map";
import { getDefaultStorage } from "@/features/storage";

export const DefaultVisible: Record<MapKind, boolean> = {
	base: true,
	nefia: true,
	sample: false,
};

export interface GlobalMapState {
	readonly isVisible: Record<MapKind, boolean>;

	setVisible: (kind: MapKind, visible: boolean) => void;
}

export const useGlobalMapStore = create<GlobalMapState>()(
	persist(
		(set, get) => ({
			isVisible: DefaultVisible,

			setVisible: (kind, visible) => {
				const isVisible = { ...get().isVisible, [kind]: visible };
				set({ isVisible: isVisible });
			},
		}),
		{
			name: "global-map",
			storage: createJSONStorage(() => getDefaultStorage()),
		},
	),
);
