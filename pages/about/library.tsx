import { Table, TableBody } from "@mui/material";
import type { NextPage } from "next";
import { DefaultPage } from "@/components/layout/DefaultPage";
import { LicenseHeader } from "@/components/license/LicenseHeader";
import { LicenseRow } from "@/components/license/LicenseRow";
import type { License } from "@/features/license";
import license from "@/raw-resource/license/license.json";

function getKeys<T extends object>(json: T): Array<keyof T> {
	return Object.keys(json) as Array<keyof T>;
}

const Page: NextPage = () => {
	const licenseItems = getKeys(license).map((a) => {
		const value = license[a];

		const result: License = {
			module: value.module,
			repository: value.repository,
			license: value.licenses,
			licenseNote: value.licenseNote,
			publisher: "publisher" in value ? value.publisher : undefined,
		};

		return result;
	});

	return (
		<DefaultPage pageId="about-library">
			<Table>
				<LicenseHeader />
				<TableBody>
					{licenseItems.map((a) => (
						<LicenseRow key={a.module} license={a} />
					))}
				</TableBody>
			</Table>
		</DefaultPage>
	);
};

export default Page;
