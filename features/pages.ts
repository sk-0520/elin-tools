export type PageId = "root";
export interface PageInfo {
	title: string;
}

export const Pages: Record<PageId, PageInfo> = {
	root: {
		title: "",
	},
};
