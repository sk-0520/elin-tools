export type PageId =
	| "root"
	| "weapon"
	| "calculation"
	| "map"
	| "about-library";

export interface PageInfo {
	id: PageId;
	href: `/${string}`;
	title: string;
}

export const Pages: Array<PageInfo> = [
	{
		id: "root",
		href: "/",
		title: "トップ",
	},
	{
		id: "weapon",
		href: "/weapon",
		title: "武器",
	},
	{
		id: "calculation",
		href: "/calculation",
		title: "適当計算",
	},
	{
		id: "map",
		href: "/map",
		title: "マップ",
	},
	{
		id: "about-library",
		href: "/about/library",
		title: "ライブラリ",
	},
];

export function getExecution(): "prodction" | "staging" | "development" {
	switch (process.env.NEXT_PUBLIC_DEFAULT_STORAGE) {
		case "prodction":
			return "prodction";

		case "staging":
			return "staging";

		default:
			return "development";
	}
}
