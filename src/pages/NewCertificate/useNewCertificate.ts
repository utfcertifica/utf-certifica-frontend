import { useState, type ChangeEvent } from "react";

const initialFormValues = {
	eventName: "",
	eventDate: "",
	startDate: "",
	endDate: "",
	workloud: "",
};

export const useNewCertificate = () => {
	const [fields, setFields] = useState(initialFormValues);

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFields((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	return {
		fields,
		handleInputChange,
	};
};
