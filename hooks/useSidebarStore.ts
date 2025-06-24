import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getDefaultStorage } from "@/features/storage";

export interface SidebarState {
	readonly isOpen: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
}

export const useSidebarStore = create<SidebarState>()(
	persist(
		(set, get) => ({
			isOpen: true,
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
