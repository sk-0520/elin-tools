import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
	AppBar,
	Box,
	Divider,
	Drawer,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import type { FC, ReactNode } from "react";
import { type PageId, Pages } from "@/features/pages";
import { useSidebarStore } from "@/hooks/useSidebarStore";
import { SideMenu } from "../SideMenu";

const sidebarWidth = "200px";

export interface DefaultPageProps {
	pageId: PageId;
	children: ReactNode;
}

export const DefaultPage: FC<DefaultPageProps> = (props) => {
	const { children, pageId } = props;
	const sidebarStore = useSidebarStore();

	const page = Pages.find((a) => a.id === pageId);
	if (!page) {
		throw new Error(pageId);
	}

	return (
		<Box sx={{ display: "flex" }}>
			{/** biome-ignore lint/nursery/useUniqueElementIds: id は header 固定 */}
			<AppBar
				id="header"
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={sidebarStore.toggle}
						edge="start"
						sx={{
							marginRight: "1ch",
						}}
					>
						{sidebarStore.isOpen ? <MenuOpenIcon /> : <MenuIcon />}
					</IconButton>
					<Typography variant="h6" noWrap component="h1">
						{page.title}
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: sidebarWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: sidebarWidth,
						boxSizing: "border-box",
					},
					display: sidebarStore.isOpen ? undefined : "none",
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar />
				<Divider />
				<SideMenu selectedPageId={pageId} />
			</Drawer>

			<Box
				sx={{
					flexGrow: 1,
					bgcolor: "background.default",
					margin: "1em 3ch 10em 2ch",
				}}
			>
				<Toolbar />
				<main>{children}</main>
			</Box>
		</Box>
	);
};
