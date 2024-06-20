import { Box, Card, CardCover, Dropdown, Grid, IconButton, Menu, MenuButton, MenuItem } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { DataLabelDisplay } from '@components/data-label-display';
import { ActionsIcon } from '@components/icons';
import { PageHeader } from '@components/page-header';
import PageWrapper from '@components/page-wrapper';
import { PlaceDateDisplay } from '@components/place-date-display';

import type { Event, GetEventsAPIResponse } from '@models/event';
import { MoreVert } from '@mui/icons-material';
import api from '@services/api';

const EventsPage = () => {
	const navigate = useNavigate();

	async function getEvents() {
		const { data } = await api.get<GetEventsAPIResponse>('/api/evento/findAll');
		return data;
	}

	const { data } = useQuery<GetEventsAPIResponse>({ queryKey: ['events'], queryFn: getEvents });

	const handleNewEvent = () => {
		navigate('/novo-evento');
	};

	const handleViewEvent = (eventId?: string) => {
		if (!eventId) {
			return;
		}

		navigate(`${eventId}/visualizar-evento`);
	};

	return (
		<PageWrapper breadcrumbLabel='Eventos'>
			<PageHeader title='Eventos' subtitle='29 de março de 2024' onAddButtonClick={() => handleNewEvent()} />
			<Box component='ul' sx={{ m: 0, p: 0 }}>
				{data?.map((event) => (
					<EventListItem key={event.id} handleViewEvent={handleViewEvent} event={event} />
				))}
			</Box>
		</PageWrapper>
	);
};
export default EventsPage;

interface EventListItemProps {
	handleViewEvent: (eventId?: string) => void;
	event: Event;
}

function EventListItem({ handleViewEvent, event }: EventListItemProps) {
	const file = `${import.meta.env.VITE_API_URL}/uploads/${event.banner}`;

	return (
		<Grid
			component='li'
			container
			spacing={1}
			sx={{
				p: '1rem 0',
				'&:not(:last-child)': {
					borderBottom: '0.5px solid rgba(0, 0, 0, 0.3)',
				},
			}}
		>
			<Grid xs={1}>
				<Card
					component='li'
					sx={{
						width: '5.375rem',
						height: '4.375rem',
						flexGrow: 1,
						border: 'none',
					}}
				>
					<CardCover>
						<img src={file} srcSet={file} loading='lazy' alt='' />
					</CardCover>
				</Card>
			</Grid>
			<Grid xs={3}>
				<DataLabelDisplay data={event.name} label={event.abstract} />
			</Grid>
			<Grid xs={2}>
				<DataLabelDisplay data={'0'} label='Inscritos' />
			</Grid>
			<Grid xs={2}>
				<DataLabelDisplay data={'0'} label='Compareceram' />
			</Grid>
			<Grid xs={3}>
				<PlaceDateDisplay date={`${event.dateStart}`} place={''} />
			</Grid>
			<Grid xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', height: 'min-content' }}>
				<Dropdown>
					<MenuButton
						slots={{ root: IconButton }}
						slotProps={{
							root: { variant: 'plain', color: 'neutral' },
						}}
					>
						<MoreVert />
					</MenuButton>
					<Menu>
						<MenuItem>Editar</MenuItem>
						<MenuItem onClick={() => handleViewEvent(event.id)}>Visualizar</MenuItem>
						<MenuItem>Deletar</MenuItem>
					</Menu>
				</Dropdown>
			</Grid>
		</Grid>
	);
}
