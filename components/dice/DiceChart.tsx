import type { FC } from "react";
import {
	Area,
	CartesianGrid,
	ComposedChart,
	Label,
	Legend,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { getElement } from "@/features/access";
import { generateDiceDistribution, rankDice, sum } from "@/features/dice";
import { useWeaponDiceValuesStore } from "@/hooks/useWeaponDiceValuesStore";
import { useWeaponEditorsStore } from "@/hooks/useWeaponEditorsStore";
import { useWeaponPointsStore } from "@/hooks/useWeaponPointsStore";

interface ChartData {
	damage: number;
	[key: string]: number;
}

function toProbabilityId(baseId: string) {
	return `${baseId}:probability`;
}

export const DiceChart: FC = () => {
	const editors = useWeaponEditorsStore((a) => a.editors);
	const probability = useWeaponEditorsStore((a) => a.probability);
	const points = useWeaponPointsStore((a) => a.points);
	const values = useWeaponDiceValuesStore((a) => a.values);

	if (Object.keys(values).length === 0) {
		return undefined;
	}

	const summary = {
		minimum: rankDice(values, "minimum"),
		maximum: rankDice(values, "maximum"),
	};
	const rank = {
		minimum: getElement(summary.minimum, summary.minimum.length - 1).value
			.minimum,
		maximum: getElement(summary.maximum, 0).value.maximum,
	};

	const pointSummary = new Map(
		Object.entries(points).map(([k, v]) => [
			k,
			sum(v, k in values ? getElement(values, k).fixedValue : 0),
		]),
	);

	// 確率分布を算出
	const distributions: Record<string, Array<number>> = {};
	for (const [id, value] of Object.entries(values)) {
		const distribution = generateDiceDistribution(value.count, value.sides);
		distributions[id] = distribution;
	}
	console.table(distributions);

	const length = rank.maximum - rank.minimum;
	const data = new Array<ChartData>(length);

	for (let i = 0; i < length; i++) {
		const damage = i + rank.minimum;

		const currentData: ChartData = {
			damage: damage,
		};

		// 実際に振った値を格納
		for (const id of Object.keys(values)) {
			const pointValues = getElement(pointSummary, id);
			const dice = getElement(values, id);

			if (dice.minimum <= damage && damage <= dice.maximum) {
				const count = pointValues.filter((a) => a === damage).length;
				currentData[id] = count / pointValues.length;
				currentData[toProbabilityId(id)] = getElement(
					getElement(distributions, id),
					damage - dice.minimum,
				);
			} else {
				currentData[id] = 0;
			}
		}

		data[i] = currentData;
	}

	//console.table(data);

	// TODO: 高さ制御適当
	return (
		<ResponsiveContainer width="100%" height={500}>
			<ComposedChart layout="vertical" data={data}>
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
									stopColor={getElement(editors, a).color}
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor={getElement(editors, a).color}
									stopOpacity={0.1}
								/>
							</linearGradient>
						);
					})}
				</defs>
				<CartesianGrid strokeDasharray="3" />
				<XAxis type="number">
					<Label value="確率" offset={0} position="bottom" />
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
							stroke={getElement(editors, a).color}
							fillOpacity={1}
							fill={`url(#color_${a})`}
						/>
					);
				})}

				{probability &&
					pointSummary.keys().map((a) => {
						return (
							<Line
								key={a}
								type="linear"
								dataKey={toProbabilityId(a)}
								stroke={getElement(editors, a).color}
								strokeOpacity={0.5}
								fillOpacity={0.5}
							/>
						);
					})}
			</ComposedChart>
		</ResponsiveContainer>
	);
};
