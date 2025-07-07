import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
	AppBar,
	Box,
	Divider,
	Drawer,
	IconButton,
	styled,
	Toolbar,
	Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import type { FC, ReactNode } from "react";
import { DefaultTheme } from "@/components/theme/DefaultTheme";
import { getExecution, getPage, type PageId } from "@/features/pages";
import { useSidebarStore } from "@/hooks/useSidebarStore";
import { ScmVersion } from "../ScmVersion";
import { SideMenu } from "../SideMenu";

const BaseTitle = "elin tools";

const sidebarWidth = "200px";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const ExecutionDisplayNames: Record<ReturnType<typeof getExecution>, string> = {
	development: "開発",
	staging: "ステージング",
	production: "本番",
} as const;
const execution = getExecution();
export interface DefaultPageProps {
	pageId: PageId;
	children: ReactNode;
}

export const DefaultPage: FC<DefaultPageProps> = (props) => {
	const { children, pageId } = props;
	const sidebarStore = useSidebarStore();

	const page = getPage(pageId);

	return (
		<ThemeProvider theme={DefaultTheme}>
			<Head>
				<title>
					{pageId !== "root" ? `${page.title} - ` : ""}
					{BaseTitle}
				</title>
				<ScmVersion mode="head" />
			</Head>
			<Box sx={{ display: "flex" }}>
				<AppBar
					id="header"
					position="fixed"
					sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
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
						{execution !== "production" && (
							<Typography sx={{ opacity: 0.9, marginLeft: "2ch" }}>
								({ExecutionDisplayNames[execution]})
							</Typography>
						)}
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
					<Offset />
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
					<Offset />
					<Box component="main">{children}</Box>
				</Box>
			</Box>
		</ThemeProvider>
	);
};
