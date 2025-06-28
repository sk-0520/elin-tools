"use client";

import Leaflet from "leaflet";
import type { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./GlobalMap.css";

Leaflet.Icon.Default.imagePath =
	"//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";

export interface GlobalMapProps {
	test?: number;
}

export const GlobalMap: FC<GlobalMapProps> = (props) => {
	console.debug({ props });

	return (
		<MapContainer
			center={[51.505, -0.09]}
			zoom={13}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[51.505, -0.09]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
};

export default GlobalMap;
