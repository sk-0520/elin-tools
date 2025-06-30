import { TableCell, TableHead, TableRow } from "@mui/material";
import type { FC } from "react";

export const LicenseHeader: FC = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell align="center">モジュール</TableCell>
				<TableCell align="center">作者</TableCell>
				<TableCell align="center">ライセンス</TableCell>
			</TableRow>
		</TableHead>
	);
};
