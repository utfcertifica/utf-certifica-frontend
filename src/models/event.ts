export interface Event {
	id?: string;
	name?: string;
	dateStart?: string;
	dateEnd?: string;
	abstract?: string;
	nrUuidResponsavel?: string;
	informations?: string;
	banner?: string;
	dateEvents?: DateEvent[];
}

export interface DateEvent {
	ministrante: string;
	titulo: string;
	date: string;
	startTime: string;
	endTime: string;
}
