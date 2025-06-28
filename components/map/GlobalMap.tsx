"use client";
import Leaflet, { LatLngBounds, type LatLngExpression } from "leaflet";
import { type FC, useMemo, useRef, useState } from "react";
import { ImageOverlay, MapContainer, Marker, Popup } from "react-leaflet";
import nextConfig from "../../next.config";

const basePath = nextConfig.basePath || "/";

Leaflet.Icon.Default.imagePath =
	"//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";

export interface GlobalMapProps {
	test?: number;
}

export const GlobalMap: FC<GlobalMapProps> = (props) => {
	console.debug({ props });

	const size = {
		width: 2217,
		height: 1926,
	};

	const [position, setPosition] = useState<LatLngExpression>([
		size.width / 2,
		size.height / 2,
	]);
	const refMaker = useRef<Leaflet.Marker<unknown> | null>(null);
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

	return (
		<MapContainer
			crs={Leaflet.CRS.Simple}
			center={[size.width / 2, size.height / 2]}
			minZoom={-4}
			zoom={-2}
			scrollWheelZoom={true}
		>
			<ImageOverlay
				attribution='&copy;<a href="https://ylvapedia.wiki/wiki/Elin:%E3%82%B0%E3%83%AD%E3%83%BC%E3%83%90%E3%83%AB%E3%83%9E%E3%83%83%E3%83%97">Ylvapedia</a>'
				bounds={
					new LatLngBounds([
						[0, 0],
						[size.height, size.width],
					])
				}
				url={`${basePath}/components/map/GlobalMap/GlobalMap.jpg`}
			/>
			{process.env.NODE_ENV === "development" && (
				<Marker
					ref={refMaker}
					position={position}
					draggable
					eventHandlers={eventHandlers}
				>
					<Popup>{JSON.stringify(position)}</Popup>
				</Marker>
			)}
		</MapContainer>
	);
};

export default GlobalMap;
