import {
	calculateDice,
	DiceFormatError,
	type DiceValue,
	type DiceWithFixed,
	type DiceWithoutFixed,
	parseDice,
} from "@/features/dice";

describe("parseDice", () => {
	test.each([[""], ["1"], ["1d"], ["1dA"], ["1d1*"], ["1d1+a"]])(
		"DiceFormatError: %s",
		(dice: string) => {
			expect(() => parseDice(dice)).toThrow(DiceFormatError);
		},
	);

	test.each([
		[{ fixed: false, count: 1, sides: 2 } satisfies DiceWithoutFixed, "1d2"],
		[{ fixed: false, count: 1, sides: 2 } satisfies DiceWithoutFixed, "01d02"],
	])("DiceWithoutFixed: %p, %s", (expected: DiceWithoutFixed, dice: string) => {
		expect(parseDice(dice)).toStrictEqual(expected);
	});

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
				fixedSign: "+",
				fixedValue: 0,
				minimum: 1,
				maximum: 2,
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
				fixedSign: "+",
				fixedValue: 0,
				minimum: 10,
				maximum: 200,
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
				fixedSign: "+",
				fixedValue: 0,
				minimum: 1,
				maximum: 2,
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
				fixedSign: "+",
				fixedValue: 10,
				minimum: 11,
				maximum: 12,
			} satisfies DiceValue,
			{
				fixed: true,
				count: 1,
				sides: 2,
				fixedSign: "+",
				fixedValue: 10,
			} satisfies DiceWithFixed,
		],
	])("fixed: %p, %p", (expected: DiceValue, dice: DiceWithFixed) => {
		expect(calculateDice(dice)).toStrictEqual(expected);
	});
});
