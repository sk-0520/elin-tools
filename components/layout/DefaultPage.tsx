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
import { type FC, type ReactNode, useEffect, useState } from "react";
import { DefaultTheme } from "@/components/theme/DefaultTheme";
import { getExecution, getPage, type PageId } from "@/features/pages";
import { useResponsiveStore } from "@/hooks/useResponsiveStore";
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

const AppMenuIcon: FC<{ isOpen: boolean }> = (props) => {
	const { isOpen } = props;

	return isOpen ? <MenuOpenIcon /> : <MenuIcon />;
};

export const DefaultPage: FC<DefaultPageProps> = (props) => {
	const { children, pageId } = props;
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
	//const sidebarStore = useSidebarStore();
	const isOpen = useSidebarStore((a) => a.isOpen);
	const toggle = useSidebarStore((a) => a.toggle);
	const isMobile = useResponsiveStore((a) => a.isMobile);
	const initialize = useResponsiveStore((a) => a.initialize);

	const page = getPage(pageId);

	initialize();

	useEffect(() => {
		if (!isMobile) {
			if (isMobileSidebarOpen) {
				setIsMobileSidebarOpen(false);
			}
		}
	}, [isMobile, isMobileSidebarOpen]);

	return (
		<ThemeProvider theme={DefaultTheme}>
			<Head>
				<title>
					{pageId !== "root" ? `${page.title} - ` : ""}
					{BaseTitle}
				</title>
				<ScmVersion mode="head" />
			</Head>

			<AppBar
				id="header"
				position="sticky"
				sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1, padding: 0 })}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => {
							toggle();
							if (isMobile) {
								setIsMobileSidebarOpen((a) => !a);
							}
						}}
						edge="start"
						sx={{
							marginRight: "1ch",
						}}
					>
						<AppMenuIcon
							isOpen={isMobile ? isMobileSidebarOpen : isOpen}
						/>
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="h1"
						sx={{
							// 地味に削れるテキストの対応
							paddingRight: "2px",
						}}
					>
						{page.title}
					</Typography>
					{execution !== "production" && (
						<Typography sx={{ opacity: 0.9, marginLeft: "2ch" }}>
							({ExecutionDisplayNames[execution]})
						</Typography>
					)}
				</Toolbar>
			</AppBar>

			<Box sx={{ display: "flex" }}>
				<Drawer
					sx={
						isMobile
							? undefined
							: {
									width: sidebarWidth,
									flexShrink: 0,
									"& .MuiDrawer-paper": {
										width: sidebarWidth,
										boxSizing: "border-box",
									},
									display: isOpen ? undefined : "none",
								}
					}
					anchor="left"
					open={isMobile ? isMobileSidebarOpen : undefined}
					variant={isMobile ? "temporary" : "permanent"}
					onClose={() => {
						if (isMobile) {
							setIsMobileSidebarOpen(false);
						}
					}}
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
					<Box component="main">{children}</Box>
				</Box>
			</Box>
		</ThemeProvider>
	);
};
