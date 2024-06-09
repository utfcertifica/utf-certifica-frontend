<<<<<<< HEAD
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
=======
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
>>>>>>> 9143278c3e59b898625037012db7deddb08ba5e7

import {AuthProvider} from "@context/auth";

import LoggedInLayout from "@layout/logged-in-layout";

import NewCertificate from "@pages/NewCertificate/new-certificate";
import CertificatePage from "@pages/certificate";
import CertificatesPage from "@pages/certificates";
import DashboardPage from "@pages/dashboard";
import EventsPage from "@pages/events";
import LoginPage from "@pages/login";
<<<<<<< HEAD

import MinhaContaPage from "@pages/minhaConta";
=======
import CertificatePage from "@pages/certificate";
import NewCertificate from "@pages/NewCertificate/new-certificate";
import CreateEventsPage from "@pages/createevents.tsx";
>>>>>>> 9143278c3e59b898625037012db7deddb08ba5e7
import Protected from "./protected";

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
							path="/certificate"
							element={<CertificatePage />}
						/>
						<Route
							path="/novo-certificado"
							element={<NewCertificate />}
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
