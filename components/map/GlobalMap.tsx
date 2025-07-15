import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Button, Stack, Typography } from "@mui/material";
import JsonView from "@uiw/react-json-view";
import Leaflet, {
	type DragEndEvent,
	LatLngBounds,
	type LatLngExpression,
	type LeafletEvent,
	type LeafletEventHandlerFnMap,
} from "leaflet";
import { type FC, useMemo, useRef, useState } from "react";
import {
	Circle,
	ImageOverlay,
	LayerGroup,
	MapContainer,
	Marker,
	Popup,
} from "react-leaflet";
import { GlobalMapItemMapping, MapKindDefines } from "@/features/map";
import { useGlobalMapStore } from "@/hooks/useGlobalMapStore";
import nextConfig from "../../next.config";
import { GlobalMapController } from "./GlobalMapController";
import { MapLabel } from "./MapLabel";

const basePath = nextConfig.basePath || "";

Leaflet.Icon.Default.imagePath =
	"//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";

const ImageSize = {
	width: 2217,
	height: 1926,
};

const BoundsPadding = 80;

export const GlobalMap: FC = () => {
	const isVisibles = useGlobalMapStore((a) => a.isVisibles);
	const conditions = useGlobalMapStore((a) => a.conditions);
	const implementations = useGlobalMapStore((a) => a.implementations);

	const [position, setPosition] = useState<LatLngExpression>({
		lat: 0,
		lng: 0,
	});
	const [devChecked, setDevChecked] = useState(
		process.env.NODE_ENV === "development",
	);
	const refMap = useRef<Leaflet.Map | null>(null);
	const refMaker = useRef<Leaflet.Marker | null>(null);
	const developEventHandlers = useMemo<LeafletEventHandlerFnMap>(
		() => ({
			drag: (_: LeafletEvent) => {
				const marker = refMaker.current;
				if (marker != null) {
					setPosition(marker.getLatLng());
				}
			},
			dragend: (_: DragEndEvent) => {
				const marker = refMaker.current;
				if (marker != null) {
					setPosition(marker.getLatLng());
				}
			},
		}),
		[],
	);

	return (
		<MapContainer
			crs={Leaflet.CRS.Simple}
			center={[ImageSize.width / 2, ImageSize.height / 2]}
			minZoom={-2}
			maxZoom={3}
			zoom={-1}
			scrollWheelZoom={true}
			maxBounds={
				new LatLngBounds(
					[0 - BoundsPadding, 0 - BoundsPadding],
					[ImageSize.height + BoundsPadding, ImageSize.width + BoundsPadding],
				)
			}
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

			{MapKindDefines.map((a) => {
				return (
					isVisibles[a.kind] && (
						<LayerGroup key={a.kind}>
							{GlobalMapItemMapping.items
								.filter((b) => b.kind === a.kind)
								.filter((b) => (conditions.return ? b.return === true : true))
								.filter((b) =>
									conditions.festival ? b.festival !== undefined : true,
								)
								.filter((b) =>
									conditions.implementation
										? (implementations.completed &&
												b.implementation === "completed") ||
											(implementations.inProgress &&
												b.implementation === "inProgress") ||
											(implementations.notImplemented &&
												b.implementation === "notImplemented")
										: true,
								)
								.map((b) => {
									return (
										<MapLabel
											key={b.name}
											color={a.color}
											center={b.position}
											label={b.name}
											direction={b.direction ? b.direction : a.direction}
											festival={b.festival}
											riskLevel={b.riskLevel}
										/>
									);
								})}
						</LayerGroup>
					)
				);
			})}

			{devChecked && (
				<LayerGroup>
					<Marker
						ref={refMaker}
						position={position}
						draggable
						eventHandlers={developEventHandlers}
					>
						<Circle
							center={position}
							pathOptions={{ fillColor: "orange", color: "lime" }}
							radius={10}
						/>
						<Popup autoClose={false}>
							<Stack>
								<Typography
									variant="body1"
									fontSize="small"
									sx={{ whiteSpace: "pre" }}
								>
									<JsonView
										displayObjectSize={false}
										displayDataTypes={false}
										enableClipboard={false}
										value={position}
									/>
								</Typography>

								<Box
									sx={{
										display: "flex",
										justifyItems: "center",
										alignItems: "center",
									}}
								>
									<Button
										variant="outlined"
										startIcon={<ContentCopyIcon />}
										onClick={async (_ev) => {
											await navigator.clipboard.writeText(
												JSON.stringify(position),
											);
										}}
									>
										LatLng
									</Button>
									<Button
										variant="outlined"
										startIcon={<ContentCopyIcon />}
										onClick={async (_ev) => {
											await navigator.clipboard.writeText(
												`position: ${JSON.stringify(position)}`,
											);
										}}
									>
										{"position:{...}"}
									</Button>
								</Box>
							</Stack>
						</Popup>
					</Marker>
				</LayerGroup>
			)}

			<GlobalMapController
				devChecked={devChecked}
				onDevToggle={() => setDevChecked((a) => !a)}
			/>

			{/* <GlobalMapEvent callbackChanged={callbackVisibleChanged} /> */}
		</MapContainer>
	);
};

export default GlobalMap;
