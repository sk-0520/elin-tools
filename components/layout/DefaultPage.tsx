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
import { type FC, type ReactNode, useState } from "react";

const sidebarWidth = "200px";

export interface DefaultPageProps {
	children: ReactNode;
}

export const DefaultPage: FC<DefaultPageProps> = (props) => {
	const { children } = props;
	const [isOpen, setIsOpen] = useState(false);

	const handleDrawerOpen = () => {
		setIsOpen((v) => !v);
	};

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
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: "1ch",
						}}
					>
						{isOpen ? <MenuOpenIcon /> : <MenuIcon />}
					</IconButton>
					<Typography variant="h6" noWrap component="h1">
						{/* {currentPage.title} */}
						asdasdasd
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
					display: isOpen ? undefined : "none",
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar />
				<Divider />
				{/* <SideMenu
					selectedPageKey={selectedPageKey}
					handleSelectPageKey={handleSelectPageKey}
				/> */}
			</Drawer>

			<Box
				component="main"
				sx={{
					flexGrow: 1,
					bgcolor: "background.default",
					margin: "1em 3ch 10em 2ch",
				}}
			>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};
