import * as fs from "node:fs";
import * as path from "node:path";

import * as checker from "license-checker";

export interface Input {
	rootDirectoryPath: string;
	outputFilePath: string;
}

export function main(input: Input) {
	const json = JSON.parse(
		fs
			.readFileSync(path.join(input.rootDirectoryPath, "package.json"))
			.toString(),
	);
	const dependencies = new Set([
		...Object.keys(json.dependencies),
		...Object.keys(json.devDependencies),
	]);

	checker.init(
		{
			start: input.rootDirectoryPath,
		},
		(error, packages) => {
			if (error) {
				throw error;
			}

			const map = new Map<string, object>();

			for (const [key, value] of Object.entries(packages).sort((a, b) =>
				a[0].localeCompare(b[0]),
			)) {
				const versionSeparatorIndex = key.lastIndexOf("@");
				const name = key.substring(0, versionSeparatorIndex);
				const version = key.substring(versionSeparatorIndex + 1);

				if (dependencies.has(name)) {
					map.set(name, {
						module: key,
						version: version,
						publisher: value.publisher,
						licenses: value.licenses,
						licenseNote:
							value.licenseFile &&
							fs.existsSync(value.licenseFile)
								? fs.readFileSync(value.licenseFile).toString()
								: "",
						repository: value.repository,
					});
				}
			}

			fs.writeFileSync(
				input.outputFilePath,
				JSON.stringify(Object.fromEntries(map), undefined, 2),
			);
		},
	);
}
