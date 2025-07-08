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

export function getMobileBreakpoint(theme: Theme): string {
	return theme.breakpoints.down(mobileBreakpoint);
}

export function getPcBreakpoint(theme: Theme): string {
	return theme.breakpoints.up(pcBreakpoint);
}
