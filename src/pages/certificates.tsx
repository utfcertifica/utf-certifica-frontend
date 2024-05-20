import { Box, Grid, IconButton } from "@mui/joy";

import { ActionsIcon, DownloadIcon } from "@components/icons";
import { DataLabelDisplay } from "@components/data-label-display";
import PageWrapper from "@components/page-wrapper";
import { PlaceDateDisplay } from "@components/place-date-display";
import { PageHeader } from "@components/page-header";

type CertificatesMock = {
	certificateId: string;
	talkName: string;
	speakersName: string;
	qntHours: string;
	date: string;
	place: string;
};

const certificatesMock: CertificatesMock[] = [
	{
		certificateId: "1",
		talkName: "Palestra sobre DevOps",
		speakersName: "Samantha Aresta",
		qntHours: "15",
		date: "29/03/2024 às 22:00",
		place: "Auditório da DIRPPG - G10",
	},
	{
		certificateId: "2",
		talkName: "Palestra sobre Saúde Mental",
		speakersName: "Aresta Samantha",
		qntHours: "4",
		date: "22/04/2024 às 19:00",
		place: "Mini Auditório",
	},
];

const CertificatesPage = () => {
	return (
		<PageWrapper breadcrumbLabel="Certificados">
			<PageHeader
				title="Certificados"
				subtitle="29 de março de 2024"
				onAddButtonClick={() => alert("TODO: Adicionar certificado")}
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
