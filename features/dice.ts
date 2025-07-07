import { getElement } from "./access";
import { AppError } from "./error";
import type { Random } from "./random";

export class DiceError extends AppError {}
export class DiceFormatError extends DiceError {}
export class DiceFixedSignFormatError extends DiceFormatError {}

export type DiceSign = "+" | "-";
// 大文字小文字くらいは許容する
const DiceRegex =
	/^\s*(?<COUNT>\d+)\s*d\s*(?<SIDES>\d+)(\s*(?<FIXED_SIGN>\+|-)\s*(?<FIXED_VALUE>\d+))?\s*$/i;

export interface DiceUnknownDice {
	/** 振り数 */
	count: number;
	/** 面数 */
	sides: number;
}

export interface DiceWithoutFixed extends DiceUnknownDice {
	/** 固定値なし */
	fixed: false;
}

export interface DiceWithFixed extends DiceUnknownDice {
	/** 固定値あり */
	fixed: true;
	/** 固定値の正負 */
	fixedSign: DiceSign;
	/** 固定値の絶対値 */
	fixedValue: number;
}

function toFixedSign(raw: string): DiceSign {
	switch (raw) {
		case "+":
		case "-":
			return raw;
	}

	throw new DiceFixedSignFormatError(raw);
}

export function parseDice(dice: string): DiceWithoutFixed | DiceWithFixed {
	const regexArray = DiceRegex.exec(dice);
	if (!regexArray || !regexArray.groups) {
		throw new DiceFormatError(`dice: ${dice}`);
	}
	const diceValues: DiceUnknownDice = {
		count: Number.parseInt(getElement(regexArray.groups, "COUNT")),
		sides: Number.parseInt(getElement(regexArray.groups, "SIDES")),
	};

	if (!regexArray.groups.FIXED_SIGN) {
		return {
			fixed: false,
			...diceValues,
		};
	}

	return {
		fixed: true,
		fixedSign: toFixedSign(getElement(regexArray.groups, "FIXED_SIGN")),
		fixedValue: Number.parseInt(
			getElement(regexArray.groups, "FIXED_VALUE"),
		),
		...diceValues,
	};
}

export interface DiceValue {
	/** 振り数 */
	count: number;
	/** 面数 */
	sides: number;

	/** 固定値の有無 */
	hasFixed: boolean;
	/** 固定値の値 */
	fixedValue: number;

	/** 最小値 */
	minimum: number;
	/** 最大値 */
	maximum: number;
	/** 期待値 */
	expected: number;
}

function getSignValue(sign: DiceSign, value: number): number {
	switch (sign) {
		case "+":
			return value;

		case "-":
			return -value;
	}
}

function getExpectedValue(count: number, sides: number): number {
	return (count * (sides + 1)) / 2;
}

export function calculateDice(
	dice: DiceWithoutFixed | DiceWithFixed,
): DiceValue {
	if (dice.fixed) {
		const fixedValue = getSignValue(dice.fixedSign, dice.fixedValue);
		return {
			count: dice.count,
			sides: dice.sides,

			hasFixed: true,
			fixedValue: fixedValue,

			minimum: dice.count + fixedValue,
			maximum: dice.count * dice.sides + fixedValue,
			expected: getExpectedValue(dice.count, dice.sides) + fixedValue,
		};
	}

	return {
		count: dice.count,
		sides: dice.sides,

		hasFixed: false,
		fixedValue: 0,

		minimum: dice.count,
		maximum: dice.count * dice.sides,
		expected: getExpectedValue(dice.count, dice.sides),
	};
}

type RankProperty = Extract<
	keyof DiceValue,
	"count" | "sides" | "fixedValue" | "minimum" | "maximum" | "expected"
>;

export interface RankValue {
	id: string;
	value: DiceValue;
	prevEqual: boolean;
}

export function rankDice(
	diceItems: Record<string, DiceValue>,
	property: RankProperty,
): Array<RankValue> {
	const pairs = Object.entries(diceItems);

	const sortedItems = pairs
		.toSorted(([_ak, av], [_bk, bv]) => bv[property] - av[property])
		.map(([ak, av], index, array) => ({
			id: ak,
			value: av,
			prevEqual:
				index === 0
					? false
					: av[property] ===
						getElement(array, index - 1)[1][property],
		}));

	return sortedItems;
}

/**
 * サイコロをふる
 * @param dice ダイス値
 * @param count 試行回数(dice側でふる回数を持っているのでこれはその実行を何度行うか)
 * @param random 将来的に変更できるように
 * @returns ふりまくった結果 [0]: 順序, [0][...] その結果(振り数分の配列で要素は結果 ※固定値は未考慮)
 */
export function rollDice(
	dice: DiceValue,
	count: number,
	random: Random,
): number[][] {
	const result = new Array<number[]>(count);

	for (let i = 0; i < count; i++) {
		const points = new Array<number>(dice.count);
		for (let j = 0; j < dice.count; j++) {
			const value = random.nextInt(1, dice.sides);
			points[j] = value;
		}
		result[i] = points;
	}

	return result;
}

export function sum(points: Array<number[]>, fixedValue: number) {
	const result = new Array<number>(points.length);

	for (let i = 0; i < points.length; i++) {
		const pointValues = getElement(points, i);
		const summary = pointValues.reduce((p, c) => p + c, 0);
		result[i] = summary + fixedValue;
	}

	return result;
}

/**
 * 確率分布データを生成する
 * @param  count 振り数
 * @param sides 面数
 * @returns 分布
 */
export function generateDiceDistribution(
	count: number,
	sides: number,
): number[] {
	// 1. 初期化：1個のサイコロの分布
	let counts = new Array(sides * count + 1).fill(0);
	for (let i = 1; i <= sides; i++) {
		counts[i] = 1;
	}

	// 2. 残りのサイコロを畳み込む
	for (let dice = 2; dice <= count; dice++) {
		const next = Array(sides * count + 1).fill(0);
		for (let sum = dice - 1; sum <= (dice - 1) * sides; sum++) {
			if (counts[sum] === 0) {
				continue;
			}
			for (let face = 1; face <= sides; face++) {
				next[sum + face] += counts[sum];
			}
		}
		counts = next;
	}

	// 3. 確率に変換
	const totalOutcomes = sides ** count;
	const result = [];
	for (let sum = count; sum <= count * sides; sum++) {
		result.push(counts[sum] / totalOutcomes);
	}

	return result;
}
