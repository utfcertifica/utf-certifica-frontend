import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@context/auth';

import LoggedInLayout from '@layout/logged-in-layout';

import CreateEventsPage from '@pages/Events/create-event';
import EventsPage from '@pages/Events/events';
import ViewEvent from '@pages/Events/view-event';
import NewCertificate from '@pages/NewCertificate/new-certificate';
import CertificatePage from '@pages/certificate';
import CertificatesPage from '@pages/certificates';
import DashboardPage from '@pages/dashboard';
import LoginPage from '@pages/login';
import MinhaContaPage from '@pages/minhaConta';

import Protected from './protected';

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path='/login' element={<LoginPage />} />

					<Route
						element={
							<Protected>
								<LoggedInLayout>
									<Outlet />
								</LoggedInLayout>
							</Protected>
						}
					>
						<Route path='/' element={<DashboardPage />} />
						<Route path='/eventos' element={<EventsPage />} />
						<Route path='/certificados' element={<CertificatesPage />} />
						<Route path='/certificado/editar/:id' element={<NewCertificate />} />
						<Route path='/certificado/visualizar/:id' element={<CertificatePage />} />
						<Route path='/certificate' element={<CertificatePage />} />
						<Route path='/novo-certificado' element={<NewCertificate />} />
						<Route path='/novo-evento' element={<CreateEventsPage />} />
						<Route path='/minha-conta' element={<MinhaContaPage />} />
						<Route path='/eventos/:eventId/visualizar-evento' element={<ViewEvent />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default AppRoutes;
