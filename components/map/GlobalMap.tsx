import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
	Button,
	Checkbox,
	createTheme,
	Divider,
	FormControlLabel,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
	Theme,
	ThemeProvider,
} from "@mui/material";
import Leaflet, {
	type DragEndEvent,
	LatLngBounds,
	type LatLngExpression,
} from "leaflet";
import { type FC, useEffect, useMemo, useRef, useState } from "react";
import {
	ImageOverlay,
	LayerGroup,
	MapContainer,
	Marker,
	Popup,
	type TooltipProps,
} from "react-leaflet";
import Control from "react-leaflet-custom-control";
import {
	GlobalMapItemMapping,
	MapCondition,
	type MapKind,
} from "@/features/map";
import nextConfig from "../../next.config";
import { CheckListItem } from "./CheckListItem";
import { MapLabel } from "./MapLabel";

const basePath = nextConfig.basePath || "";

Leaflet.Icon.Default.imagePath =
	"//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";

const ImageSize = {
	width: 2217,
	height: 1926,
};

const LayerGroupNameMapKinds: Array<{
	kind: MapKind;
	display: string;
	color: string;
	direction: Exclude<TooltipProps["direction"], undefined>;
}> = [
	{
		kind: "base",
		display: "拠点",
		color: "blue",
		direction: "bottom",
	},
	{
		kind: "nefia",
		display: "ネフィア",
		color: "red",
		direction: "right",
	},
	{
		kind: "sample",
		display: "初期地点",
		color: "yellow",
		direction: "right",
	},
];

const MapConditions: Array<{
	condition: MapCondition;
	display: string;
}> = [
	{
		condition: "return",
		display: "帰還先に限定",
	},
	{
		condition: "ignoreClosed",
		display: "未実装ネフィアを無視",
	},
	{
		condition: "festival",
		display: "お祭り開催地に限定",
	},
];

export interface GlobalMapProps {
	readonly isVisibles: Record<MapKind, boolean>;
	readonly conditions: Record<MapCondition, boolean>;
	callbackVisibleChanged: (kind: MapKind, isVisible: boolean) => void;
	callbackConditionChanged: (
		condition: MapCondition,
		isEnabled: boolean,
	) => void;
}

