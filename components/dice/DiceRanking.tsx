import {
	List,
	ListItem,
	type ListItemProps,
	Stack,
	styled,
	Typography,
} from "@mui/material";
import type { FC } from "react";
import { Fragment } from "react";
import type { RankValue } from "@/features/dice";
import type { DiceEditor } from "@/hooks/useWeponEditorsStore";
import { EditorId } from "./EditorId";

type StyledIdListItemProps = ListItemProps & {
	id: string;
	editors: Record<string, DiceEditor>;
	isTop: boolean;
};

const StyledIdListItem = styled((props: StyledIdListItemProps) => {
	const { id, editors, isTop, ...originProps } = props;
	return (
		<ListItem disablePadding {...originProps}>
			<EditorId
				id={id}
				color={editors[id].color}
				strong={isTop}
				size="small"
			/>
		</ListItem>
	);
})();

export interface DiceRankingProps {
	readonly editors: Record<string, DiceEditor>;
	readonly items: RankValue[];
}

export const DiceRanking: FC<DiceRankingProps> = (props) => {
	const { items, editors } = props;

	return (
		<List component={Stack} direction="row" disablePadding>
			{items.map((a, index) => {
				return (
					<Fragment key={a.id}>
						{index === 0 ? (
							<StyledIdListItem
								id={a.id}
								editors={editors}
								isTop={true}
							/>
						) : (
							<>
								<ListItem
									sx={{
										padding: 0,
										display: "inline-block",
										textAlign: "center",
									}}
								>
									<Typography>{a.prevEqual ? "=" : ">"}</Typography>
								</ListItem>
								<StyledIdListItem
									id={a.id}
									editors={editors}
									isTop={false}
								/>
							</>
						)}
					</Fragment>
				);
			})}
		</List>
	);
};
