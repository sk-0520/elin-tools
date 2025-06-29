import { Button, Link, TableCell, TableRow } from "@mui/material";
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
			<TableRow>
				<TableCell>
					<Link href={license.repository} target={license.module}>
						{license.module}
					</Link>
				</TableCell>
				<TableCell>{license.publisher}</TableCell>
				<TableCell>
					{license.licenseNote ? (
						<Button fullWidth onClick={handleToggle}>
							{license.license}
						</Button>
					) : (
						license.license
					)}
				</TableCell>
			</TableRow>
			{license.licenseNote && isOpen && (
				<TableRow>
					<TableCell colSpan={3}>
						<pre>{license.licenseNote}</pre>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};
