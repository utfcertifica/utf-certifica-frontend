import { useContext } from "react";

import { Avatar, Box, Grid, IconButton, Typography } from "@mui/joy";

import { CrossIcon, ActionsIcon } from "@components/icons";
import { DataLabelDisplay } from "@components/data-label-display";
import PageWrapper from "@components/page-wrapper";
import { PlaceDateDisplay } from "@components/place-date-display";

import { AuthContext } from "@context/auth";

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
			<EventPageHeader />
			<Box component="ul" sx={{ m: 0, p: 0 }}>
				{eventsMock.map((event) => (
					<EventListItem key={event.eventId} {...event} />
				))}
			</Box>
		</PageWrapper>
	);
};
export default EventsPage;

function EventPageHeader() {
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
					Eventos
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
			<IconButton
				variant="solid"
				sx={{
					width: "2.75rem",
					height: "2.75rem",
					backgroundColor: "rgba(67, 57, 242, 1)",
					borderRadius: "50%",
				}}
			>
				<CrossIcon />
			</IconButton>
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
					{user?.avatar ? null : getInitials(user?.name)}
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
