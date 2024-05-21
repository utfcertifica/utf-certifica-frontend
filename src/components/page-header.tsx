import { Box, type BoxProps, IconButton, Typography, useTheme } from "@mui/joy";
import { CrossIcon } from "./icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type PageHeaderProps = BoxProps & {
	title: string;
	subtitle: string;
	onAddButtonClick?: () => void;
};

export const PageHeader = ({
	title,
	subtitle,
	onAddButtonClick,
	...props
}: PageHeaderProps) => {
	const theme = useTheme();
	const colors = theme.colorSchemes.light.palette.common;

	const currentDate = new Date();
	const formattedDate = format(currentDate, "dd 'de' MMMM 'de' yyyy", {
		locale: ptBR,
	});

	return (
		<Box
			{...props}
			component="header"
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				pb: "2rem",
				borderBottom: `1px solid ${colors["gray-700"]}`,
				...props.sx,
			}}
		>
			<Box>
				<Typography
					fontSize={40}
					fontWeight="600"
					lineHeight={2}
					textColor={colors["black-50"]}
				>
					{title}
				</Typography>
				<Typography
					fontSize={16}
					fontWeight="400"
					lineHeight={1.5}
					textColor={colors["black-300"]}
				>
					{formattedDate}
				</Typography>
			</Box>

			{onAddButtonClick ? (
				<IconButton
					variant="solid"
					onClick={onAddButtonClick}
					sx={{
						width: "2.75rem",
						height: "2.75rem",
						backgroundColor: `${colors["purple-50"]}`,
						borderRadius: "50%",
					}}
				>
					<CrossIcon />
				</IconButton>
			) : null}
		</Box>
	);
};
