import {
	Button,
	Divider,
	Link,
	List,
	ListItem,
	ListItemText,
	Stack,
	styled,
	Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { DefaultPage } from "@/components/layout/DefaultPage";
import { getDefaultStorage, getDefaultStorageName } from "@/features/storage";
import { useGlobalMapStore } from "@/hooks/useGlobalMapStore";
import { useWeaponEditorsStore } from "@/hooks/useWeaponEditorsStore";

const StyledListItemButton = styled(ListItem)();
const StyledListItemText = styled(ListItemText)({
	marginLeft: 20,
	".MuiListItemText-primary": {
		fontFamily: "monospace",
	},
});

const Page: NextPage = () => {
	const weaponEditorsStore = useWeaponEditorsStore();
	const globalMapStore = useGlobalMapStore();

	const defaultStorageName = getDefaultStorageName();
	const currentStorageName =
		defaultStorageName === "session" ? "sessionStorage" : "localStorage";

	return (
		<DefaultPage pageId="root">
			<Typography variant="h6">これ</Typography>
			<Stack>
				<Typography>
					<Link
						href="https://store.steampowered.com/app/2135150/Elin"
						target="_blank"
					>
						elin
					</Link>
					のちんまいツールなのです。
				</Typography>
			</Stack>

			<Divider sx={{ marginBlock: 2 }} />

			<Typography variant="h6">ストレージ</Typography>
			<Stack>
				<Typography>
					細かい設定は <code>{currentStorageName}</code> に格納されます。
				</Typography>

				<List>
					<StyledListItemButton>
						<Button
							onClick={() => {
								getDefaultStorage().clear();
								location.reload();
							}}
						>
							全部リセット(ワケわかんなくなった時用)
						</Button>
					</StyledListItemButton>

					<Divider sx={{ marginBlock: 1 }} />

					<ListItem>
						<Button onClick={() => weaponEditorsStore.reset()}>
							武器初期化
						</Button>
					</ListItem>
					<StyledListItemText
						primary={
							<pre>
								{JSON.stringify(weaponEditorsStore, undefined, 2)}
							</pre>
						}
					/>

					<Divider sx={{ marginBlock: 1 }} />

					<ListItem>
						<Button onClick={() => globalMapStore.reset()}>
							マップ初期化
						</Button>
					</ListItem>
					<StyledListItemText
						primary={
							<pre>{JSON.stringify(globalMapStore, undefined, 2)}</pre>
						}
					/>
				</List>
			</Stack>
		</DefaultPage>
	);
};

export default Page;
