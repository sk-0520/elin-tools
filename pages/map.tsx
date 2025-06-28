import type { NextPage } from "next";
import { DefaultPage } from "@/components/layout/DefaultPage";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";

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
