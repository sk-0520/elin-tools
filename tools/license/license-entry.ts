import * as path from "node:path";
import { main } from "./license";

const rootDirectoryPath = path.resolve(__dirname, "..", "..");
const outputFilePath = path.join(
	rootDirectoryPath,
	"raw-resource",
	"license",
	"license.json",
);

main({
	rootDirectoryPath: rootDirectoryPath,
	outputFilePath: outputFilePath,
});
