import type { Breakpoint, Theme } from "@mui/material";

const mobileBreakpoint: Breakpoint = "sm";
const pcBreakpoint: Breakpoint = "md";

export interface WindowSize {
	width: number;
	height: number;
}

export function isMobile(theme: Theme, size: WindowSize): boolean {
	return size.width <= theme.breakpoints.values[mobileBreakpoint];
}

export function getBreakpoint(theme: Theme, device: "pc" | "mobile"): string {
	switch (device) {
		case "pc":
			return theme.breakpoints.up(pcBreakpoint);

		case "mobile":
			return theme.breakpoints.down(mobileBreakpoint);
	}
}
