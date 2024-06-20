import { useEffect, useState } from "react";
import { DataLabelDisplay } from "@components/data-label-display";
import PageWrapper from "@components/page-wrapper";
import { useAuthContext } from "@context/auth";
import { MoreHoriz as MoreHorizIcon } from "@mui/icons-material";
import {
	Accordion,
	AccordionDetails,
	AccordionGroup,
	AccordionSummary,
	Box,
	Button,
	Card,
	CardCover,
	Grid,
	IconButton,
	Typography,
	accordionDetailsClasses,
	accordionSummaryClasses,
} from "@mui/joy";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image2 from "../assets/flor.png";
import Image1 from "../assets/mala.png";
import api from "@services/api";
import type { Event } from "@models/event";
import type { Certificate } from "@models/certificate";

const DashboardPage = () => {
	const currentDate = new Date();
	const formattedDate = format(currentDate, "dd 'de' MMMM 'de' yyyy", {
		locale: ptBR,
	});

	const [events, setEvents] = useState<Event[]>([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await api.get("/api/evento/findAll");
				console.log(response.data);
				setEvents(response.data);
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		};

		fetchEvents();
	}, []);

	const [certificates, setCertificates] = useState<Certificate[]>([]);

	useEffect(() => {
		const fetchCertificates = async () => {
			try {
				const response = await api.get("/api/certificado/findAll");
				console.log(response.data);
				setCertificates(response.data);
			} catch (error) {
				console.error("Error fetching certificates:", error);
			}
		};

		fetchCertificates();
	}, []);

	return (
		<PageWrapper breadcrumbLabel="Visão inicial">
			<Grid container>
				<Grid xs={8}>
					<Box sx={{ pb: "2rem" }}>
						<Typography
							fontSize={40}
							fontWeight="600"
							lineHeight={2}
							textColor="rgba(38, 42, 65, 1)"
						>
							Dashboard
						</Typography>
						<Typography
							fontSize={16}
							fontWeight="400"
							lineHeight={1.5}
							textColor="rgba(10, 10, 10, 0.5)"
						>
							{formattedDate}
						</Typography>
					</Box>
					<Box
						sx={{
							pb: "1rem",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography
							fontSize={24}
							fontWeight="600"
							lineHeight={2}
							textColor="rgba(38, 42, 65, 1)"
						>
							Próximos Eventos
						</Typography>
						<IconButton>
							<MoreHorizIcon />
						</IconButton>
					</Box>
					<EventList events={events} />
					<Box
						sx={{
							pb: "2rem",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography
							fontSize={24}
							fontWeight="600"
							lineHeight={5}
							textColor="rgba(38, 42, 65, 1)"
						>
							Meus Certificados
						</Typography>
						<IconButton>
							<MoreHorizIcon />
						</IconButton>
					</Box>
					<CertificateList certificates={certificates} />
				</Grid>
				<Grid xs={4}>
					<Box
						sx={{
							backgroundColor: "#F9FAFC",
							minHeight: "80vh",
							padding: "15px",
							position: "relative",
						}}
					>
						<FAQsAndSupport />
					</Box>
				</Grid>
			</Grid>
		</PageWrapper>
	);
};
export default DashboardPage;

type EventListProps = {
	events: Event[];
};

function EventList({ events }: EventListProps) {
	return (
		<Box sx={{ width: "90%" }}>
			<Box component="ul" sx={{ m: 0, p: 0 }}>
				{events.map((event) => (
					<EventListItem key={event.id} {...event} />
				))}
			</Box>
		</Box>
	);
}

function CertificateList({ certificates }: { certificates: Certificate[] }) {
	return (
		<Box sx={{ width: "90%" }}>
			<Box component="ul" sx={{ m: 0, p: 0 }}>
				{certificates.map((certificate) => (
					<CertificateListItem
						key={certificate.id}
						{...certificate}
					/>
				))}
			</Box>
		</Box>
	);
}

function CertificateListItem(props: Certificate) {

	const file = `${import.meta.env.VITE_API_URL}${props.fileCertificado}`;

	return (
		<Grid
			component="li"
			container
			spacing={1}
			sx={{
				p: "0.5rem 0",
				borderBottom: "0.5px solid rgba(0, 0, 0, 0.3)",
			}}
		>
			{/* Adjust as per your UI design */}
			<Grid xs={2}>
				<Card
					component="li"
					sx={{ width: "5.375rem", height: "4.375rem", flexGrow: 1 }}
				>
					<CardCover>
						<img
							src={file}
							loading="lazy"
							alt=""
						/>
					</CardCover>
				</Card>
			</Grid>
			<Grid xs={5}>
				<DataLabelDisplay
					data={props.nomeEvento}
					label={props.ministrante}
				/>
			</Grid>
			<Grid xs={5}>
				<Typography
					fontSize={17}
					fontWeight="400"
					lineHeight={2.5}
					textColor="black"
				>
					{props.dataEvento}
				</Typography>
			</Grid>
		</Grid>
	);
}

function EventListItem(props: Event) {
	const { user } = useAuthContext();

	const file = `${import.meta.env.VITE_API_URL}/uploads/${props.banner}`;

	return (
		<Grid
			component="li"
			container
			spacing={1}
			sx={{
				p: "0.5rem 0",
				borderBottom: "0.5px solid rgba(0, 0, 0, 0.3)",
			}}
		>
			<Grid xs={2}>
				<Card
					component="li"
					sx={{
						width: "5.375rem",
						height: "4.375rem",
						flexGrow: 1,
						border: "none",
					}}
				>
					<CardCover>
						<img src={file} srcSet={file} loading="lazy" alt="" />
					</CardCover>
				</Card>
			</Grid>
			<Grid xs={5}>
				<DataLabelDisplay data={props.name} label={props.abstract} />
			</Grid>
			<Grid xs={5}>
				<Typography
					fontSize={17}
					fontWeight="400"
					lineHeight={2.5}
					textColor="black"
				>
					{props.dateStart}
				</Typography>
			</Grid>
		</Grid>
	);
}

function FAQsAndSupport() {
	return (
		<Box sx={{ p: "1rem", color: "black", textAlign: "center" }}>
			<Typography
				fontSize={24}
				fontWeight="600"
				lineHeight={2}
				textColor="black"
			>
				Dúvidas Frequentes
			</Typography>

			<AccordionGroup
				transition="0.2s"
				sx={{
					padding: 2,
					maxWidth: 400,
					borderRadius: "lg",
					bgcolor: "white",
					zIndex: 1,
					[`& .${accordionSummaryClasses.button}`]: {
						color: "black",
					},
					[`& .${accordionDetailsClasses.content}`]: {
						boxShadow: (theme) =>
							`inset 0 1px ${theme.vars.palette.divider}`,
						[`&.${accordionDetailsClasses.expanded}`]: {
							bgcolor: "white",
							color: "black",
							paddingBlock: "0.75rem",
							zIndex: 1,
							textAlign: "justify",
						},
					},
				}}
			>
				<Accordion defaultExpanded>
					<AccordionSummary>First accordion</AccordionSummary>
					<AccordionDetails variant="soft">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua.
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary>Second accordion</AccordionSummary>
					<AccordionDetails variant="soft">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua.
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary>Third accordion</AccordionSummary>
					<AccordionDetails variant="soft">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua.
					</AccordionDetails>
				</Accordion>
			</AccordionGroup>
			<Box
				sx={{
					position: "absolute",
					bottom: "1rem",
					right: "1rem",
					textAlign: "center",
					paddingtop: "1rem",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						gap: "15px",
					}}
				>
					<img
						src={Image1}
						alt="asdasd"
						style={{ marginRight: "25px" }}
					/>
					<img
						src={Image2}
						alt="ateassd"
						style={{ marginLeft: "15px" }}
					/>
				</Box>
				<Typography
					fontSize={24}
					fontWeight="400"
					lineHeight={2}
					textColor="rgba(38, 42, 65, 1)"
				>
					Precisa de ajuda?
				</Typography>
				<Typography
					fontSize={16}
					fontWeight="400"
					lineHeight={1}
					textColor="rgba(10, 10, 10, 0.5)"
					padding="1rem"
				>
					Eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut
					enim ad minim.
				</Typography>
				<Button
					variant="solid"
					sx={{
						backgroundColor: "black",
						mt: "1rem",
						fontSize: "1.5rem",
						padding: "0.5rem 5rem",
					}}
				>
					Suporte
				</Button>
			</Box>
		</Box>
	);
}
