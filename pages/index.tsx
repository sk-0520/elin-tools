import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	type AccordionSummaryProps,
	Box,
	Button,
	type ButtonProps,
	Divider,
	Link,
	Stack,
	styled,
	Typography,
} from "@mui/material";
import JsonView, { type JsonViewProps } from "@uiw/react-json-view";
import type { NextPage } from "next";
import { DefaultPage } from "@/components/layout/DefaultPage";
import { getPage, type PageId } from "@/features/pages";
import { getDefaultStorage, getDefaultStorageName } from "@/features/storage";
import { usePickpocketWeightCalculationStore } from "@/hooks/calculation/usePickpocketWeightCalculationStore";
import { useGlobalMapStore } from "@/hooks/useGlobalMapStore";
import { useWeaponEditorsStore } from "@/hooks/useWeaponEditorsStore";

const StyledAccordionSummary = styled((props: AccordionSummaryProps) => {
	const { children, ...originProps } = props;
	return (
		<AccordionSummary expandIcon={<ExpandMoreIcon />} {...originProps}>
			<Typography variant="h6">{children}</Typography>
		</AccordionSummary>
	);
})({});
const StyledAccordionDetails = styled(AccordionDetails)({});
const StyledResetButton = styled((props: ButtonProps) => (
	<Button variant="contained" {...props} />
))({});
const StyledJsonView = styled((props: JsonViewProps<object>) => (
	<JsonView {...props} />
))({});

const Page: NextPage = () => {
	const weaponEditorsStore = useWeaponEditorsStore();
	const pickpocketWeightCalculationStore =
		usePickpocketWeightCalculationStore();
	const globalMapStore = useGlobalMapStore();

	const stores: Array<{ pageId: PageId; state: object; reset: () => void }> = [
		{
			pageId: "weapon",
			state: weaponEditorsStore,
			reset: weaponEditorsStore.reset,
		},
		{
			pageId: "calculation",
			state: { pickpocketWeightCalculationStore },
			reset: () => {
				pickpocketWeightCalculationStore.reset();
			},
		},
		{
			pageId: "map",
			state: globalMapStore,
			reset: globalMapStore.reset,
		},
	];

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

				{stores.map((a) => {
					return (
						<Accordion key={a.pageId}>
							<StyledAccordionSummary>
								{getPage(a.pageId).title}
							</StyledAccordionSummary>
							<StyledAccordionDetails>
								<StyledResetButton onClick={() => a.reset()}>
									ストレージ初期化
								</StyledResetButton>
								<Box sx={{ marginTop: "1em" }}>
									<StyledJsonView
										value={JSON.parse(JSON.stringify(a.state))}
									/>
								</Box>
							</StyledAccordionDetails>
						</Accordion>
					);
				})}
				<Accordion>
					<StyledAccordionSummary>
						全部リセット(ワケわかんなくなった時用)
					</StyledAccordionSummary>
					<StyledAccordionDetails>
						<StyledResetButton
							color="warning"
							onClick={() => {
								getDefaultStorage().clear();
								location.reload();
							}}
						>
							なんもかんも初期化
						</StyledResetButton>
					</StyledAccordionDetails>
				</Accordion>
			</Stack>
		</DefaultPage>
	);
};

export default Page;
