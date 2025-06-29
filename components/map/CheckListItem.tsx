import { Checkbox, ListItemButton, ListItemText } from "@mui/material";
import { type FC, type MouseEventHandler, type ReactNode, useId } from "react";

export interface CheckListItemProps {
	readonly children: ReactNode;
	readonly isChecked: boolean;
	onClick: MouseEventHandler<HTMLDivElement> | undefined;
}

export const CheckListItem: FC<CheckListItemProps> = (props) => {
	const { children, isChecked, onClick } = props;
	const id = useId();

	return (
		<ListItemButton dense onClick={onClick}>
			<Checkbox
				edge="start"
				size="small"
				checked={isChecked}
				tabIndex={-1}
				disableRipple
				slotProps={{
					input: {
						"aria-labelledby": id,
					},
				}}
			/>
			<ListItemText id={id} primary={children} />
		</ListItemButton>
	);
};
