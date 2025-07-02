// biome-ignore lint/suspicious/noExplicitAny: いいの
globalThis.fail = (error: any): never => {
	if (error instanceof Error) {
		throw new Error(error.message, { cause: true });
	}

	throw new Error(error, { cause: true });
};
