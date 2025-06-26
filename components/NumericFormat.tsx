import { Typography } from "@mui/material"
import type { FC } from "react"

export interface NumericFormatProps{
	value: number
}

export const NumericFormat: FC<NumericFormatProps> = (props) => {
	const {value} = props

	return <Typography>{value}</Typography>
}