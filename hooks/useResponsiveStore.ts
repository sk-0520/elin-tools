import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { create } from "zustand";
import { isMobile, type WindowSize } from "@/features/responsive";

const DefaultState: ResponsiveState = {
	windowSize: {
		width: 1024,
		height: 800,
	},
	isMobile: false,
};

export interface ResponsiveState {
	windowSize: WindowSize;
	isMobile: boolean;
}

export interface ResponsiveAction {
	initialize: () => void;
}

export interface ResponsiveStore extends ResponsiveState, ResponsiveAction {}

export const useResponsiveStore = create<ResponsiveStore>()((set, _get) => {
	return {
		...DefaultState,

		initialize: () => {
			const theme = useTheme();

			const applyWindowSize = () => {
				const windowSize: WindowSize = {
					width: window.innerWidth,
					height: window.innerHeight,
				};

				set({
					windowSize: windowSize,
					isMobile: isMobile(theme, windowSize),
				});
			};

			const handleResize = () => {
				applyWindowSize();
			};

			// biome-ignore lint/correctness/useExhaustiveDependencies: handleResize
			useEffect(() => {
				window.addEventListener("resize", handleResize);

				applyWindowSize();

				return () => {
					window.removeEventListener("resize", handleResize);
				};
			}, []);
		},
	};
});
