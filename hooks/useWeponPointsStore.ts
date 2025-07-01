import { create } from "zustand";

const DefaultState: WeponPointsState = {
	points: {},
};

export interface WeponPointsState {
	readonly points: Record<string, Array<Array<number>>>;
}

export interface WeponPointsAction {
	remove: (id: string) => void;
	setPoint: (id: string, points: Array<Array<number>>) => void;
}

export const useWeponPointsStore = create<WeponPointsState & WeponPointsAction>(
	(set, get) => {
		return {
			...DefaultState,

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
	},
);
