import { CircularProgress } from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { DefaultPage } from "@/components/layout/DefaultPage";
import { ReferenceLink } from "@/components/ReferenceLink";

const Page: NextPage = () => {
	const GlobalMap = useMemo(
		() =>
			dynamic(() => import("@/components/map/GlobalMap"), {
				loading: () => <CircularProgress size={200} />,
				ssr: false,
			}),
		[],
	);

	return (
		<DefaultPage pageId="map">
			<GlobalMap />
			<ReferenceLink href="https://ylvapedia.wiki/wiki/Elin:%E3%82%B0%E3%83%AD%E3%83%BC%E3%83%90%E3%83%AB%E3%83%9E%E3%83%83%E3%83%97">
				グローバルマップ - Ylvapedia
			</ReferenceLink>
		</DefaultPage>
	);
};

export default Page;
