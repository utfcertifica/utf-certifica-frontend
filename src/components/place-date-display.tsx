import { Box, Typography } from "@mui/joy";

type PlaceDateDisplay = {
	date: string;
	place: string;
};

export const PlaceDateDisplay = ({ date, place }: PlaceDateDisplay) => {
	return (
		<Box>
			<Typography
				component="h2"
				fontSize={22}
				fontWeight="500"
				textColor="rgba(67, 57, 242, 1)"
			>
				Data e local
			</Typography>
			<Typography
				component="h4"
				fontSize={14}
				lineHeight="1.25rem"
				fontWeight="400"
				textColor="rgba(0, 0, 0, 0.4)"
			>
				{date}
			</Typography>
			<Typography
				component="h4"
				fontSize={14}
				lineHeight="1.25rem"
				fontWeight="400"
				textColor="rgba(0, 0, 0, 0.4)"
			>
				{place}
			</Typography>
		</Box>
	);
};
