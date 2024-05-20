import { ReactNode, useContext, useEffect } from "react";
import { Box } from "@mui/joy";
import Sidebar from "@components/sidebar";
import { AuthContext } from "@context/auth";

interface LoggedInLayoutProps {
	children?: ReactNode;
}

function LoggedInLayout({ children }: LoggedInLayoutProps) {
	const { loadUsers } = useContext(AuthContext);
	useEffect(() => {
		loadUsers();
	}, []);
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
