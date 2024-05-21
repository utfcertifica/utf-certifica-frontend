import React from "react";
import { Navigate } from "react-router-dom";
import BackdropLoading from "@components/backdrop-loading";
import { useAuthContext } from "@context/auth";

type ProtectedProps = {
	children: React.ReactNode;
	location?: string;
};

const Protected = ({ children }: ProtectedProps) => {
	const { isAuth, loading } = useAuthContext();

	if (!isAuth) {
		return loading ? (
			<BackdropLoading />
		) : (
			<Navigate to={{ pathname: "/login" }} />
		);
	}

	return <>{children}</>;
};

export default Protected;
