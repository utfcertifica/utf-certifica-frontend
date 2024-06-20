import { Box, Button, Grid, Typography, useTheme } from "@mui/joy";
import { useParams } from "react-router-dom";

import { DataLabelDisplay } from "@components/data-label-display";
import { PageHeader } from "@components/page-header";
import PageWrapper from "@components/page-wrapper";
import { PlaceDateDisplay } from "@components/place-date-display";

import type { DateEvent, Event } from "@models/event";
import { useGetEventById } from "@services/api/Events/useGetEventById";
import { formatDateTemp } from "@utils/utils";

const ViewEvent = () => {
	const { eventId } = useParams();

	const theme = useTheme();
	const colors = theme.colorSchemes.light.palette.common;

	const { data } = useGetEventById({ eventId });

	const image = `${import.meta.env.VITE_API_URL}/uploads/${data?.banner}`;

	return (
		data && (
			<PageWrapper breadcrumbLabel="Detalhes do Evento">
				<PageHeader
					title="Detalhes do Evento"
					subtitle="29 de março de 2024"
					sx={{ borderBottom: 0 }}
				/>
				<Grid container>
					<Grid xs={12} marginBottom={"1.5rem"}>
						<img
							alt="Imagem de capa do evento"
							src={image}
							style={{
								width: "100%",
								height: "265px",
								borderRadius: "10px",
							}}
						/>
					</Grid>
					<Grid xs={12} marginBottom={"1.5rem"}>
						<EventDetails
							name={data?.name}
							dateStart={data?.dateStart}
							dateEnd={data?.dateEnd}
							abstract={data?.abstract}
						/>
					</Grid>
					<Grid xs={12} marginBottom={"40px"}>
						<Typography
							fontWeight="400"
							fontSize="22px"
							sx={{ color: colors["black-500"] }}
						>
							{data?.informations}
						</Typography>
					</Grid>
					{data?.dateEvents && (
						<Grid xs={12}>
							<EventList events={data.dateEvents} />
						</Grid>
					)}
					<Grid xs={12} sx={{ textAlign: "end", mt: "36px" }}>
						<Button sx={{ padding: "0.75rem 1.25rem" }}>
							Confirmar Inscrição
						</Button>
					</Grid>
				</Grid>
			</PageWrapper>
		)
	);
};

export default ViewEvent;

interface EventListProps {
	events: DateEvent[];
}

function EventList({ events }: EventListProps) {
	return events.map((event, index) => (
		<Grid
			key={`${event.date}-${index}`}
			component="li"
			container
			spacing={2.5}
		>
			<Grid xs={4}>
				<DataLabelDisplay
					data={event.titulo}
					label={event.ministrante}
				/>
			</Grid>
			<Grid xs={4}>
				<PlaceDateDisplay
					date={
						`${formatDateTemp(event.date)} às ${event.startTime}` ??
						""
					}
					place={"Auditório da DIRPPG - G10"}
				/>
			</Grid>
		</Grid>
	));
}

type EventDetailsProps = Pick<
	Event,
	"abstract" | "name" | "dateStart" | "dateEnd"
>;

function EventDetails({
	name,
	abstract,
	dateStart,
	dateEnd,
}: EventDetailsProps) {
	const theme = useTheme();
	const colors = theme.colorSchemes.light.palette.common;

	return (
		<Box
			sx={{
				backgroundColor: colors["gray-200"],
				borderRadius: "10px",
				padding: "20px 20px 18px 28px",
			}}
		>
			<Typography
				fontWeight="500"
				fontSize="22px"
				sx={{ color: colors["black-500"], pb: "12px" }}
			>
				{name}
			</Typography>
			<Typography
				fontWeight="500"
				fontSize="22px"
				sx={{ color: colors["purple-50"] }}
			>{`Evento ocorrerá do dia ${formatDateTemp(
				dateStart
			)} até ${formatDateTemp(dateEnd)}`}</Typography>
			<Typography
				fontWeight="500"
				fontSize="22px"
				sx={{ color: colors["purple-50"] }}
			>
				{abstract}
			</Typography>
		</Box>
	);
}
