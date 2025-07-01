import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getDefaultStorage } from "@/features/storage";

const DefaultState: SidebarState = {
	isOpen: true,
};

interface SidebarState {
	readonly isOpen: boolean;
}

interface SidebarAction {
	open: () => void;
	close: () => void;
	toggle: () => void;
}

export const useSidebarStore = create<SidebarState & SidebarAction>()(
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
