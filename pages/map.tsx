import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { DefaultPage } from "@/components/layout/DefaultPage";

const Page: NextPage = () => {
	const GlobalMap = useMemo(
		() =>
			dynamic(() => import("@/components/map/GlobalMap"), {
				loading: () => <p>A map is loading</p>,
				ssr: false,
			}),
		[],
	);

	return (
		<DefaultPage pageId="map">
			<GlobalMap />
		</DefaultPage>
	);
};

export default Page;
