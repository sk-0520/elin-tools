import { AppError } from "./error";

export class DiceError extends AppError {}
export class DiceFormatError extends DiceError {}

export type DiceSign = "+" | "-";
const DiceRegex =
	/^\s*(?<COUNT>\d+)d(?<SIDES>\d+)((?<FIXED_SIGN>\+|-)(?<FIXED_VALUE>\d+))?s*$/;

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
	fixedSign: "+" | "-";
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

	/** 固定値の正負 */
	fixedSign: DiceSign;
	/** 固定値の絶対値 */
	fixedValue: number;

	/** 最小値 */
	minimum: number;
	/** 最大値 */
	maximum: number;
}

function getSignValue(sign: DiceSign, value: number): number
{
	switch(sign) {
		case "+":
			return value;

		case "-":
			return -value;
	}
}

export function calculateDice(dice: DiceWithoutFixed | DiceWithFixed): DiceValue {
	if (dice.fixed) {
		return {
			count: dice.count,
			sides: dice.sides,

			fixedSign: dice.fixedSign,
			fixedValue: dice.fixedValue,

			minimum: dice.count + getSignValue(dice.fixedSign, dice.fixedValue),
			maximum: (dice.count * dice.sides) + (getSignValue(dice.fixedSign, dice.fixedValue) * dice.count),
		};
	}

	return {
		count: dice.count,
		sides: dice.sides,

		fixedSign: "+",
		fixedValue: 0,

		minimum: dice.count,
		maximum: dice.count * dice.sides,
	};
}
