import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, Typography } from "@mui/joy";
import PageWrapper from "@components/page-wrapper";
import { PageHeader } from "@components/page-header";
import type { Certificate } from "@models/certificate";
import api from "@services/api";

const CertificatePage = () => {
	const { id } = useParams<{ id: string }>();
	const [certificate, setCertificate] = useState<Certificate | null>(null);

	useEffect(() => {
		const fetchCertificate = async () => {
			try {
				const response = await api.get(`/api/certificado/${id}`);
				setCertificate(response.data);
			} catch (error) {
				console.error("Error fetching the certificate:", error);
			}
		};

		fetchCertificate();
	}, [id]);

	const handleDownload = () => {
		window.open(fileCertificado, "_blank");
	};

	if (!certificate) {
		return <div>Loading...</div>;
	}

	const fileCertificado = `${import.meta.env.VITE_API_URL}${
		certificate.fileCertificado
	}`;

	return (
		<PageWrapper breadcrumbLabel="Visualização de Certificado">
			<PageHeader
				title="Visualização de Certificado"
				subtitle={certificate.dataEvento}
			/>
			<Box component="div" sx={{ m: 0, p: 0 }}>
				<Grid
					sx={{
						position: "relative",
						width: "100%",
						maxWidth: "800px",
						mx: "auto",
						my: 2,
						borderRadius: "md",
						overflow: "hidden",
						boxShadow: "none",
						border: "none",
						bgcolor: "white",
					}}
				>
					<Box sx={{ p: 3 }}>
						<img
							src={fileCertificado}
							alt="Certificado"
							style={{ width: "100%", height: "auto" }}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							gap: "16px",
							mt: 2,
						}}
					>
						<Button
							variant="solid"
							color="neutral"
							onClick={handleDownload}
						>
							Download
						</Button>
					</Box>
				</Grid>
			</Box>
		</PageWrapper>
	);
};

export default CertificatePage;
