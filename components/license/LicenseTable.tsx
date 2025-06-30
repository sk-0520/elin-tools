import { Table, TableBody } from "@mui/material";
import type { FC } from "react";
import type { License } from "@/features/license";
import { LicenseHeader } from "./LicenseHeader";
import { LicenseRow } from "./LicenseRow";

export interface LicenseTableProps {
	readonly licenseItems: License[];
}

export const LicenseTable: FC<LicenseTableProps> = (props) => {
	const { licenseItems } = props;

	return (
		<Table sx={{ tableLayout: "fixed", width: "100%" }}>
			<LicenseHeader />
			<TableBody>
				{licenseItems.map((a) => (
					<LicenseRow key={a.module} license={a} />
				))}
			</TableBody>
		</Table>
	);
};
