import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
	const setUsers = useSetAtom(usersAtom);

	api.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("token");
			if (token) {
				config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
				setIsAuth(true);
			}
			return config;
		},
		(error) => {
			Promise.reject(error);
		}
	);

	api.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			const originalRequest = error.config;
			if (error?.response?.status === 403 && !originalRequest._retry) {
				originalRequest._retry = true;

				const { data } = await api.post("/auth/refresh_token");
				if (data) {
					localStorage.setItem("token", JSON.stringify(data.token));
					api.defaults.headers.Authorization = `Bearer ${data.token}`;
				}
				return api(originalRequest);
			}
			if (error?.response?.status === 401) {
				localStorage.removeItem("token");
				api.defaults.headers.Authorization = "";
				setIsAuth(false);
			}
			return Promise.reject(error);
		}
	);

	useEffect(() => {
		const token = localStorage.getItem("token");
		(async () => {
			if (token) {
				try {
					const { data } = await api.post("/auth/refresh_token");
					api.defaults.headers.Authorization = `Bearer ${data.token}`;
					setIsAuth(true);
					setUser(data.user);
				} catch (err) {
					toastError(err);
				}
			}
			setLoading(false);
		})();
	}, []);

	const handleLogin = async (userData: any) => {
		setLoading(true);

		try {
			const { data } = await api.post("/auth/login", {
				email: userData.email.toLowerCase(),
				password: userData.password,
			});
			const {
				user: { id },
			} = data;

			localStorage.setItem("token", JSON.stringify(data.token));
			localStorage.setItem("userId", id);
			api.defaults.headers.Authorization = `Bearer ${data.token}`;
			setUser(data.user);
			setIsAuth(true);
			toast.success(i18n.t("auth.toasts.success"));

			navigate("/tickets");
			setLoading(false);

			//quebra linha
		} catch (err) {
			toastError(err);
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		setLoading(true);

		try {
			await api.delete("/auth/logout");
			setIsAuth(false);
			setUser(null);
			localStorage.removeItem("token");
			localStorage.removeItem("userId");
			api.defaults.headers.Authorization = "";
			setLoading(false);
			navigate("/login");
		} catch (err) {
			toastError(err);
			setLoading(false);
		}
	};

	const getCurrentUserInfo = async () => {
		try {
			const { data } = await api.get("/auth/me");
			return data;
		} catch (err) {
			toastError(err);
		}
	};

	const loadUsers = async () => {
		try {
			const { data } = await api.get<User[]>("/users/list");

			setUsers(data);
		} catch (err) {
			toastError(err);
		}
	};

	return {
		isAuth,
		user,
		loading,
		handleLogin,
		handleLogout,
		getCurrentUserInfo,
		loadUsers,
	};
};

export default useAuth;
