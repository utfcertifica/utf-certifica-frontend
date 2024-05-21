import { ReactNode, useContext, useEffect } from "react";
import { Box } from "@mui/joy";
import Sidebar from "@components/sidebar";

interface LoggedInLayoutProps {
	children?: ReactNode;
}

function LoggedInLayout({ children }: LoggedInLayoutProps) {
	return (
		<Box
			sx={{
				display: "flex",
				minHeight: "100dvh",
			}}
		>
			<Sidebar />
			{children}
		</Box>
	);
}

export default LoggedInLayout;
