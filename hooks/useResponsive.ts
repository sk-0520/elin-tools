import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { create } from "zustand";
import {
	getMobileBreakpoint,
	getPcBreakpoint,
	isMobile,
	type WindowSize,
} from "@/features/responsive";

const DefaultState: ResponsiveState = {
	window: {
		width: 1024,
		height: 800,
	},
	isMobile: false,
	style: {
		mobile: "",
		pc: "",
	},
};

export type ResponsiveState = {
	window: WindowSize;
	isMobile: boolean;
	style: {
		mobile: string;
		pc: string;
	};
};

export const useResponsive = create<ResponsiveState>()((set, _get) => {
	const theme = useTheme();

	const applyWindowSize = () => {
		const windowSize: WindowSize = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		set({
			window: windowSize,
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

	return {
		...DefaultState,

		style: {
			mobile: getMobileBreakpoint(theme),
			pc: getPcBreakpoint(theme),
		},
	};
});
