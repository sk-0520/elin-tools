import { create } from "zustand";

export interface WeponPointsState {
	readonly points: Record<string, Array<Array<number>>>;

	remove: (key: string) => void;
	setPoint: (key: string, points: Array<Array<number>>) => void;
}

export const useWeponPointsStore = create<WeponPointsState>((set, get) => {
	return {
		points: {},

		remove: (key: string) => {
			const points = { ...get().points };
			delete points[key];
			set({ points: points });
		},

		setPoint: (key: string, points: Array<Array<number>>) => {
			const current = get().points;
			if (current[key] === points) {
				return;
			}
			const items = { ...current, [key]: points };
			set({ points: items });
		},
	};
});
