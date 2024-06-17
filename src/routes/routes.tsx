import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { AuthProvider } from "@context/auth";

import LoggedInLayout from "@layout/logged-in-layout";

import CertificatesPage from "@pages/certificates";
import DashboardPage from "@pages/dashboard";
import EventsPage from "@pages/events";
import LoginPage from "@pages/login";
import CertificatePage from "@pages/certificate";
import NewCertificate from "@pages/NewCertificate/new-certificate";
import CreateEventsPage from "@pages/createevents.tsx";
import Protected from "./protected";
import MinhaContaPage from "@pages/minhaConta";

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
						<Route path="/eventos" element={<EventsPage />} />
						<Route
							path="/certificados"
							element={<CertificatesPage />}
						/>
						<Route
							path="/certificado/editar/:id"
							element={<NewCertificate />}
						/>
						<Route
							path="/certificado/visualizar/:id"
							element={<CertificatePage />}
						/>
						<Route
							path="/certificate"
							element={<CertificatePage />}
						/>
						<Route
							path="/novo-certificado"
							element={<NewCertificate />}
						/>
						<Route
							path="/novo-evento"
							element={<CreateEventsPage />}
						/>
						<Route
							path="/minha-conta"
							element={<MinhaContaPage />}
						/>
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default AppRoutes;
