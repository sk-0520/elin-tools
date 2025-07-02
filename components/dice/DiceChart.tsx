import type { FC } from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Label,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { getValue } from "@/features/access";
import { rankDice, sum } from "@/features/dice";
import { useWeponDiceValuesStore } from "@/hooks/useWeponDiceValuesStore";
import { useWeponEditorsStore } from "@/hooks/useWeponEditorsStore";
import { useWeponPointsStore } from "@/hooks/useWeponPointsStore";

interface ChartData {
	damage: number;
	[key: string]: number;
}

export const DiceChart: FC = () => {
	const editors = useWeponEditorsStore((a) => a.editors);
	const points = useWeponPointsStore((a) => a.points);
	const values = useWeponDiceValuesStore((a) => a.values);

	if (Object.keys(values).length === 0) {
		return undefined;
	}

	const summary = {
		minimum: rankDice(values, "minimum"),
		maximum: rankDice(values, "maximum"),
	};
	const rank = {
		minimum:
			summary.minimum[
				summary.minimum.length === 1 ? 0 : summary.minimum.length - 1
			].value.minimum,
		maximum: summary.maximum[0].value.maximum,
	};

	const pointSummary = new Map(
		Object.entries(points).map(([k, v]) => [k, sum(v)]),
	);

	const length = rank.maximum - rank.minimum + 1;
	const data = new Array<ChartData>(length);
	for (let i = 0; i < length; i++) {
		const damage = i + rank.minimum;

		const currentData: ChartData = {
			damage: damage,
		};
		for (const id of Object.keys(values)) {
			const pointValues = getValue(pointSummary, id);
			const dice = values[id];

			if (dice.minimum <= damage && damage <= dice.maximum) {
				const count = pointValues.filter((a) => a === damage).length;
				currentData[id] = count;
			} else {
				currentData[id] = 0;
			}
		}
		data[i] = currentData;
	}

	// TODO: 高さ制御適当
	return (
		<ResponsiveContainer width="100%" height={500}>
			<AreaChart layout="vertical" data={data}>
				<defs>
					{pointSummary.keys().map((a) => {
						return (
							<linearGradient
								key={a}
								id={`color_${a}`}
								x1="1"
								y1="0"
								x2="0"
								y2="0"
							>
								<stop
									offset="5%"
									stopColor={editors[a].color}
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor={editors[a].color}
									stopOpacity={0.1}
								/>
							</linearGradient>
						);
					})}
				</defs>
				<CartesianGrid strokeDasharray="3" />
				<XAxis type="number">
					<Label value="頻度" offset={0} position="bottom" />
				</XAxis>
				<YAxis dataKey="damage" reversed>
					<Label
						value="ダメージ"
						offset={10}
						angle={-90}
						position="insideLeft"
					/>
				</YAxis>
				<Tooltip />
				<Legend verticalAlign="bottom" align="left" />
				{pointSummary.keys().map((a) => {
					return (
						<Area
							key={a}
							type="monotone"
							dataKey={a}
							stroke={editors[a].color}
							fillOpacity={1}
							fill={`url(#color_${a})`}
						/>
					);
				})}
			</AreaChart>
		</ResponsiveContainer>
	);
};
