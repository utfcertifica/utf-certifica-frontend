import { useNavigate } from "react-router-dom";

import { Box, Grid, IconButton } from "@mui/joy";

import { ActionsIcon, DownloadIcon } from "@components/icons";
import { DataLabelDisplay } from "@components/data-label-display";
import PageWrapper from "@components/page-wrapper";
import { PlaceDateDisplay } from "@components/place-date-display";
import { PageHeader } from "@components/page-header";
import { useEffect, useState } from "react";
import api from "@services/api";

type CertificatesMock = {
	certificateId: string;
	talkName: string;
	speakersName: string;
	qntHours: string;
	date: string;
	place: string;
};

const CertificatesPage = () => {
	const [certificatesMock, setCertificatesMock] = useState<CertificatesMock[]>([]);
	const navigate = useNavigate();

	function handleAddCertificate() {
		navigate("/novo-certificado");
	}

	useEffect(() => {
		const fetchCertificates = async () => {
			try {
				const resp = await api.get('/api/certificado/findAll');

				setCertificatesMock(resp.data)
			} catch(error) {
				console.log('error', error)
			}
		};

		fetchCertificates()
	}, []);

	return (
		<PageWrapper breadcrumbLabel="Certificados">
			<PageHeader
				title="Certificados"
				subtitle="29 de março de 2024"
				onAddButtonClick={handleAddCertificate}
			/>
			<Box component="ul" sx={{ m: 0, p: 0 }}>
				{certificatesMock.map((certificate) => (
					<CertificateListItem
						key={certificate.certificateId}
						{...certificate}
					/>
				))}
			</Box>
		</PageWrapper>
	);
};
export default CertificatesPage;

function CertificateListItem(props: CertificatesMock) {
	return (
		<Grid
			component="li"
			container
			spacing={1}
			sx={{
				p: "1rem 0",
				"&:not(:last-child)": {
					borderBottom: "0.5px solid rgba(0, 0, 0, 0.3)",
				},
			}}
		>
			<Grid xs={4}>
				<DataLabelDisplay
					data={props.talkName}
					label={props.speakersName}
				/>
			</Grid>
			<Grid xs={2}>
				<DataLabelDisplay data={props.qntHours} label="Qtd horas" />
			</Grid>
			<Grid xs={4}>
				<PlaceDateDisplay date={props.date} place={props.place} />
			</Grid>
			<Grid
				xs={2}
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					gap: "0.5rem",
				}}
			>
				<IconButton
					variant="plain"
					sx={{
						width: "1rem",
						height: "1rem",
						"&:hover": {
							backgroundColor: "rgba(0, 0, 0, 0.1)",
						},
					}}
				>
					<DownloadIcon />
				</IconButton>
				<IconButton
					variant="plain"
					sx={{
						width: "1rem",
						height: "1rem",
						"&:hover": {
							backgroundColor: "rgba(0, 0, 0, 0.1)",
						},
					}}
				>
					<ActionsIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
}
