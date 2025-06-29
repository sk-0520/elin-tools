import type { LatLngExpression } from "leaflet";
import type { FC } from "react";
import type { TooltipProps } from "react-leaflet";
import { MapLabel } from "./MapLabel";

export interface NefiaLabelProps {
	label: string;
	center: LatLngExpression;
	direction?: TooltipProps["direction"];
}

export const NefiaLabel: FC<NefiaLabelProps> = (props) => {
	const { label, center, direction } = props;
	return (
		<MapLabel
			label={label}
			color="red"
			center={center}
			direction={direction ? direction : "right"}
		/>
	);
};
