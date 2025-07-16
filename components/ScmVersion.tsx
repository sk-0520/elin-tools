import type { FC } from "react";

const Version =
	process.env.NEXT_PUBLIC_SCM_VERSION ??
	"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

export interface ScmVersionProps {
	mode: "head";
}

export const ScmVersion: FC<ScmVersionProps> = (props) => {
	const { mode } = props;

	switch (mode) {
		case "head":
			return <meta name="version" content={Version} />;
	}
};
