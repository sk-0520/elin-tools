export type PageId = "root" | "weapon" | "map";

export interface PageInfo {
	id: PageId;
	href: string;
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
];
