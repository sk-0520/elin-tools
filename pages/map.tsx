import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useCallback, useMemo } from "react";
import { DefaultPage } from "@/components/layout/DefaultPage";
import { MapKind } from "@/features/map";
import { useGlobalMapStore } from "@/hooks/useGlobalMapStore";

const Page: NextPage = () => {
	const globalMapStore = useGlobalMapStore();

	const handleVisibleChanged = useCallback(
		(name: MapKind, isVisible: boolean) => {
			//globalMapStore.setVisible(name, isVisible);
			console.debug({ name, isVisible });
		},
		[],
	);

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
			<GlobalMap
				isVisible={globalMapStore.isVisible}
				callbackVisibleChanged={handleVisibleChanged}
			/>
		</DefaultPage>
	);
};

export default Page;
