import { useContext } from "react";

import { Avatar, Box, Grid, IconButton, Typography } from "@mui/joy";

import { ActionsIcon } from "@components/icons";
import { DataLabelDisplay } from "@components/data-label-display";
import { PageHeader } from "@components/page-header";
import PageWrapper from "@components/page-wrapper";
import { PlaceDateDisplay } from "@components/place-date-display";

import { useAuthContext } from "@context/auth";

import { getInitials } from "@utils/utils";

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

const EventsPage = () => {
	return (
		<PageWrapper breadcrumbLabel="Eventos">
			<PageHeader
				title="Eventos"
				subtitle="29 de março de 2024"
				onAddButtonClick={() => alert("TODO: Adicionar evento")}
			/>
			<Box component="ul" sx={{ m: 0, p: 0 }}>
				{eventsMock.map((event) => (
					<EventListItem key={event.eventId} {...event} />
				))}
			</Box>
		</PageWrapper>
	);
};
export default EventsPage;

function EventListItem(props: EventsMock) {
	const { user } = useAuthContext();

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
				<Avatar
					variant="outlined"
					src="https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2014/11/formacao_1600x1200-uma-mulher-virtuosa-e-feita-de-esforcos.jpg"
					sx={{ width: "4.375rem", height: "4.375rem" }}
				>
					{user?.urlImagemPerfil
						? user?.urlImagemPerfil
						: getInitials(user?.name)}
				</Avatar>
			</Grid>
			<Grid xs={3}>
				<DataLabelDisplay
					data={props.talkName}
					label={props.speakersName}
				/>
			</Grid>
			<Grid xs={2}>
				<DataLabelDisplay data={props.registered} label="Inscritos" />
			</Grid>
			<Grid xs={2}>
				<DataLabelDisplay data={props.attended} label="Compareceram" />
			</Grid>
			<Grid xs={3}>
				<PlaceDateDisplay date={props.date} place={props.place} />
			</Grid>
			<Grid xs={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
