import type { GetEventByIdAPIResponse } from '@models/event';
import api from '@services/api';
import { UseBaseQueryOptions, useQuery } from '@tanstack/react-query';

interface GetEventByIdProps {
	eventId?: string;
}

export function useGetEventById(
	props: GetEventByIdProps,
	options?: Partial<UseBaseQueryOptions<GetEventByIdAPIResponse, any, GetEventByIdAPIResponse>>,
) {
	return useQuery<GetEventByIdAPIResponse>({
		queryKey: ['event-details', props.eventId],
		queryFn: () => getEventById({ eventId: props.eventId }),
		...options,
	});
}

async function getEventById({ eventId }: GetEventByIdProps): Promise<GetEventByIdAPIResponse> {
	const { data } = await api.get<GetEventByIdAPIResponse>(`/api/evento/${eventId}`);

	return data;
}
