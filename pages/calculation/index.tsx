import {
	Stack,
	styled,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TextField,
	type TextFieldProps,
} from "@mui/material";
import type { NextPage } from "next";
import { GroupElement } from "@/components/GroupElement";
import { DefaultPage } from "@/components/layout/DefaultPage";

const StyledInputTextField = styled((props: TextFieldProps) => {
	return <TextField focused variant="outlined" {...props} />;
})({});
const StyledInputAnswerField = styled((props: TextFieldProps) => {
	return (
		<StyledInputTextField
			color="secondary"
			slotProps={{
				input: {
					readOnly: true,
				},
			}}
			{...props}
		/>
	);
})({});

const Page: NextPage = () => {
	return (
		<DefaultPage pageId="calculation">
			<Stack>
				<GroupElement subject="盗める重さ">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>筋力</TableCell>
								<TableCell>
									<StyledInputTextField />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>窃盗</TableCell>
								<TableCell>
									<StyledInputTextField />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>重さ</TableCell>
								<TableCell>
									<StyledInputAnswerField />
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</GroupElement>
			</Stack>
		</DefaultPage>
	);
};

export default Page;
