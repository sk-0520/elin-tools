import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getDefaultStorage } from "@/features/storage";

const DefaultState: SidebarState = {
	isOpen: true,
};

export interface SidebarState {
	readonly isOpen: boolean;
}

export interface SidebarAction {
	open: () => void;
	close: () => void;
	toggle: () => void;
}

export interface SidebarStore extends SidebarState, SidebarAction {}

export const useSidebarStore = create<SidebarStore>()(
	persist(
		(set, get) => ({
			...DefaultState,

			open: () => set({ isOpen: true }),
			close: () => set({ isOpen: false }),
			toggle: () => {
				set({ isOpen: !get().isOpen });
			},
		}),
		{
			name: "sidebar",
			storage: createJSONStorage(() => getDefaultStorage()),
		},
	),
);
