import type { LeafletEvent } from "leaflet";
import type { FC } from "react";
import { useMapEvents } from "react-leaflet";
import type { MapKind } from "@/features/map";

export interface GlobalMapEventProps {
	callbackChanged: (name: MapKind, isVisible: boolean) => void;
}

// 対象レイヤーが取得できなくてあきらめ

export const GlobalMapEvent: FC<GlobalMapEventProps> = (props) => {
	const { callbackChanged } = props;
	const map = useMapEvents({
		layeradd: (ev: LeafletEvent) => {
			console.debug(ev);
			callbackChanged("base", true);
		},
		layerremove: (ev: LeafletEvent) => {
			console.debug(ev);

			callbackChanged("base", false);
		},
	});
	return null;
};
