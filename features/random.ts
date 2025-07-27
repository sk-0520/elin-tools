function builtin_randomInt(min: number, max: number): number {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export interface Random {
	/**
	 * @returns 0 <= result < 1
	 */
	next(): number;

	/**
	 * @returns 0 <= result
	 */
	nextInt(): number;
	/**
	 * @returns 0 <= result < max
	 */
	nextInt(max: number): number;
	/**
	 * @returns min <= result < max
	 */
	nextInt(min: number, max: number): number;
}

export class BuiltinRandom implements Random {
	public next(): number {
		return Math.random();
	}

	public nextInt(): number;
	public nextInt(max: number): number;
	public nextInt(min: number, max: number): number;
	public nextInt(min?: number, max?: number): number {
		if (max === undefined) {
			if (min === undefined) {
				// nextInt()
				return builtin_randomInt(0, Number.MAX_SAFE_INTEGER);
			}
			// nextInt(max: number)
			return builtin_randomInt(0, min);
		}

		if (min === undefined) {
			throw new Error();
		}

		// nextInt(min: number, max: number)
		return builtin_randomInt(min, max);
	}
}
