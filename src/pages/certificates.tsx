import { useNavigate } from "react-router-dom";
import {
	Avatar,
	Box,
	Card,
	CardCover,
	Dropdown,
	Grid,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
} from "@mui/joy";
import { ActionsIcon, DownloadIcon } from "@components/icons";
import { DataLabelDisplay } from "@components/data-label-display";
import PageWrapper from "@components/page-wrapper";
import { PlaceDateDisplay } from "@components/place-date-display";
import { PageHeader } from "@components/page-header";
import { useEffect, useState } from "react";
import api from "@services/api";
import type { Certificate } from "@models/certificate";
import { MoreVert } from "@mui/icons-material";
import { toast } from "react-toastify";

const CertificatesPage = () => {
	const [certificates, setCertificates] = useState<Certificate[]>([]);
	const navigate = useNavigate();

	// Função para buscar certificados
	const fetchCertificates = async () => {
		try {
			const resp = await api.get("/api/certificado/findAll");
			console.log("certificados", resp.data);
			setCertificates(resp.data);
		} catch (error) {
			console.log("error", error);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchCertificates();
	}, []);

	// Função para adicionar um certificado
	function handleAddCertificate() {
		navigate("/novo-certificado");
	}

	// Função para deletar um certificado
	const handleDeleteCertificate = async (id: string) => {
		try {
			await api.delete(`/api/certificado/${id}`);
			toast.success("Certificado deletado com sucesso");
			// Após a deleção, atualiza a lista de certificados
			fetchCertificates();
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<PageWrapper breadcrumbLabel="Certificados">
			<PageHeader
				title="Certificados"
				subtitle="29 de março de 2024"
				onAddButtonClick={handleAddCertificate}
			/>
			<Box component="ul" sx={{ m: 0, p: 0 }}>
				{certificates.map((certificate) => (
					<CertificateListItem
						key={certificate.id}
						{...certificate}
						onDelete={handleDeleteCertificate}
					/>
				))}
			</Box>
		</PageWrapper>
	);
};

export default CertificatesPage;

function CertificateListItem(
	props: Certificate & { onDelete: (id: string) => void }
) {
	const navigate = useNavigate();
	const fileCertificado = `https://utf-certifica-backend.onrender.com${props.fileCertificado}`;

	const handleEditClick = () => {
		navigate(`/certificado/editar/${props.id}`);
	};

	const handleViewClick = () => {
		navigate(`/certificado/visualizar/${props.id}`);
	};

	const handleDownloadClick = () => {
		window.open(fileCertificado, "_blank");
	};

	const handleDeleteClick = () => {
		props.onDelete(`${props.id}`);
	};

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
			<Grid xs={12} sm={1}>
				<Card
					component="li"
					sx={{ width: "5.375rem", height: "4.375rem", flexGrow: 1 }}
				>
					<CardCover>
						<img
							src={fileCertificado}
							srcSet={fileCertificado}
							loading="lazy"
							alt=""
						/>
					</CardCover>
				</Card>
			</Grid>
			<Grid xs={12} sm={5}>
				<DataLabelDisplay
					data={props.nomeEvento}
					label={props.ministrante}
				/>
			</Grid>
			<Grid xs={12} sm={2}>
				<DataLabelDisplay
					data="Qtd horas"
					label={props.nrCargaHoraria}
				/>
			</Grid>
			<Grid xs={12} sm={2}>
				<PlaceDateDisplay date={props.dataEvento} place="" />
			</Grid>
			<Grid
				xs={12}
				sm={2}
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					gap: "0.5rem",
				}}
			>
				<Dropdown>
					<MenuButton
						slots={{ root: IconButton }}
						slotProps={{
							root: { variant: "plain", color: "neutral" },
						}}
					>
						<MoreVert />
					</MenuButton>
					<Menu>
						<MenuItem onClick={handleEditClick}>Editar</MenuItem>
						<MenuItem onClick={handleViewClick}>
							Visualizar
						</MenuItem>
						<MenuItem onClick={handleDownloadClick}>
							Download
						</MenuItem>
						<MenuItem onClick={handleDeleteClick}>Deletar</MenuItem>
					</Menu>
				</Dropdown>
			</Grid>
		</Grid>
	);
}
