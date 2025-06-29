import type { Direction, LatLngExpression, PointExpression } from "leaflet";
import type { FC } from "react";
import { Circle, Tooltip, type TooltipProps } from "react-leaflet";

const OffsetMap: Record<Direction, PointExpression | undefined> = {
	auto: undefined,
	right: [20, 0],
	left: [-20, 0],
	top: [0, -20],
	bottom: [0, 20],
	center: [0, 0],
};

export interface MapLabelProps {
	label: string;
	color: string;
	center: LatLngExpression;
	direction: TooltipProps["direction"];
}

export const MapLabel: FC<MapLabelProps> = (props) => {
	const { label, color, center, direction } = props;
	return (
		<>
			<Circle
				center={center}
				pathOptions={{ fillColor: color, color: color }}
				radius={10}
			>
				<Tooltip
					direction={direction}
					offset={direction ? OffsetMap[direction] : undefined}
					opacity={1}
					permanent
				>
					{label}
				</Tooltip>
			</Circle>
		</>
	);
};
