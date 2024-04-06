import './App.css';
import { CssVarsProvider } from '@mui/joy/styles';
import AppRoutes from './routes/routes';
import { ToastContainer } from 'react-toastify';

import moment from 'moment';
import 'moment/dist/locale/pt-br';
moment.locale('pt-br');

import 'react-toastify/dist/ReactToastify.css';
import { Provider, createStore } from 'jotai';
import { useAtomsDebugValue } from 'jotai-devtools';

const myStore = createStore();

const DebugAtoms = () => {
	useAtomsDebugValue();
	return null;
};

function App() {
	return (
		<Provider store={myStore}>
			{/* <DebugAtoms /> */}
			<CssVarsProvider disableTransitionOnChange>
				<AppRoutes />
				<ToastContainer />
			</CssVarsProvider>
		</Provider>
	);
}

export default App;
