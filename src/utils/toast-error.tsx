import { toast } from "react-toastify";
const toastError = (err: any) => {
	const errorMsg = err.response?.data?.error;
	if (errorMsg) {
		toast.error(errorMsg, {
			toastId: errorMsg,
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
		return;
	}
	if (typeof err === "string") {
		toast.error(err);
	} else {
		toast.error("An error occurred!");
	}
};

export default toastError;
