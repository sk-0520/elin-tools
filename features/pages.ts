export type PageId = "root";

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
];
