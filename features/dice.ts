import { AppError } from "./error";

export class DiceError extends AppError {}
export class DiceFormatError extends DiceError {}

export type DiceSign = "+" | "-";
const DiceRegex =
	/^\s*(?<COUNT>\d+)\s*d\s*(?<SIDES>\d+)(\s*(?<FIXED_SIGN>\+|-)\s*(?<FIXED_VALUE>\d+))?\s*$/;

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

export function parseDice(dice: string): DiceWithoutFixed | DiceWithFixed {
	const regexArray = DiceRegex.exec(dice);
	if (!regexArray || !regexArray.groups) {
		throw new DiceFormatError(`dice: ${dice}`);
	}

	const diceValues: DiceUnknownDice = {
		count: Number.parseInt(regexArray.groups.COUNT),
		sides: Number.parseInt(regexArray.groups.SIDES),
	};

	if (!regexArray.groups.FIXED_SIGN) {
		return {
			fixed: false,
			...diceValues,
		};
	}

	return {
		fixed: true,
		fixedSign: regexArray.groups.FIXED_SIGN as DiceSign,
		fixedValue: Number.parseInt(regexArray.groups.FIXED_VALUE),
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
}

function getSignValue(sign: DiceSign, value: number): number {
	switch (sign) {
		case "+":
			return value;

		case "-":
			return -value;
	}
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
			maximum: dice.count * dice.sides + dice.count * fixedValue,
		};
	}

	return {
		count: dice.count,
		sides: dice.sides,

		hasFixed: false,
		fixedValue: 0,

		minimum: dice.count,
		maximum: dice.count * dice.sides,
	};
}

type RankProperty = keyof DiceValue &
	("count" | "sides" | "fixedValue" | "minimum" | "maximum"); // いやぁ、これは違う

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
				index === 0 ? false : av[property] === array[index - 1][1][property],
		}));

	return sortedItems;
}
