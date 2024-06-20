import { Box, Typography } from "@mui/joy";

type DataLabelDisplay = {
	data: string | undefined;
	label: string | undefined;
};

export const DataLabelDisplay = ({ data, label }: DataLabelDisplay) => {
	return (
		<Box>
			<Typography
				component="h2"
				fontSize={22}
				fontWeight="500"
				textColor="rgba(0, 0, 0, 1)"
			>
				{data}
			</Typography>
			<Typography
				component="h4"
				fontSize={14}
				lineHeight="1.25rem"
				fontWeight="400"
				textColor="rgba(0, 0, 0, 0.4)"
			>
				{label}
			</Typography>
		</Box>
	);
};
