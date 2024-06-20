import { useEffect, useState } from "react";

import {
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

import { ActionsIcon } from "@components/icons";
import { DataLabelDisplay } from "@components/data-label-display";
import { PageHeader } from "@components/page-header";
import PageWrapper from "@components/page-wrapper";
import { PlaceDateDisplay } from "@components/place-date-display";

import { useNavigate } from "react-router-dom";
import type { Event } from "@models/event";
import api from "@services/api";
import { MoreVert } from "@mui/icons-material";

const EventsPage = () => {
	const navigate = useNavigate();

	const handleNewEvent = () => {
		navigate("/novo-evento");
	};

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

	return (
		<PageWrapper breadcrumbLabel="Eventos">
			<PageHeader
				title="Eventos"
				subtitle="29 de março de 2024"
				onAddButtonClick={() => handleNewEvent()}
			/>
			<Box component="ul" sx={{ m: 0, p: 0 }}>
				{events.map((event, index) => (
					<EventListItem key={`${event.id}-${index}`} {...event} />
				))}
			</Box>
		</PageWrapper>
	);
};
export default EventsPage;

function EventListItem(props: Event) {
	const file = `${import.meta.env.VITE_API_URL}/uploads/${props.banner}`;

	const handleViewClick = () => {
		console.log("handleViewClick");
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
			<Grid xs={1}>
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
			<Grid xs={3}>
				<DataLabelDisplay data={props.name} label={props.abstract} />
			</Grid>
			<Grid xs={2}>
				<DataLabelDisplay data={"0"} label="Inscritos" />
			</Grid>
			<Grid xs={2}>
				<DataLabelDisplay data={"0"} label="Compareceram" />
			</Grid>
			<Grid xs={3}>
				<PlaceDateDisplay date={`${props.dateStart}`} place={""} />
			</Grid>
			<Grid xs={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
						<MenuItem>Editar</MenuItem>
						<MenuItem onClick={handleViewClick}>
							Visualizar
						</MenuItem>
						<MenuItem>Deletar</MenuItem>
					</Menu>
				</Dropdown>
			</Grid>
		</Grid>
	);
}