export const GlobalMap: FC<GlobalMapProps> = (props) => {
	const {
		isVisibles,
		conditions,
		callbackVisibleChanged,
		callbackConditionChanged,
	} = props;
	const [position, setPosition] = useState<LatLngExpression>({
		lat: 0,
		lng: 0,
	});
	const [devChecked, setDevChecked] = useState(
		process.env.NODE_ENV === "development",
	);
	const refMap = useRef<Leaflet.Map | null>(null);
	const refMaker = useRef<Leaflet.Marker | null>(null);
	const developEventHandlers = useMemo(
		() => ({
			dragend: (_: DragEndEvent) => {
				const marker = refMaker.current;
				if (marker != null) {
					setPosition(marker.getLatLng());
				}
			},
		}),
		[],
	);

	// const groupEventHandlers = useMemo<LeafletEventHandlerFnMap>(() => {
	// 	return {
	// 		layeradd: (ev: LeafletEvent) => {
	// 			console.debug({ groupEventHandlers: ev });
	// 			callbackVisibleChanged("base", true);
	// 		},
	// 		layerremove: (ev: LeafletEvent) => {
	// 			console.debug({ groupEventHandlers: ev });

	// 			callbackVisibleChanged("base", false);
	// 		},
	// 	};
	// }, [callbackVisibleChanged]);

	useEffect(() => {
		const map = refMap.current;
		if (map) {
			map.fitBounds(
				new LatLngBounds([0, 0], [ImageSize.height, ImageSize.width]),
			);
		}
	}, []);

	return (
		<MapContainer
			crs={Leaflet.CRS.Simple}
			center={[ImageSize.width / 2, ImageSize.height / 2]}
			minZoom={-2}
			maxZoom={3}
			zoom={-1}
			scrollWheelZoom={true}
			ref={refMap}
		>
			<ImageOverlay
				attribution='&copy;<a href="https://ylvapedia.wiki/wiki/Elin:%E3%82%B0%E3%83%AD%E3%83%BC%E3%83%90%E3%83%AB%E3%83%9E%E3%83%83%E3%83%97">Ylvapedia</a>'
				bounds={
					new LatLngBounds([
						[0, 0],
						[ImageSize.height, ImageSize.width],
					])
				}
				url={`${basePath}/components/map/GlobalMap/GlobalMap.jpg`}
			/>
			{/* <LayersControl position="topright" collapsed={false}>
				<LayersControl.Overlay
					name={LayerNames.base}
					checked={isVisible.base}
				>
					<LayerGroup >
						{GlobalMapItemMapping.items
							.filter((a) => a.kind === "base")
							.map((a) => {
								return (
									<MapLabel
										key={a.name}
										color="blue"
										center={a.position}
										label={a.name}
										direction={
											a.direction ? a.direction : "bottom"
										}
									/>
								);
							})}
					</LayerGroup>
				</LayersControl.Overlay>
				<LayersControl.Overlay
					name={LayerNames.nefia}
					checked={isVisible.nefia}
				>
					<LayerGroup>
						{GlobalMapItemMapping.items
							.filter((a) => a.kind === "nefia")
							.map((a) => {
								return (
									<MapLabel
										key={a.name}
										color="red"
										center={a.position}
										label={a.name}
										direction={
											a.direction ? a.direction : "right"
										}
									/>
								);
							})}
					</LayerGroup>
				</LayersControl.Overlay>
				<LayersControl.Overlay
					name={LayerNames.sample}
					checked={isVisible.sample}
				>
					<LayerGroup>
						{GlobalMapItemMapping.items
							.filter((a) => a.kind === "sample")
							.map((a) => {
								return (
									<MapLabel
										key={a.name}
										color="yellow"
										center={a.position}
										label={a.name}
										direction={
											a.direction ? a.direction : "right"
										}
									/>
								);
							})}
					</LayerGroup>
				</LayersControl.Overlay>
				<LayersControl.Overlay
					name={LayerNames.develop}
					checked={process.env.NODE_ENV === "development"}
				>
					<LayerGroup>
						<Marker
							ref={refMaker}
							position={position}
							draggable
							eventHandlers={developEventHandlers}
						>
							<Popup autoClose={false}>
								<Button
									variant="outlined"
									startIcon={<ContentCopyIcon />}
									onClick={async (_ev) => {
										await navigator.clipboard.writeText(
											JSON.stringify(position),
										);
									}}
								>
									{JSON.stringify(position)}
								</Button>
							</Popup>
						</Marker>
					</LayerGroup>
				</LayersControl.Overlay>
			</LayersControl> */}
			{LayerGroupNameMapKinds.map((a) => {
				return (
					isVisibles[a.kind] && (
						<LayerGroup key={a.kind}>
							{GlobalMapItemMapping.items
								.filter((b) => b.kind === a.kind)
								.filter((b) =>
									conditions.return ? b.return === true : true,
								)
								.filter((b) =>
									conditions.festival
										? b.festival !== undefined
										: true,
								)
								.filter((b) =>
									conditions.ignoreClosed ? b.closed !== true : true,
								)
								.map((b) => {
									return (
										<MapLabel
											key={b.name}
											color={a.color}
											center={b.position}
											label={b.name}
											direction={
												b.direction ? b.direction : a.direction
											}
											festival={b.festival}
										/>
									);
								})}
						</LayerGroup>
					)
				);
			})}
			{/* {isVisible.base && (
				<LayerGroup>
					{GlobalMapItemMapping.items
						.filter((a) => a.kind === "base")
						.map((a) => {
							return (
								<MapLabel
									key={a.name}
									color="blue"
									center={a.position}
									label={a.name}
									direction={
										a.direction ? a.direction : "bottom"
									}
								/>
							);
						})}
				</LayerGroup>
			)}
			{isVisible.nefia && (
				<LayerGroup>
					{GlobalMapItemMapping.items
						.filter((a) => a.kind === "nefia")
						.map((a) => {
							return (
								<MapLabel
									key={a.name}
									color="red"
									center={a.position}
									label={a.name}
									direction={
										a.direction ? a.direction : "right"
									}
								/>
							);
						})}
				</LayerGroup>
			)}
			{isVisible.sample && (
				<LayerGroup>
					{GlobalMapItemMapping.items
						.filter((a) => a.kind === "sample")
						.map((a) => {
							return (
								<MapLabel
									key={a.name}
									color="yellow"
									center={a.position}
									label={a.name}
									direction={
										a.direction ? a.direction : "right"
									}
								/>
							);
						})}
				</LayerGroup>
			)} */}
			{devChecked && (
				<LayerGroup>
					<Marker
						ref={refMaker}
						position={position}
						draggable
						eventHandlers={developEventHandlers}
					>
						<Popup autoClose={false}>
							<Button
								variant="outlined"
								startIcon={<ContentCopyIcon />}
								onClick={async (_ev) => {
									await navigator.clipboard.writeText(
										JSON.stringify(position),
									);
								}}
							>
								{JSON.stringify(position)}
							</Button>
						</Popup>
					</Marker>
				</LayerGroup>
			)}

			<Control prepend position="topright">
				<ThemeProvider
					theme={(theme: Theme) =>
						createTheme({
							...theme,
							typography: {
								...theme.typography,
								fontSize: 10,
							},
						})
					}
				>
					<Paper
						sx={{
							opacity: 0.6,

							"&:hover": {
								opacity: 1,
							},
						}}
					>
						<Stack>
							<List>
								{LayerGroupNameMapKinds.map((a) => {
									return (
										<CheckListItem
											key={a.kind}
											isChecked={isVisibles[a.kind]}
											onClick={() => {
												callbackVisibleChanged(
													a.kind,
													!isVisibles[a.kind],
												);
											}}
										>
											{a.display}
										</CheckListItem>
									);
								})}
							</List>

							<Divider />

							<List>
								{MapConditions.map((a) => {
									return (
										<CheckListItem
											key={a.condition}
											isChecked={conditions[a.condition]}
											onClick={() =>
												callbackConditionChanged(
													a.condition,
													!conditions[a.condition],
												)
											}
										>
											{a.display}
										</CheckListItem>
									);
								})}
							</List>

							<Divider />

							<List>
								<CheckListItem
									isChecked={devChecked}
									onClick={() => setDevChecked((a) => !a)}
								>
									座標確認用マーカー(↙)
								</CheckListItem>
							</List>
						</Stack>
					</Paper>
				</ThemeProvider>
			</Control>

			{/* <GlobalMapEvent callbackChanged={callbackVisibleChanged} /> */}
		</MapContainer>
	);
};

export default GlobalMap;
