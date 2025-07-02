import { Stack } from "@mui/material";
import type { NextPage } from "next";
import { DefaultPage } from "@/components/layout/DefaultPage";
import { PickpocketWeightCalculator } from "@/components/pages/calculation/PickpocketWeightCalculator";

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
