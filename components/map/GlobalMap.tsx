import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
import Leaflet, {
	DragEndEvent,
	LatLngBounds,
	type LatLngExpression,
	LeafletEvent,
	LeafletEventHandlerFnMap,
} from "leaflet";
import {
	type FC,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	ImageOverlay,
	LayerGroup,
	LayersControl,
	MapContainer,
	Marker,
	Popup,
} from "react-leaflet";
import { GlobalMapItemMapping, type MapKind } from "@/features/map";
import nextConfig from "../../next.config";
import { GlobalMapEvent } from "./GlobalMapEvent";
import { MapLabel } from "./MapLabel";

const basePath = nextConfig.basePath || "";

Leaflet.Icon.Default.imagePath =
	"//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";

const ImageSize = {
	width: 2217,
	height: 1926,
};

// 本気で言うてるのか？ と思ったレイヤー名。名前と表示が一緒て。
const LayerNames = {
	base: "拠点",
	nefia: "ネフィア",
	sample: "初期地点",
	develop: "座標確認用マーカー(↙)",
};

export interface GlobalMapProps {
	readonly isVisible: Record<MapKind, boolean>;
	callbackVisibleChanged: (name: MapKind, isVisible: boolean) => void;
}

export const GlobalMap: FC<GlobalMapProps> = (props) => {
	const { isVisible, callbackVisibleChanged } = props;
	const [position, setPosition] = useState<LatLngExpression>({
		lat: 0,
		lng: 0,
	});
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
			<LayersControl position="topright" collapsed={false}>
				<LayersControl.Overlay
					name={LayerNames.base}
					checked={isVisible.base}
				>
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
			</LayersControl>
			<GlobalMapEvent callbackChanged={callbackVisibleChanged} />
		</MapContainer>
	);
};

export default GlobalMap;
