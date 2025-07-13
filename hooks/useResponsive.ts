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

export type ResponsiveState = {
	windowSize: WindowSize;
	isMobile: boolean;
};

export type ResponsiveAction = {
	initialize: () => void;
};

export type ResponsiveStore = ResponsiveState & ResponsiveAction;

export const useResponsive = create<ResponsiveStore>()((set, _get) => {
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
