import { BuiltinRandom } from "@/features/random";

describe("BuiltinRandom", () => {
	const Loop = 1000;

	test("next", () => {
		const expected = {
			min: 0,
			max: 1,
		};
		const random = new BuiltinRandom();
		for (let i = 0; i < Loop; i++) {
			const actual = random.next();
			expect(actual).toBeGreaterThanOrEqual(expected.min);
			expect(actual).toBeLessThanOrEqual(expected.max);
		}
	});

	test("nextInt()", () => {
		const expected = {
			min: 0,
			max: Number.MAX_SAFE_INTEGER,
		};
		const random = new BuiltinRandom();
		for (let i = 0; i < Loop; i++) {
			const actual = random.nextInt();
			expect(actual).toBeGreaterThanOrEqual(expected.min);
			expect(actual).toBeLessThanOrEqual(expected.max);
		}
	});

	test("nextInt(max)", () => {
		const expected = {
			min: 0,
			max: 100,
		};
		const random = new BuiltinRandom();
		for (let i = 0; i < Loop; i++) {
			const actual = random.nextInt(100);
			expect(actual).toBeGreaterThanOrEqual(expected.min);
			expect(actual).toBeLessThanOrEqual(expected.max);
		}
	});

	test("nextInt(min,max)", () => {
		const expected = {
			min: 500,
			max: 600,
		};
		const random = new BuiltinRandom();
		for (let i = 0; i < Loop; i++) {
			const actual = random.nextInt(500, 600);
			expect(actual).toBeGreaterThanOrEqual(expected.min);
			expect(actual).toBeLessThanOrEqual(expected.max);
		}
	});
});
