import { useState } from "react";

import {
	Box,
	Button,
	colors,
	FormControl,
	FormLabel,
	Grid,
	IconButton,
	Input,
	Stack,
	Step,
	StepIndicator,
	Stepper,
	Textarea,
	Typography,
} from "@mui/joy";
import { Add, Check } from "@mui/icons-material";
import PageWrapper from "@components/page-wrapper.tsx";
import { DataLabelDisplay } from "@components/data-label-display.tsx";
import { ActionsIcon, DownloadIcon } from "@components/icons";
import { PageHeader } from "@components/page-header";
//import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

type ParticipantMock = {
	participantId: string;
	participantName: string;
	participantState: string;
	participantEmail: string;
};

const participantsMock: ParticipantMock[] = [
	{
		participantId: "1",
		participantName: "Edson Azevedo",
		participantState: "Presença confirmada",
		participantEmail: "edsonazevedo@alunos.utfpr.edu.br",
	},
	{
		participantId: "2",
		participantName: "Thiago Sobral",
		participantState: "Convite pendente",
		participantEmail: "tchaves@alunos.utfpr.edu.br",
	},
	{
		participantId: "3",
		participantName: "Leonardo",
		participantState: "Não irá participar",
		participantEmail: "leonardo@alunos.utfpr.edu.br",
	},
	{
		participantId: "4",
		participantName: "Yuri",
		participantState: "Presença confirmada",
		participantEmail: "yuri@alunos.utfpr.edu.br",
	},
];

function ParticipantListItem(props: ParticipantMock) {
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
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				spacing={2}
			>
				<DataLabelDisplay
					data={props.participantName}
					label={props.participantState}
				/>

				<DataLabelDisplay
					data={props.participantEmail}
					label="E-mail do participante"
				/>

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
					<DownloadIcon />
				</IconButton>
			</Stack>
		</Grid>
	);
}

const CreateEventsPage = () => {
	const steps = [
		{
			title: "Cadastro",
			indicator: "1",
			content: (
				<Box
					sx={{
						py: 2,
						display: "grid",
						gap: 2,
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					<FormControl>
						<FormLabel>Nome do Evento</FormLabel>
						<Input
							placeholder="Nome do Evento"
							size="sm"
							variant="outlined"
						/>
					</FormControl>

					<Stack
						direction="row"
						justifyContent="flex-start"
						alignItems="center"
						spacing={2}
					>
						<FormControl>
							<FormLabel>Data do evento</FormLabel>
							<Input
								placeholder="Exemplo"
								size="sm"
								variant="outlined"
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Horário de Início</FormLabel>
							<Input
								placeholder="Exemplo"
								size="sm"
								variant="outlined"
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Horário de Encerramento</FormLabel>
							<Input
								placeholder="Exemplo"
								size="sm"
								variant="outlined"
							/>
						</FormControl>
						{/*<DateTimePicker
						label="Data do Evento"
						//value={eventDate}
						//onChange={handleEventDateChange}
						//renderInput={(props) => <TextField {...props} />}
					/>

					<DateTimePicker
						label="Horário de Início"
						//value={startTime}
						//onChange={handleStartTimeChange}
						//renderInput={(props) => <TextField {...props} />}
					/>

					<DateTimePicker
						label="Horário de Encerramento"
						//value={endTime}
						//onChange={handleEndTimeChange}
						//renderInput={(props) => <Input {...props} />}
					/>*/}

						<IconButton
							variant="solid"
							sx={{
								width: "2.75rem",
								height: "2.75rem",
								backgroundColor: `${colors["purple-50"]}`,
								borderRadius: "50%",
							}}
						>
							<Add />
						</IconButton>
					</Stack>

					{/*<LocalizationProvider dateAdapter={AdapterDateFns}> {

			} </LocalizationProvider>*/}

					<FormControl>
						<FormLabel>Descrição</FormLabel>
						<Textarea
							placeholder="Descrição do evento"
							minRows={6}
							size="sm"
							variant="outlined"
							//value={eventDescription}
							//onChange={handleEventDescriptionChange}
						/>
					</FormControl>
				</Box>
			),
		},
		{
			title: "Certificado",
			indicator: "2",
			content: (
				<Box>
					<Typography>Gerar Certificado?</Typography>
					<Stack direction="row" alignItems="center" mt={2}>
						<Typography>Sim</Typography>
						<Button variant="outlined" sx={{ ml: 2 }}>
							{/* Checkbox icon */}
						</Button>
					</Stack>
				</Box>
			),
		},
		{
			title: "Participantes",
			indicator: "3",
			content: (
				<Box
					sx={{
						py: 2,
						display: "grid",
						gap: 2,
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					<Stack
						direction="row"
						justifyContent="flex-start"
						alignItems="center"
						spacing={2}
					>
						<FormControl>
							<FormLabel>Nome do participante</FormLabel>
							<Input
								placeholder="Nome completo"
								size="sm"
								variant="outlined"
							/>
						</FormControl>

						<FormControl>
							<FormLabel>E-mail para participar</FormLabel>
							<Input
								placeholder="E-mail"
								size="sm"
								variant="outlined"
							/>
						</FormControl>

						<IconButton
							variant="solid"
							sx={{
								width: "2.75rem",
								height: "2.75rem",
								backgroundColor: `${colors["purple-50"]}`,
								borderRadius: "50%",
							}}
						>
							<Add />
						</IconButton>
					</Stack>

					<Box component="ul" sx={{ m: 0, p: 0 }}>
						{participantsMock.map((participant) => (
							<ParticipantListItem
								key={participant.participantId}
								{...participant}
							/>
						))}
					</Box>
				</Box>
			),
		},
	];

	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<PageWrapper breadcrumbLabel="Criar Evento">
			<PageHeader title="Criar Evento" />

			<Stepper sx={{ width: "100%", paddingY: 3 }}>
				{steps.map((step, index) => (
					<Step
						orientation="vertical"
						active={activeStep === index}
						key={index}
						sx={{ color: "black" }}
						indicator={
							<StepIndicator
								variant={activeStep <= index ? "soft" : "solid"}
								color={
									activeStep < index ? "primary" : "success"
								}
							>
								{activeStep <= index ? index + 1 : <Check />}
							</StepIndicator>
						}
					>
						{step.title}
					</Step>
				))}
			</Stepper>

			<Box sx={{ my: 2 }}>{steps[activeStep].content}</Box>

			<Stack direction="row" spacing={2} sx={{ mt: 2 }}>
				<Button
					variant="outlined"
					color="primary"
					disabled={activeStep === 0}
					onClick={handleBack}
				>
					Passo anterior
				</Button>
				<Button
					variant="solid"
					color="primary"
					onClick={handleNext}
					disabled={activeStep === steps.length - 1}
				>
					Próximo passo
				</Button>
			</Stack>
		</PageWrapper>
	);
};

export default CreateEventsPage;
