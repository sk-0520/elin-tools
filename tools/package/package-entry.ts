import * as path from "node:path";
import { main } from "./package";

const packageJsonPath = path.resolve(__dirname, "..", "..", "package.json");
main({
	inputFilePath: packageJsonPath,
	outputFilePath: packageJsonPath,
});
