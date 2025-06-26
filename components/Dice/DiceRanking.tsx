import { List, ListItemText, Stack } from "@mui/material";
import type { FC } from "react";
import type { RankValue } from "@/features/dice";

export interface DiceRankingProps {
	items: ReadonlyArray<RankValue>;
}

export const DiceRanking: FC<DiceRankingProps> = (props) => {
	const { items } = props;

	return (
		<List component={Stack} direction="row">
			{items.map((a, index) => {
				return (
					<ListItemText key={a.id}> 
						{index === 0
							? `${a.id}`
							: a.prevEqual
								? ` == ${a.id} `
								: ` > ${a.id} `}
					</ListItemText>
				);
			})}
		</List>
	);
};
