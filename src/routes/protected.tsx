import BackdropLoading from "@components/backdrop-loading";
import { AuthContext } from "@context/auth";
import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
	location?: string;
};

const Protected = ({ children }: PropsWithChildren<ProtectedProps>) => {
	const { isAuth, loading } = useContext(AuthContext);

	if (!isAuth) {
		return loading ? (
			<BackdropLoading />
		) : (
			<Navigate to={{ pathname: "/login" }} />
		);
	}

	return children;
};

export default Protected;
