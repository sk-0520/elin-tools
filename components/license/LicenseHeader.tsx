import { TableCell, TableHead, TableRow } from "@mui/material";
import type { FC } from "react";

export const LicenseHeader: FC = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell>モジュール</TableCell>
				<TableCell>作者</TableCell>
				<TableCell>ライセンス</TableCell>
			</TableRow>
		</TableHead>
	);
};
