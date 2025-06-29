import { LayersControlEvent, LeafletEvent } from "leaflet";
import { FC } from "react";
import { useMapEvents } from "react-leaflet";
import { MapKind } from "@/features/map";

export interface GlobalMapEventProps {
	callbackChanged: (name: MapKind, isVisible: boolean) => void;
}

export const GlobalMapEvent: FC<GlobalMapEventProps> = (props) => {
	const { callbackChanged } = props;
	// biome-ignore lint/correctness/noUnusedVariables: この処理特有のあれこれなので無視してOK
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
