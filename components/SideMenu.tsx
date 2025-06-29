import { List, ListItem } from "@mui/material";
import Link from "next/link";
import { type FC, useEffect } from "react";
import { type PageId, Pages } from "@/features/pages";

const pages = Pages;

export type SideMenuProps = {
	selectedPageId: PageId;
};

export const SideMenu: FC<SideMenuProps> = (props) => {
	const { selectedPageId } = props;

	// biome-ignore lint/correctness/useExhaustiveDependencies: 初回のみ
	useEffect(() => {
		const id = `sidemenu-${selectedPageId}`;
		const element = document.getElementById(id);
		if (element !== null) {
			element.scrollIntoView();
		}
	}, []);

	return (
		<List>
			{pages.map((a) => (
				<ListItem
					key={a.id}
					id={`sidemenu-${a.id}`}
					component={Link}
					href={a.href}
					sx={{
						fontWeight: a.id === selectedPageId ? "bold" : undefined,
					}}
				>
					{a.title}
				</ListItem>
			))}
		</List>
	);
};
