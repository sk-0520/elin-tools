import {
	Button,
	Collapse,
	Link,
	Paper,
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";
import { type FC, useState } from "react";
import type { License } from "@/features/license";

export type LicenseRowProps = {
	readonly license: License;
};

export const LicenseRow: FC<LicenseRowProps> = (props) => {
	const { license } = props;
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen((a) => !a);
	};

	return (
		<>
			<TableRow
				sx={
					isOpen
						? {
								//borderBottom: undefined,
								"& > *": {
									borderBottom: "transparent",
								},
							}
						: undefined
				}
			>
				<TableCell>
					<Link href={license.repository} target="_blank">
						{license.module}
					</Link>
				</TableCell>
				<TableCell>{license.publisher}</TableCell>
				<TableCell>
					{license.licenseNote ? (
						<Button
							fullWidth
							variant={isOpen ? "contained" : "outlined"}
							onClick={handleToggle}
						>
							{license.license}
						</Button>
					) : (
						license.license
					)}
				</TableCell>
			</TableRow>
			{license.licenseNote && isOpen && (
				<TableRow>
					<TableCell
						colSpan={3}
						sx={{
							overflow: "hidden",
						}}
					>
						<Collapse in={isOpen}>
							<Paper
								sx={{
									overflow: "scroll",
									maxHeight: "60vh",
									padding: "1em",
								}}
							>
								<Typography component="pre" sx={{ fontFamily: "monospace" }}>
									{license.licenseNote}
								</Typography>
							</Paper>
						</Collapse>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};
