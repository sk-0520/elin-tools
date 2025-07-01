import {
	ConvertError,
	convertFloat,
	convertFloatChain,
	convertInt,
	convertIntChain,
	toDisplayFloat,
} from "@/features/calculation";

describe("convertIntChain", () => {
	test.each([{}, [], true, null, undefined, Number.NaN, 1n])(
		"no number(not nan) | no string: %p",
		(input: unknown) => {
			expect(convertIntChain(input, (a) => fail(`a: ${a}`))).toBeFalsy();
		},
	);

	test.each([-1, 0, 1])("number: %d", (input: number) => {
		const actual = convertIntChain(input, (a) => expect(a).toBe(input));
		expect(actual).toBeTruthy();
	});

	test.each(["", "-a", ".", ".1", "10a"])(
		"fail string: %s",
		(input: string) => {
			expect(convertIntChain(input, (a) => fail(`a: ${a}`))).toBeFalsy();
		},
	);

	test.each([
		[-1, "-1"],
		[0, "0"],
		[1, "1"],
		[1, "+1"],
		[1, "1.5"],
		[1, "1.9"],
		[2, "2.0"],
		[3, "3."],
		[-4, "-4."],
	])("success string: %s", (expected: number, input: string) => {
		expect(
			convertIntChain(input, (a) => expect(a).toBe(expected)),
		).toBeTruthy();
	});
});

describe("convertFloatChain", () => {
	test.each([{}, [], true, null, undefined, Number.NaN, 1n])(
		"no number(not nan) | no string: %p",
		(input: unknown) => {
			expect(
				convertFloatChain(input, (a) => fail(`a: ${a}`)),
			).toBeFalsy();
		},
	);

	test.each([-1, 0, 1])("number: %d", (input: number) => {
		const actual = convertFloatChain(input, (a) => expect(a).toBe(input));
		expect(actual).toBeTruthy();
	});

	test.each(["", "-a", ".", "10a"])("fail string: %s", (input: string) => {
		expect(convertFloatChain(input, (a) => fail(`a: ${a}`))).toBeFalsy();
	});

	test.each([
		[-1, "-1"],
		[0, "0"],
		[1, "1"],
		[1, "+1"],
		[1.5, "1.5"],
		[1.9, "1.9"],
		[2, "2.0"],
		[0.1, ".1"],
		[3, "3."],
		[-4, "-4."],
		[0.5, "+.5"],
		[-0.6, "-.6"],
	])("success string: %s", (expected: number, input: string) => {
		expect(
			convertFloatChain(input, (a) => expect(a).toBe(expected)),
		).toBeTruthy();
	});
});

describe("convertInt", () => {
	test.each([{}, [], true, null, undefined, Number.NaN, 1n])(
		"no number(not nan) | no string: %p",
		(input: unknown) => {
			expect(() => convertInt(input)).toThrow(ConvertError);
		},
	);

	test.each([-1, 0, 1])("number: %d", (input: number) => {
		expect(convertInt(input)).toBe(input);
	});

	test.each(["", "-a", ".", ".1", "10a"])(
		"fail string: %s",
		(input: string) => {
			expect(() => convertInt(input)).toThrow(ConvertError);
		},
	);

	test.each([
		[-1, "-1"],
		[0, "0"],
		[1, "1"],
		[1, "+1"],
		[1, "1.5"],
		[1, "1.9"],
		[2, "2.0"],
		[3, "3."],
		[-4, "-4."],
	])("success string: %s", (expected: number, input: string) => {
		expect(convertInt(input)).toBe(expected);
	});
});

describe("convertFloat", () => {
	test.each([{}, [], true, null, undefined, Number.NaN, 1n])(
		"no number(not nan) | no string: %p",
		(input: unknown) => {
			expect(() => convertFloat(input)).toThrow(ConvertError);
		},
	);

	test.each([-1, 0, 1])("number: %d", (input: number) => {
		expect(convertFloat(input)).toBe(input);
	});

	test.each(["", "-a", ".", "10a"])("fail string: %s", (input: string) => {
		expect(() => convertFloat(input)).toThrow(ConvertError);
	});

	test.each([
		[-1, "-1"],
		[0, "0"],
		[1, "1"],
		[1, "+1"],
		[1.5, "1.5"],
		[1.9, "1.9"],
		[2, "2.0"],
		[0.1, ".1"],
		[3, "3."],
		[-4, "-4."],
		[0.5, "+.5"],
		[-0.6, "-.6"],
	])("success string: %s", (expected: number, input: string) => {
		expect(convertFloat(input)).toBe(expected);
	});
});

describe("toDisplayFloat", () => {
	test.each([
		["0.00", 0],
		["15.00", 15],
		["0.01", 0.01],
		["0.02", 0.02],
		["0.08", 0.08],
		["0.09", 0.09],
		["0.10", 0.1],
		["0.00", 0.001],
		["0.00", 0.005],
		["0.00", 0.009],
		["0.01", 0.019],
	])("input: %d", (expected: string, input: number) => {
		expect(toDisplayFloat(input)).toBe(expected);
	});
});
