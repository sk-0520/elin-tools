import { Stack } from "@mui/material";
import type { NextPage } from "next";
import { DefaultPage } from "@/components/layout/DefaultPage";
import { PickpocketCalculator } from "@/components/pages/calculation/PickpocketCalculator";

const Page: NextPage = () => {
	return (
		<DefaultPage pageId="calculation">
			<Stack>
				<PickpocketCalculator />
			</Stack>
		</DefaultPage>
	);
};

export default Page;
