function built_randomInt(min: number, max: number): number {
	return min + Math.floor(Math.random() * max);
}

export interface Random {
	next(): number;

	nextInt(): number;
	nextInt(max: number): number;
	nextInt(min: number, max: number): number;
}

export class BuiltRandom implements Random {
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
				return built_randomInt(0, Number.MAX_SAFE_INTEGER);
			}
			// nextInt(max: number)
			return built_randomInt(0, min);
		}

		if (min === undefined) {
			throw new Error();
		}

		// nextInt(min: number, max: number)
		return built_randomInt(min, max);
	}
}
