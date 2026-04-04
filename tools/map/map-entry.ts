import path from "node:path";
import type { Input } from "./map";
import { main } from "./map";

const inputImagePath = path.resolve(__dirname, "input", "world.png");
//const outputChunkDirectoryPath = path.resolve(__dirname, "chunk");
const outputChunkDirectoryPath = "X:\\chunk";
const outputImageDirectoryPath = path.resolve(__dirname, "output");

const input: Input = {
	sourcePath: inputImagePath,
	chunkDirectoryPath: outputChunkDirectoryPath,
	outputDirectoryPath: outputImageDirectoryPath,
};

main(input);
