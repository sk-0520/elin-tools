import { Stack } from "@mui/material";
import type { NextPage } from "next";
import { PickpocketWeightCalculator } from "@/components/calculation/PickpocketWeightCalculator";
import { DefaultPage } from "@/components/layout/DefaultPage";

const Page: NextPage = () => {
	return (
		<DefaultPage pageId="calculation">
			<Stack>
				<PickpocketWeightCalculator />
			</Stack>
		</DefaultPage>
	);
};

export default Page;
