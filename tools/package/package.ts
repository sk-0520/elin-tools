import * as fs from "node:fs";

export interface Input {
	inputFilePath: string;
	outputFilePath: string;
}

export function main(input: Input) {
	console.log(input);

	const json = JSON.parse(
		fs.readFileSync(input.inputFilePath, { encoding: "utf-8" }),
	);
	const date = new Date();
	const version = {
		year: String(date.getUTCFullYear()).padStart(4, "0"),
		month: String(date.getUTCMonth() + 1).padStart(2, "0"),
		date: String(date.getUTCDate()).padStart(2, "0"),

		hours: String(date.getUTCHours()).padStart(2, "0"),
		minutes: String(date.getUTCMinutes()).padStart(2, "0"),
		seconds: String(date.getUTCSeconds()).padStart(2, "0"),
	};
	json.version = `${version.year}${version.month}${version.date}.${version.hours}${version.minutes}.${version.seconds}`;

	fs.writeFileSync(
		input.outputFilePath,
		JSON.stringify(json, undefined, "	"),
	);
}
