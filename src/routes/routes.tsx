import { AuthProvider } from "@context/auth";
import LoginPage from "@pages/login";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Protected from "./protected";
import LoggedInLayout from "src/layout/logged-in-layout";
import DashboardPage from "@pages/dashboard";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/login" element={<LoginPage />} />

					<Route
						element={
							<Protected>
								<LoggedInLayout>
									<Outlet />
								</LoggedInLayout>
							</Protected>
						}
					>
						<Route path="/" element={<DashboardPage />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default AppRoutes;
