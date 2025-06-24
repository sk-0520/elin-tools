import { List, ListItemButton } from "@mui/material";
import type { FC } from "react";
import { type PageId, Pages } from "@/features/pages";

const pages = Pages;

export type SideMenuProps = {
	selectedPageId: PageId;
};

export const SideMenu: FC<SideMenuProps> = (props) => {
	const { selectedPageId } = props;

	return (
		<List>
			{pages.map((a) => (
				<ListItemButton
					key={a.id}
					sx={{
						fontWeight: a.id === selectedPageId ? "bold" : undefined,
					}}
				>
					{a.title}
				</ListItemButton>
			))}
		</List>
	);
};
