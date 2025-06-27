import {
	List,
	ListItem,
	type ListItemProps,
	Stack,
	styled,
} from "@mui/material";
import type { FC } from "react";
import { Fragment } from "react";
import type { RankValue } from "@/features/dice";

const StyledIdListItem = styled((props: ListItemProps) => {
	return <ListItem disablePadding {...props} />;
})();

export interface DiceRankingProps {
	items: ReadonlyArray<RankValue>;
}

export const DiceRanking: FC<DiceRankingProps> = (props) => {
	const { items } = props;

	return (
		<List component={Stack} direction="row" disablePadding>
			{items.map((a, index) => {
				return (
					<Fragment key={a.id}>
						{index === 0 ? (
							<StyledIdListItem>{a.id}</StyledIdListItem>
						) : (
							<>
								<ListItem disablePadding>{a.prevEqual ? "=" : ">"}</ListItem>
								<StyledIdListItem>{a.id}</StyledIdListItem>
							</>
						)}
					</Fragment>
				);
			})}
		</List>
	);
};
