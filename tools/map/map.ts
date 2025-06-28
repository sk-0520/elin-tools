import sharp from "sharp";

export interface Input {
	sourcePath: string;
}

export async function main(input: Input) {
	const image = await sharp(input.sourcePath);

	image.resize();
}
