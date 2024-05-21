import useAuth from '@hooks/useAuth';
import { createContext } from 'react';

interface AuthContextProps {
	loading: boolean;
	user: User | null;
	isAuth: boolean;
	handleLogin: (userData: { email: string; password: string }) => void;
	handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
	handleLogin: () => {},
	handleLogout: () => {},
	isAuth: false,
	loading: false,
	user: null,
});

const AuthProvider = ({ children }: any) => {
	const { loading, user, isAuth, handleLogin, handleLogout } = useAuth();
	return <AuthContext.Provider value={{ loading, user, isAuth, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
