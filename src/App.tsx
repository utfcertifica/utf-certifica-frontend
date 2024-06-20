import { CssVarsProvider } from '@mui/joy/styles';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AppRoutes from './routes/routes';

import queryClient from '@services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

import moment from 'moment';
import 'moment/dist/locale/pt-br';
moment.locale('pt-br');

import { CssBaseline } from '@mui/joy';
import { Provider, createStore } from 'jotai';
import { useAtomsDebugValue } from 'jotai-devtools';
import 'react-toastify/dist/ReactToastify.css';

import { theme } from './theme/theme';

const myStore = createStore();

const DebugAtoms = () => {
	useAtomsDebugValue();
	return null;
};

function App() {
	return (
		<Provider store={myStore}>
			<DebugAtoms />
			<CssVarsProvider theme={theme} disableTransitionOnChange>
				<CssBaseline />
				<SpeedInsights />
				<QueryClientProvider client={queryClient}>
					<AppRoutes />
				</QueryClientProvider>
				<ToastContainer />
			</CssVarsProvider>
		</Provider>
	);
}

export default App;
