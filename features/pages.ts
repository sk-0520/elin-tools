export type PageId = "root";

export interface PageInfo {
	id: PageId;
	title: string;
}

export const Pages: Array<PageInfo> = [
	{
		id: "root",
		title: "トップ",
	},
];
