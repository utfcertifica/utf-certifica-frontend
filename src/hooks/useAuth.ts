import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import api from "@services/api";
import toastError from "@utils/toast-error";
import { toast } from "react-toastify";
import { i18n } from "@translate/i18n";
import { useSetAtom } from "jotai";
import usersAtom from "@atoms/user";

const useAuth = () => {
	const navigate = useNavigate();
	const [isAuth, setIsAuth] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
			setIsAuth(true);
		}
		setLoading(false);
	}, []);

	api.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("token");
			if (token) {
				config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
			}
			return config;
		},
		(error) => Promise.reject(error)
	);

	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;

			if (error?.response?.status === 401) {
				localStorage.removeItem("token");
				api.defaults.headers.Authorization = "";
				setIsAuth(false);
				setUser(null);
				// console.log('olha aqui essa merda')
				navigate("/login");
			}
			return Promise.reject(error);
		}
	);

	const handleLogin = async (userData: any) => {
		setLoading(true);
		try {
			const authFormData = new FormData();
			authFormData.append("username", userData.email.toLowerCase());
			authFormData.append("password", userData.password);

			const { data } = await api.post("/api/auth/signIn", authFormData);

			localStorage.setItem("token", JSON.stringify(data.accessToken));
			api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;

			localStorage.setItem("username", JSON.stringify(data.name))
			localStorage.setItem("email", JSON.stringify(data.email))
			setUser(data);
			setIsAuth(true);
			toast.success(i18n.t("auth.toasts.success"));

			navigate("/");
		} catch (err) {
			toastError(err);
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		setLoading(true);
		try {
			await api.delete("/auth/logout");
			setIsAuth(false);
			setUser(null);
			console.log('olha aqui essa merda2')
			localStorage.removeItem("token");
			api.defaults.headers.Authorization = "";
			navigate("/login");
		} catch (err) {
			toastError(err);
		} finally {
			setLoading(false);
		}
	};

	return {
		isAuth,
		user,
		loading,
		handleLogin,
		handleLogout,
	};
};

export default useAuth;
