import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@services/api";
import toastError from "@utils/toast-error";
import { toast } from "react-toastify";
import { i18n } from "@translate/i18n";
import { useSetAtom } from "jotai";
import usersAtom from "@atoms/user";
import { AuthContext } from "@context/auth";

const useAuth = () => {
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);
	// const [isAuth, setIsAuth] = useState(false);
	// const [loading, setLoading] = useState(true);
	// const [user, setUser] = useState<User | null>(null);
	const setUsers = useSetAtom(usersAtom);

	api.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("token");
			if (token) {
				config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
				authContext.isAuth = true;
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
			//TODO - Backend ainda não implementado refresh-token
			// if (error?.response?.status === 403 && !originalRequest._retry) {
			// 	originalRequest._retry = true;

			// 	const { data } = await api.post("/auth/refresh_token");
			// 	if (data) {
			// 		localStorage.setItem("token", JSON.stringify(data.token));
			// 		api.defaults.headers.Authorization = `Bearer ${data.token}`;
			// 	}
			// 	return api(originalRequest);
			// }
			if (error?.response?.status === 401) {
				localStorage.removeItem("token");
				api.defaults.headers.Authorization = "";

				authContext.isAuth = false;
			}
			return Promise.reject(error);
		}
	);

	// TODO - Backend ainda não implementado refresh-token
	useEffect(() => {
		// const token = localStorage.getItem("token");
		// (async () => {
		// if (token) {
		// 	try {
		// 		const { data } = await api.post("/auth/refresh_token");
		// 		api.defaults.headers.Authorization = `Bearer ${data.token}`;
		// 		authContext.isAuth = true;
		// 		setUser(data.user);
		// 	} catch (err) {
		// 		toastError(err);
		// 	}
		// }
		authContext.loading = false;
		// authContext.loading = false;
		// })();
	}, []);

	const handleLogin = async (userData: any) => {
		authContext.loading = true;

		try {
			const authFormData = new FormData();
			authFormData.append("username", userData.email.toLowerCase());
			authFormData.append("password", userData.password);

			const { data } = await api.post("/api/auth/signIn", authFormData);

			console.log("autenticou será: ", data);

			localStorage.setItem("token", JSON.stringify(data.accessToken));
			api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;

			console.log("asdasd");
			authContext.user = data;
			authContext.isAuth = true;
			toast.success(i18n.t("auth.toasts.success"));

			console.log("asdasd", authContext.isAuth);

			navigate("/");
			authContext.loading = false;

			//quebra linha
		} catch (err) {
			toastError(err);
			authContext.loading = false;
		}
	};

	const handleLogout = async () => {
		authContext.loading = true;

		try {
			await api.delete("/auth/logout");
			authContext.isAuth = false;
			authContext.user = null;
			localStorage.removeItem("token");
			api.defaults.headers.Authorization = "";
			authContext.loading = false;
			navigate("/login");
		} catch (err) {
			toastError(err);
			authContext.loading = false;
		}
	};

	// const getCurrentUserInfo = async () => {
	// 	try {
	// 		const { data } = await api.get("/auth/me");
	// 		return data;
	// 	} catch (err) {
	// 		toastError(err);
	// 	}
	// };

	return {
		handleLogin,
		handleLogout,
	};
};

export default useAuth;
