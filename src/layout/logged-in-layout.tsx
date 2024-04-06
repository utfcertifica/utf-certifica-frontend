import { ReactNode, useContext, useEffect } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, CssBaseline, GlobalStyles } from "@mui/joy";
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
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<Box
				sx={{
					display: "flex",
					minHeight: "100dvh",
				}}
			>
				<Sidebar />

				{children}
			</Box>
		</CssVarsProvider>
	);
}

export default LoggedInLayout;
