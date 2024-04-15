import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { AuthProvider } from "@context/auth";

import LoggedInLayout from "@layout/logged-in-layout";

import DashboardPage from "@pages/dashboard";
import EventsPage from "@pages/events";
import LoginPage from "@pages/login";

import Protected from "./protected";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/login" element={<LoginPage />} />

					<Route
						element={
							// <Protected>
							<LoggedInLayout>
								<Outlet />
							</LoggedInLayout>
							// </Protected>
						}
					>
						<Route path="/" element={<DashboardPage />} />
						<Route path="/events" element={<EventsPage />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default AppRoutes;
