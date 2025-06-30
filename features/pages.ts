export type PageId = "root" | "weapon" | "map" | "about-library";

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
