import {useState} from "react";

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
	Typography
} from "@mui/joy";
import {Add, Check} from "@mui/icons-material";
import PageWrapper from "@components/page-wrapper.tsx";
import {DataLabelDisplay} from "@components/data-label-display.tsx";
import {ActionsIcon, DownloadIcon} from "@components/icons";
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

const CreateEventsPage = () => {

	return (
		<PageWrapper breadcrumbLabel="Criar Evento">
			<Box
				sx={{
					py: 2,
					display: 'grid',
					gap: 2,
					alignItems: 'center',
					flexWrap: 'wrap',
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
						<Add/>
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
			{/*<Box>
				<Button variant="solid" onClick={handleNext}>
					Próximo passo
				</Button>
			</Box>*/}
		</PageWrapper>
	);
};

export default CreateEventsPage;

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
					<DownloadIcon/>
				</IconButton>
			</Stack>
			<Grid xs={2}>

			</Grid>
			<Grid xs={2}>

			</Grid>
			<Grid
				xs={2}
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					gap: "0.5rem",
				}}
			>

			</Grid>
		</Grid>
	);

	function CreateEventPageHeader() {

		const steps = [
			{
				title: 'Cadastro',
				indicator: '1',
				content: (
					<Box
						sx={{
							py: 2,
							display: 'grid',
							gap: 2,
							alignItems: 'center',
							flexWrap: 'wrap',
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
								<Add/>
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
				title: 'Certificado',
				indicator: '2',
				content: (
					<Box>
						<Typography>Gerar Certificado?</Typography>
						<Stack direction="row" alignItems="center" mt={2}>
							<Typography>Sim</Typography>
							<Button variant="outlined" sx={{ml: 2}}>
								{/* Checkbox icon */}
							</Button>
						</Stack>
					</Box>
				),
			},
			{
				title: 'Participantes',
				indicator: '3',
				content: (
					<Box
						sx={{
							py: 2,
							display: 'grid',
							gap: 2,
							alignItems: 'center',
							flexWrap: 'wrap',
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
								<Add/>
							</IconButton>

						</Stack>

						<Box component="ul" sx={{m: 0, p: 0}}>
							{participantsMock.map((participant) => (
								<ParticipantListItem
									key={participant.participantId}
									{...participant}
								/>

							))}
						</Box>


					</Box>
				),
			}
		];

		const [activeStep, setActiveStep] = useState(0);

		const handleNext = () => {

		};

		const handleBack = () => {
			setActiveStep(prevActiveStep => prevActiveStep - 1);
		};
		return (
			<Box component="header"
				 sx={{
					 display: "flex",
					 justifyContent: "space-between",
					 alignItems: "center",
					 pb: "2rem",
					 borderBottom: "1px solid rgba(136, 136, 136, 1)",
				 }}
			>

				<Grid container sx={{width: '100%'}}>
					<Grid xs={12}>
						<Box>
							<Typography
								fontSize={40}
								fontWeight="600"
								lineHeight={2}
								textColor="rgba(38, 42, 65, 1)"
							>
								Cadastro de Evento
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
					</Grid>
					<Grid xs={12}>
						<Stepper sx={{width: '100%'}}>
							{steps.map((step, index) => (
								<Step
									orientation="vertical"
									active={activeStep === index}
									indicator={
										<StepIndicator
											variant={activeStep <= index ? 'soft' : 'solid'}
											color={activeStep < index ? 'neutral' : 'primary'}
										>
											{activeStep <= index ? index + 1 : <Check/>}
										</StepIndicator>
									}
								>
									{step.title}
								</Step>
							))}
						</Stepper>
					</Grid>
				</Grid>
			</Box>);
	}
}
