import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import {
	Collapse,
	Divider,
	List,
	ListItemButton,
	Tooltip as MuiTooltip,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { type FC, Fragment } from "react";
import Control from "react-leaflet-custom-control";
import {
	MapConditionDefines,
	MapImplementationDefines,
	MapKindDefines,
} from "@/features/map";
import { useGlobalMapStore } from "@/hooks/useGlobalMapStore";
import { CheckListItem } from "./CheckListItem";

export type GlobalMapControllerProps = {
	devChecked: boolean;
	onDevToggle: () => void;
};

export const GlobalMapController: FC<GlobalMapControllerProps> = (props) => {
	const { devChecked, onDevToggle } = props;
	const controller = useGlobalMapStore((a) => a.controller);
	const isVisibles = useGlobalMapStore((a) => a.isVisibles);
	const conditions = useGlobalMapStore((a) => a.conditions);
	const implementations = useGlobalMapStore((a) => a.implementations);
	const setController = useGlobalMapStore((a) => a.setController);
	const setVisible = useGlobalMapStore((a) => a.setVisible);
	const setCondition = useGlobalMapStore((a) => a.setCondition);
	const setImplementation = useGlobalMapStore((a) => a.setImplementation);

	return (
		<Control prepend position="topright">
			<Paper
				sx={{
					opacity: 0.6,
					transition: "0.2s",

					"&:hover": {
						opacity: 1,
					},
				}}
			>
				<ListItemButton
					onClick={() => {
						setController(!controller);
					}}
				>
					{controller ? <ArrowCircleUpIcon /> : <ArrowCircleDownIcon />}
					<Typography sx={{ marginLeft: "1ch" }}>コントローラー</Typography>
				</ListItemButton>
				<Stack
					sx={{
						"*": {
							fontSize: "0.7rem !important",
							paddingBlock: "1px !important",
						},
					}}
				>
					<Collapse in={controller}>
						<Divider />

						<List>
							{MapKindDefines.map((a) => {
								return (
									<CheckListItem
										key={a.kind}
										isChecked={isVisibles[a.kind]}
										onClick={() => {
											setVisible(a.kind, !isVisibles[a.kind]);
										}}
									>
										{a.display}
									</CheckListItem>
								);
							})}
						</List>

						<Divider />

						<List>
							{MapConditionDefines.map((a) => {
								return (
									<Fragment key={a.condition}>
										<CheckListItem
											isChecked={conditions[a.condition]}
											onClick={() =>
												setCondition(a.condition, !conditions[a.condition])
											}
										>
											{a.display}
										</CheckListItem>
										{a.condition === "implementation" && (
											<MuiTooltip
												title={
													<Typography>
														EAであることと主観による判断ため実装済みと実装途中は曖昧
													</Typography>
												}
												placement="top"
											>
												<Collapse in={conditions[a.condition]}>
													<List disablePadding>
														{MapImplementationDefines.map((b) => {
															return (
																<CheckListItem
																	key={b.implementation}
																	isChecked={implementations[b.implementation]}
																	onClick={() =>
																		setImplementation(
																			b.implementation,
																			!implementations[b.implementation],
																		)
																	}
																	sx={{
																		paddingLeft: "4ch",
																	}}
																>
																	{b.display}
																</CheckListItem>
															);
														})}
													</List>
												</Collapse>
											</MuiTooltip>
										)}
									</Fragment>
								);
							})}
						</List>

						<Divider />

						<List>
							<CheckListItem isChecked={devChecked} onClick={onDevToggle}>
								座標確認用マーカー(↙)
							</CheckListItem>
						</List>
					</Collapse>
				</Stack>
			</Paper>
		</Control>
	);
};
