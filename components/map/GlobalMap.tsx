"use client";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
import Leaflet, { LatLngBounds, type LatLngExpression } from "leaflet";
import { type FC, useEffect, useMemo, useRef, useState } from "react";
import {
	ImageOverlay,
	LayerGroup,
	LayersControl,
	MapContainer,
	Marker,
	Popup,
} from "react-leaflet";
import { GlobalMapItemMapping } from "@/features/map";
import nextConfig from "../../next.config";
import { BaseLabel } from "./label/BaseLabel";
import { NefiaLabel } from "./label/NefiaLabel";

const basePath = nextConfig.basePath || "";

Leaflet.Icon.Default.imagePath =
	"//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";

const ImageSize = {
	width: 2217,
	height: 1926,
};

export interface GlobalMapProps {
	test?: number;
}

export const GlobalMap: FC<GlobalMapProps> = (props) => {
	console.debug({ props });

	const [position, setPosition] = useState<LatLngExpression>({
		lat: ImageSize.height / 2,
		lng: ImageSize.width / 2,
	});
	const refMap = useRef<Leaflet.Map | null>(null);
	const refMaker = useRef<Leaflet.Marker | null>(null);
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = refMaker.current;
				if (marker != null) {
					setPosition(marker.getLatLng());
				}
			},
		}),
		[],
	);

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
			minZoom={-4}
			zoom={-2}
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
			<LayersControl position="topright">
				<LayersControl.Overlay checked name="拠点">
					<LayerGroup>
						{GlobalMapItemMapping.items
							.filter((a) => a.type === "base")
							.map((a) => {
								return (
									<BaseLabel
										key={a.name}
										center={a.position}
										label={a.name}
										direction={a.direction}
									/>
								);
							})}
					</LayerGroup>
				</LayersControl.Overlay>
				<LayersControl.Overlay checked name="ネフィア">
					<LayerGroup>
						{GlobalMapItemMapping.items
							.filter((a) => a.type === "nefia")
							.map((a) => {
								return (
									<NefiaLabel
										key={a.name}
										center={a.position}
										label={a.name}
										direction={a.direction}
									/>
								);
							})}
					</LayerGroup>
				</LayersControl.Overlay>
				<LayersControl.Overlay
					name="座標確認用マーカー"
					checked={process.env.NODE_ENV === "development"}
				>
					<Marker
						ref={refMaker}
						position={position}
						draggable
						eventHandlers={eventHandlers}
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
				</LayersControl.Overlay>
			</LayersControl>
		</MapContainer>
	);
};

export default GlobalMap;
