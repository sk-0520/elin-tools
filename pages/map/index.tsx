import { CircularProgress } from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useCallback, useMemo } from "react";
import { DefaultPage } from "@/components/layout/DefaultPage";
import type { MapCondition, MapImplementation, MapKind } from "@/features/map";
import { useGlobalMapStore } from "@/hooks/useGlobalMapStore";

const Page: NextPage = () => {
	const globalMapStore = useGlobalMapStore();

	const handleControllerChanged = useCallback(
		(isVisible: boolean) => {
			globalMapStore.setController(isVisible);
		},
		[globalMapStore.setController],
	);

	const handleVisibleChanged = useCallback(
		(kind: MapKind, isVisible: boolean) => {
			globalMapStore.setVisible(kind, isVisible);
		},
		[globalMapStore.setVisible],
	);

	const handleConditionChanged = useCallback(
		(condition: MapCondition, isEnabled: boolean) => {
			globalMapStore.setCondition(condition, isEnabled);
		},
		[globalMapStore.setCondition],
	);

	const handleImplementationChanged = useCallback(
		(implementation: MapImplementation, isEnabled: boolean) => {
			globalMapStore.setImplementation(implementation, isEnabled);
		},
		[globalMapStore.setImplementation],
	);

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
			<GlobalMap
				controller={globalMapStore.controller}
				isVisibles={globalMapStore.isVisibles}
				conditions={globalMapStore.conditions}
				implementations={globalMapStore.implementations}
				onControllerChanged={handleControllerChanged}
				onVisibleChanged={handleVisibleChanged}
				onConditionChanged={handleConditionChanged}
				onImplementationChanged={handleImplementationChanged}
			/>
		</DefaultPage>
	);
};

export default Page;
