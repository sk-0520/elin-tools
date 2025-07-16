import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, Tooltip } from "@mui/material";
import type { FC, ReactNode } from "react";

export interface ReferenceLinkProps {
	children?: ReactNode;
	href: string;
}

export const ReferenceLink: FC<ReferenceLinkProps> = (props) => {
	const { children, href } = props;

	return (
		<Tooltip title="参照元">
			<Link
				href={href}
				target="_blank"
				sx={{ display: "inline-flex", verticalAlign: "middle" }}
			>
				{<OpenInNewIcon fontSize="small" />}
				{children}
			</Link>
		</Tooltip>
	);
};
