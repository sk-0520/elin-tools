import {
	calculateDice,
	DiceFormatError,
	type DiceValue,
	type DiceWithFixed,
	type DiceWithoutFixed,
	parseDice,
	rollDice,
	sum,
} from "@/features/dice";
import { BuiltinRandom } from "@/features/random";

describe("parseDice", () => {
	test.each([[""], ["1"], ["1d"], ["1dA"], ["1d1*"], ["1d1+a"]])(
		"DiceFormatError: %s",
		(dice: string) => {
			expect(() => parseDice(dice)).toThrow(DiceFormatError);
		},
	);

	test.each([
		[
			{ fixed: false, count: 1, sides: 2 } satisfies DiceWithoutFixed,
			"1d2",
		],
		[
			{ fixed: false, count: 1, sides: 2 } satisfies DiceWithoutFixed,
			"01d02",
		],
		[
			{ fixed: false, count: 4, sides: 5 } satisfies DiceWithoutFixed,
			" 4 d 5 ",
		],
	])(
		"DiceWithoutFixed: %p, %s",
		(expected: DiceWithoutFixed, dice: string) => {
			expect(parseDice(dice)).toStrictEqual(expected);
		},
	);

	test.each([
		[
			{
				fixed: true,
				count: 1,
				sides: 2,
				fixedSign: "+",
				fixedValue: 3,
			} satisfies DiceWithFixed,
			"1d2+3",
		],
		[
			{
				fixed: true,
				count: 1,
				sides: 2,
				fixedSign: "-",
				fixedValue: 3,
			} satisfies DiceWithFixed,
			"1d2-3",
		],
		[
			{
				fixed: true,
				count: 1,
				sides: 2,
				fixedSign: "+",
				fixedValue: 3,
			} satisfies DiceWithFixed,
			"01d02+03",
		],
		[
			{
				fixed: true,
				count: 1,
				sides: 2,
				fixedSign: "-",
				fixedValue: 3,
			} satisfies DiceWithFixed,
			"01d02-03",
		],
		[
			{
				fixed: true,
				count: 4,
				sides: 5,
				fixedSign: "+",
				fixedValue: 6,
			} satisfies DiceWithFixed,
			" 4 d 5 + 6",
		],
	])("DiceWithFixed: %p, %s", (expected: DiceWithFixed, dice: string) => {
		expect(parseDice(dice)).toStrictEqual(expected);
	});
});

describe("calculateDice", () => {
	test.each([
		[
			{
				count: 1,
				sides: 2,
				hasFixed: false,
				fixedValue: 0,
				minimum: 1,
				maximum: 2,
				expected: 1.5,
			} satisfies DiceValue,
			{
				fixed: false,
				count: 1,
				sides: 2,
			} satisfies DiceWithoutFixed,
		],
		[
			{
				count: 10,
				sides: 20,
				hasFixed: false,
				fixedValue: 0,
				minimum: 10,
				maximum: 200,
				expected: 105,
			} satisfies DiceValue,
			{
				fixed: false,
				count: 10,
				sides: 20,
			} satisfies DiceWithoutFixed,
		],
	])("noFixed: %p, %p", (expected: DiceValue, dice: DiceWithoutFixed) => {
		expect(calculateDice(dice)).toStrictEqual(expected);
	});

	test.each([
		[
			{
				count: 1,
				sides: 2,
				hasFixed: true,
				fixedValue: 0,
				minimum: 1,
				maximum: 2,
				expected: 1.5,
			} satisfies DiceValue,
			{
				fixed: true,
				count: 1,
				sides: 2,
				fixedSign: "+",
				fixedValue: 0,
			} satisfies DiceWithFixed,
		],
		[
			{
				count: 1,
				sides: 2,
				hasFixed: true,
				fixedValue: 10,
				minimum: 11,
				maximum: 12,
				expected: 11.5,
			} satisfies DiceValue,
			{
				fixed: true,
				count: 1,
				sides: 2,
				fixedSign: "+",
				fixedValue: 10,
			} satisfies DiceWithFixed,
		],
		[
			{
				count: 1,
				sides: 2,
				hasFixed: true,
				fixedValue: -10,
				minimum: -9,
				maximum: -8,
				expected: -8.5,
			} satisfies DiceValue,
			{
				fixed: true,
				count: 1,
				sides: 2,
				fixedSign: "-",
				fixedValue: 10,
			} satisfies DiceWithFixed,
		],
	])("fixed: %p, %p", (expected: DiceValue, dice: DiceWithFixed) => {
		expect(calculateDice(dice)).toStrictEqual(expected);
	});
});

// describe("rankDice", () => {
// 	test("rankDice", () => {});
// });

describe("rollDice", () => {
	test.each([
		[
			{
				count: 1,
				sides: 1,
				fixedValue: 0,
				minimum: -1,
				maximum: -1,
				hasFixed: false,
				expected: -1,
			} satisfies DiceValue,
			10,
		],
		[
			{
				count: 10,
				sides: 5,
				fixedValue: 2,
				minimum: -1,
				hasFixed: false,
				maximum: -1,
				expected: -1,
			} satisfies DiceValue,
			100,
		],
	])("rollDice: %d %d", (dice: DiceValue, count: number) => {
		const actual = rollDice(dice, count, new BuiltinRandom());
		expect(actual).toHaveLength(count);
		for (const actualArray of actual) {
			expect(actualArray).toHaveLength(dice.count);
			for (const actualElement of actualArray) {
				expect(actualElement).toBeGreaterThanOrEqual(dice.fixedValue);
				expect(actualElement).toBeLessThanOrEqual(
					dice.count * dice.sides + dice.fixedValue,
				);
			}
		}
	});
});

describe("sum", () => {
	test("sum", () => {
		expect(
			sum([
				[10, 20, 30],
				[-10, -20, -30],
			]),
		).toStrictEqual([60, -60]);
	});
});
