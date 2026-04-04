import path from "node:path";
import sharp, { type Sharp } from "sharp";

export interface Input {
	sourcePath: string;
	chunkDirectoryPath: string;
	outputDirectoryPath: string;
}

const BlockSize = {
	x: 48,
	y: 48,
};

interface BlockCount {
	x: number;
	y: number;
}

interface Chunks {
	[index: number]: Sharp;
}

async function isSkipImage(image: Sharp): Promise<boolean> {
	const { data, info } = await image
		.clone()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const alphaIndex = info.channels - 1;
	for (let i = alphaIndex; i < data.length; i += info.channels) {
		if (data[i] !== 0) return false;
	}
	return true;
}

async function exportChunks(
	chunkDirectoryPath: string,
	blockCount: BlockCount,
	image: sharp.Sharp,
): Promise<Chunks> {
	const result: Chunks = {};

	let chunkIndex = 0;
	for (let y = 0; y < blockCount.y; y++) {
		for (let x = 0; x < blockCount.x; x++, chunkIndex++) {
			const position = {
				x: x * BlockSize.x,
				y: y * BlockSize.y,
			};

			const chunkImage = image.clone().extract({
				left: position.x,
				top: position.y,
				width: BlockSize.x,
				height: BlockSize.y,
			});
			if (await isSkipImage(chunkImage)) {
				continue;
			}
			const chunkPath = path.resolve(
				chunkDirectoryPath,
				`${chunkIndex}_${x}_${y}.png`,
			);
			await chunkImage.toFile(chunkPath);
			result[chunkIndex] = chunkImage;
		}
	}

	return result;
}

export async function main(input: Input) {
	const image = await sharp(input.sourcePath);

	const metadata = await image.metadata();

	// チャンク出力
	const blockCount: BlockCount = {
		x: Math.trunc(metadata.width / BlockSize.x),
		y: Math.trunc(metadata.height / BlockSize.y),
	};

	var chunks = await exportChunks(
		input.chunkDirectoryPath,
		blockCount,
		image,
	);
}
