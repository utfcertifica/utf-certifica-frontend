export type GetEventsAPIResponse = Event[];
export type GetEventByIdAPIResponse = Event;

export interface Event {
	id?: string;
	name?: string;
	dateStart?: number[];
	dateEnd?: number[];
	abstract?: string;
	nrUuidResponsavel?: string;
	informations?: string;
	banner?: string;
	dateEvents?: DateEvent[];
}

export interface DateEvent {
	ministrante: string;
	titulo: string;
	date: number[];
	startTime: string;
	endTime: string;
}
