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

export function getPage(pageId: PageId): PageInfo {
	const page = Pages.find((a) => a.id === pageId);
	if (page === undefined) {
		throw new RangeError(pageId);
	}

	return page;
}

export function getExecution(): "production" | "staging" | "development" {
	switch (process.env.NEXT_PUBLIC_EXECUTION) {
		case "production":
			return "production";

		case "staging":
			return "staging";

		default:
			return "development";
	}
}
