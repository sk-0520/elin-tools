import { create } from "zustand";

export interface WeponPointsState {
	readonly points: Record<string, Array<Array<number>>>;

	remove: (id: string) => void;
	setPoint: (id: string, points: Array<Array<number>>) => void;
}

export const useWeponPointsStore = create<WeponPointsState>((set, get) => {
	return {
		points: {},

		remove: (id: string) => {
			const points = { ...get().points };
			delete points[id];
			set({ points: points });
		},

		setPoint: (id: string, points: Array<Array<number>>) => {
			const current = get().points;
			if (current[id] === points) {
				return;
			}
			const items = { ...current, [id]: points };
			set({ points: items });
		},
	};
});
