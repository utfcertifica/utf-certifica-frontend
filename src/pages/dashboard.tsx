import React, { useContext } from "react";
import {
	Avatar,
	Box,
	Grid,
	IconButton,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
	AccordionGroup,
	accordionSummaryClasses,
	accordionDetailsClasses,
} from "@mui/joy";
import { CrossIcon, ActionsIcon } from "@components/icons";
import { DataLabelDisplay } from "@components/data-label-display";
import PageWrapper from "@components/page-wrapper";
import { PlaceDateDisplay } from "@components/place-date-display";
import { AuthContext } from "@context/auth";
import { getInitials } from "@utils/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image1 from "../assets/mala.png";
import Image2 from "../assets/flor.png";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type EventsMock = {
	eventId: string;
	talkName: string;
	speakersName: string;
	registered: string;
	attended: string;
	date: string;
	place: string;
};

const eventsMock: EventsMock[] = [
	{
		eventId: "1",
		talkName: "Palestra sobre DevOps",
		speakersName: "Samantha Aresta",
		registered: "50",
		attended: "35",
		date: "29/03/2024 às 22:00",
		place: "Auditório da DIRPPG - G10",
	},
	{
		eventId: "2",
		talkName: "Palestra sobre Saúde Mental",
		speakersName: "Aresta Samantha",
		registered: "75",
		attended: "40",
		date: "22/04/2024 às 19:00",
		place: "Mini Auditório",
	},
];

const DashboardPage = () => {
	// Obtém a data atual
	const currentDate = new Date();
	const formattedDate = format(currentDate, "dd 'de' MMMM 'de' yyyy", {
		locale: ptBR,
	});

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
					<Box sx={{ pb: "1rem" }}>
						<Typography
							fontSize={24}
							fontWeight="600"
							lineHeight={2}
							textColor="rgba(38, 42, 65, 1)"
						>
							Próximos Eventos
						</Typography>
					</Box>
					<EventList />
					<Box sx={{ pb: "2rem" }}>
						<Typography
							fontSize={24}
							fontWeight="600"
							lineHeight={5}
							textColor="rgba(38, 42, 65, 1)"
						>
							Meus Certificados
						</Typography>
					</Box>
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

function EventList() {
	return (
		<Box sx={{ width: "90%" }}>
			<Box component="ul" sx={{ m: 0, p: 0 }}>
				{eventsMock.map((event) => (
					<EventListItem key={event.eventId} {...event} />
				))}
			</Box>
		</Box>
	);
}

function EventListItem(props: EventsMock) {
	const { user } = useContext(AuthContext);

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
				<Avatar
					src="https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2014/11/formacao_1600x1200-uma-mulher-virtuosa-e-feita-de-esforcos.jpg"
					sx={{ width: "3.5rem", height: "3.5rem" }}
				>
					{user?.urlImagemPerfil ? null : getInitials(user?.name)}
				</Avatar>
			</Grid>
			<Grid xs={5}>
				<DataLabelDisplay
					data={props.talkName}
					label={props.speakersName}
				/>
			</Grid>
			<Grid xs={5}>
				<Typography
					fontSize={17}
					fontWeight="400"
					lineHeight={2.5}
					textColor="black"
				>
					{props.date}
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
						alt="Image 1"
						style={{ marginRight: "25px" }}
					/>
					<img
						src={Image2}
						alt="Image 2"
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
