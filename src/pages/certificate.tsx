import { useContext } from "react";
import {
	Avatar,
	Box,
	Button,
	Grid,
	Sheet,
	IconButton,
	Typography,
	useTheme,
} from "@mui/joy";

import { CrossIcon, ActionsIcon } from "@components/icons";
import { DataLabelDisplay } from "@components/data-label-display";
import PageWrapper from "@components/page-wrapper";
import { PlaceDateDisplay } from "@components/place-date-display";
import { AuthContext } from "@context/auth";
import { getInitials } from "@utils/utils";
import logo from "@assets/utfpr.png";

// Tipo para os dados do certificado
type Certificate = {
	certificateId: string;
	participantName: string;
	eventName: string;
	eventDate: string;
	creditHours: number;
	issueDate: string;
	location: string;
	issuer: string;
};

const certificatesMock: Certificate[] = [
	{
		certificateId: "cert-1",
		participantName: "Álvaro Eduardo Menegon Rosário",
		eventName: "Relatório teste",
		eventDate: "07/12/2023",
		creditHours: 4,
		issueDate: "29/03/2024",
		location: "Dois Vizinhos- PR",
		issuer: "Universidade Tecnológica Federal do Paraná",
	},
];

const CertificatePage = () => {
	return (
		<PageWrapper breadcrumbLabel="Visualização de Certificado">
			<CertificatePageHeader />
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
export default CertificatePage;

function CertificatePageHeader() {
	return (
		<Box
			component="header"
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				pb: "2rem",
				borderBottom: "1px solid rgba(136, 136, 136, 1)",
			}}
		>
			<Box>
				<Typography
					fontSize={40}
					fontWeight="600"
					lineHeight={2}
					textColor="rgba(38, 42, 65, 1)"
				>
					visualização de Certificado
				</Typography>
				<Typography
					fontSize={16}
					fontWeight="400"
					lineHeight={1.5}
					textColor="rgba(10, 10, 10, 0.5)"
				>
					29 de março de 2024
				</Typography>
			</Box>
		</Box>
	);
}

function CertificateListItem(props: Certificate) {
	const { user } = useContext(AuthContext);
	const theme = useTheme();
	// Simulação de uma função de download, você precisará implementar isso
	const handleDownload = () => {
		console.log("Downloading...");
		// Implemente a lógica de download aqui
	};

	// Simulação de uma função de compartilhamento, você precisará implementar isso
	const handleShare = () => {
		console.log("Sharing...");
		// Implemente a lógica de compartilhamento aqui
	};

	return (
		<Grid>
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
					bgcolor: "white", // Cor de fundo branco
					// Adicionar pseudo-elementos para os detalhes em azul
					"&::before, &::after, &::marker": {
						content: '""',
						position: "absolute",
						width: "calc(100% / 10)", // 1/10 do certificado
						height: "80px", // ajuste conforme necessário
						bgcolor: "#3498DB", // use a cor correta
					},
					"&::before": {
						// canto superior esquerdo
						left: 0,
						top: 0,
						borderBottomRightRadius: "200px", // Cria o efeito de 1/3 de círculo
					},
					"&::after": {
						// canto inferior direito
						right: 0,
						bottom: 0,
						borderTopLeftRadius: "200px", // Cria o efeito de 1/3 de círculo
					},
					"&::marker": {
						// canto superior direito
						right: 0,
						top: 0,
						borderBottomLeftRadius: "200px", // Cria o efeito de 1/4 de círculo
					},
				}}
			>
				{/* Canto superior direito */}
				<Box
					sx={{
						position: "absolute",
						right: 0,
						top: 0,
						width: "calc(100% / 10)",
						height: "80px",
						bgcolor: "#3498DB",
						borderBottomLeftRadius: "200px",
					}}
				/>
				<Box
					sx={{
						position: "absolute",
						left: 0,
						bottom: 0,
						width: "calc(100% / 10)",
						height: "80px",
						bgcolor: "#3498DB",
						borderTopRightRadius: "200px",
					}}
				/>
				{/* Círculo azul central */}
				<Box
					sx={{
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
						width: "200px", // Ajuste conforme necessário
						height: "200px", // Ajuste conforme necessário
						bgcolor: "#3498DB", // use a cor correta
						borderRadius: "50%",
						zIndex: 0, // Garante que o círculo fique atrás do conteúdo mas acima do fundo
						opacity: 0.6, // Ajuste a transparência para melhor visualização
					}}
				/>
				<Box sx={{ position: "absolute", top: 20, left: 50 }}>
					{/* Adicione aqui o componente da logo */}
					<img
						src={logo}
						alt="Logo da Universidade"
						style={{ height: "30px" }}
					/>
				</Box>
				<Box sx={{ position: "absolute", top: 0, right: 0, p: 1 }}>
					<Typography>{props.issuer}</Typography>
				</Box>

				{/* Header with blue background */}
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 2,
						py: 3,
						bgcolor: "primary",
						color: "white",
					}}
				>
					<Typography
						component="div"
						sx={{ mt: "80px", fontSize: "2rem" }}
					>
						Certificado
					</Typography>
					<Typography>{props.issueDate}</Typography>
				</Box>

				{/* Certificate Content */}
				<Box sx={{ p: 3 }}>
					<Typography textAlign="center">
						Certificamos que{" "}
						<strong>{props.participantName}</strong> participou do
						evento <strong>"{props.eventName}"</strong>, realizado
						no dia <strong>{props.eventDate}</strong>, com carga
						horária de <strong>{props.creditHours} horas</strong>.
					</Typography>
					<Typography
						sx={{ textAlign: "right", mt: 2, fontWeight: "bold" }}
					>
						{props.location}, {props.issueDate}
					</Typography>
					<Box
						sx={{
							textAlign: "center",
							borderTop: 1,
							borderColor: "neutral.outlinedBorder",
							pt: 2,
							mt: 2,
						}}
					>
						<Typography fontWeight="lg">
							{props.participantName}
						</Typography>
					</Box>
				</Box>

				{/* Action buttons */}
			</Grid>
			{/* Segundo Sheet para os botões de ação */}
			<Grid
				sx={{
					border: "none",
					bgcolor: "white", // Cor de fundo branco
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						gap: "16px",
					}}
				>
					<Button
						variant="solid"
						color="neutral"
						onClick={handleDownload}
					>
						Download
					</Button>
					<Button variant="solid" onClick={handleShare}>
						Compartilhar
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
}
