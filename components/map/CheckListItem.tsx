import {
	Checkbox,
	ListItemButton,
	ListItemText,
	type SxProps,
	type Theme,
} from "@mui/material";
import { type FC, type MouseEventHandler, type ReactNode, useId } from "react";

export interface CheckListItemProps {
	readonly children: ReactNode;
	readonly isChecked: boolean;
	readonly sx?: SxProps<Theme>;
	onClick: MouseEventHandler<HTMLDivElement> | undefined;
}

export const CheckListItem: FC<CheckListItemProps> = (props) => {
	const { children, isChecked, sx, onClick } = props;
	const id = useId();

	return (
		<ListItemButton sx={sx} dense onClick={onClick}>
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
