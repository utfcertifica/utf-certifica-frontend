import { PageHeader } from "@components/page-header";
import PageWrapper from "@components/page-wrapper";

import { NewCertficateForm } from "./new-certificate-form";

const NewCertificate = () => {
	return (
		<PageWrapper breadcrumbLabel="Adicionar Certificados">
			<PageHeader
				title="Adicionar Certificados"
				subtitle="29 de março de 2024"
				sx={{ borderBottom: "unset" }}
			/>
			<NewCertficateForm />
		</PageWrapper>
	);
};

export default NewCertificate;
