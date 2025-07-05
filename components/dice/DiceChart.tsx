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
import { getValue } from "@/features/access";
import { rankDice, sum } from "@/features/dice";
import { useWeaponDiceValuesStore } from "@/hooks/useWeaponDiceValuesStore";
import { useWeaponEditorsStore } from "@/hooks/useWeaponEditorsStore";
import { useWeaponPointsStore } from "@/hooks/useWeaponPointsStore";

/**
 * サイコロの確率分布データを生成する
 * @param {number} nDice  サイコロの数
 * @param {number} nSides サイコロの面数
 * @returns {{sum: number, probability: number}[]}
 */
function generateDiceDistribution(nDice: number, nSides: number) {
	// 1. 初期化：1個のサイコロの分布
	let counts = Array(nSides * nDice + 1).fill(0);
	for (let face = 1; face <= nSides; face++) {
		counts[face] = 1;
	}

	// 2. 残りのサイコロを畳み込む
	for (let dice = 2; dice <= nDice; dice++) {
		const next = Array(nSides * nDice + 1).fill(0);
		for (let sum = dice - 1; sum <= (dice - 1) * nSides; sum++) {
			if (counts[sum] === 0) continue;
			for (let face = 1; face <= nSides; face++) {
				next[sum + face] += counts[sum];
			}
		}
		counts = next;
	}

	// 3. 確率に変換
	const totalOutcomes = nSides ** nDice;
	const result = [];
	for (let sum = nDice; sum <= nDice * nSides; sum++) {
		result.push({
			sum,
			probability: counts[sum] / totalOutcomes,
		});
	}

	return result;
}

interface ChartData {
	damage: number;
	[key: string]: number;
}

export const DiceChart: FC = () => {
	const editors = useWeaponEditorsStore((a) => a.editors);
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
		minimum:
			summary.minimum[
				summary.minimum.length === 1 ? 0 : summary.minimum.length - 1
			].value.minimum,
		maximum: summary.maximum[0].value.maximum,
	};

	const pointSummary = new Map(
		Object.entries(points).map(([k, v]) => [k, sum(v, values[k].fixedValue)]),
	);

	// 確率分布を算出
	const distributions: Record<string, Array<number>> = {};
	for (const [id, value] of Object.entries(values)) {
		const aaa = generateDiceDistribution(value.count, value.sides);
		distributions[id] = aaa.map((a) => a.probability);
	}
	console.table(distributions);

	const length = rank.maximum - rank.minimum + 1;
	const data = new Array<ChartData>(length);

	for (let i = 0; i < length + 1; i++) {
		const damage = i + rank.minimum;

		const currentData: ChartData = {
			damage: damage,
		};

		// 実際に振った値を格納
		for (const id of Object.keys(values)) {
			const pointValues = getValue(pointSummary, id);
			const dice = values[id];

			const count = pointValues.filter((a) => a === damage).length;
			currentData[id] = count / pointValues.length;
			currentData[`${id}:dice`] = distributions[id][i];

			// if (dice.minimum <= damage && damage <= dice.maximum) {
			// 	const count = pointValues.filter((a) => a === damage).length;
			// 	currentData[id] = count / pointValues.length;
			// 	currentData[`${id}:dice`] = distributions[id][i];
			// } else {
			// 	currentData[id] = 0;
			// }
		}

		data[i] = currentData;
	}

	console.table(data);

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

				{pointSummary.keys().map((a) => {
					return (
						<Line
							key={a}
							type="natural"
							dataKey={`${a}:dice`}
							stroke={editors[a].color}
							fillOpacity={1}
							fill={`url(#color_${a})`}
						/>
					);
				})}
			</ComposedChart>
		</ResponsiveContainer>
	);
};
