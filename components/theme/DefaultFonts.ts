import type { CSSProperties } from "react";
import { toCssFontFamily } from "@/features/style";

export const DefaultFontFamily: CSSProperties["fontFamily"] = toCssFontFamily([
	"Verdana",
	"Skia-Regular_Condensed",
	"Tahoma",
	"Meiryo UI",
	"メイリオ",
	"Meiryo",
	"Osaka",
	"YuGothic",
	"Yu Gothic",
	"sans-serif",
]);
