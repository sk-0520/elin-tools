import { Stack } from "@mui/material";
import type { NextPage } from "next";
import { ElapsedYearsCalculator } from "@/components/calculation/ElapsedYearsCalculator";
import { PickpocketWeightCalculator } from "@/components/calculation/PickpocketWeightCalculator";
import { DefaultPage } from "@/components/layout/DefaultPage";

const Page: NextPage = () => {
	return (
		<DefaultPage pageId="calculation">
			<Stack spacing={2}>
				<PickpocketWeightCalculator />
				<ElapsedYearsCalculator />
			</Stack>
		</DefaultPage>
	);
};

export default Page;
