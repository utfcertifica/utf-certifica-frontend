import { ChevronRightRounded, HomeRounded } from "@mui/icons-material";
import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";
import { PropsWithChildren } from "react";

interface PageWrapperProps extends PropsWithChildren {
	breadcrumbLabel?: string;
}

const PageWrapper = ({ children, breadcrumbLabel }: PageWrapperProps) => {
	return (
		<Box
			component="main"
			sx={{
				backgroundColor: "white",
				margin: "20px",
				px: { xs: 2, md: 6 },
				pt: {
					xs: "calc(12px + var(--Header-height))",
					sm: "calc(12px + var(--Header-height))",
					md: 3,
				},
				pb: { xs: 2, sm: 2, md: 3 },
				flex: 1,
				flexDirection: "column",
				minWidth: "calc(100dvw - var(--Sidebar-width) - 48px)",
				minHeight: "100dvh - 5",
				borderRadius: 30,
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Breadcrumbs
					size="sm"
					aria-label="breadcrumbs"
					separator={<ChevronRightRounded fontSize="small" />}
					sx={{ pl: 0 }}
				>
					<Link
						underline="none"
						color="neutral"
						href="/"
						aria-label="Home"
					>
						<HomeRounded />
					</Link>
					<Link
						underline="hover"
						color="neutral"
						href="/"
						fontSize={12}
						fontWeight={500}
					>
						Certifica UTF
					</Link>
					<Typography color="primary" fontWeight={500} fontSize={12}>
						{breadcrumbLabel}
					</Typography>
				</Breadcrumbs>
			</Box>
			{children}
		</Box>
	);
};

export default PageWrapper;
