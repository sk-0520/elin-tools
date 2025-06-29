import type { LatLngExpression } from "leaflet";
import type { FC } from "react";
import type { TooltipProps } from "react-leaflet";
import { MapLabel } from "./MapLabel";

export interface MapLabelProps {
	label: string;
	center: LatLngExpression;
	direction?: TooltipProps["direction"];
}

export const BaseLabel: FC<MapLabelProps> = (props) => {
	const { label, center, direction } = props;
	return (
		<MapLabel
			label={label}
			color="blue"
			center={center}
			direction={direction ? direction : "bottom"}
		/>
	);
};
