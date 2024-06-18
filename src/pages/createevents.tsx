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
	stepClasses,
	StepIndicator,
	stepIndicatorClasses,
	Stepper,
	Textarea,
	Typography,
	typographyClasses,
} from "@mui/joy";
import {
	Add,
	AppRegistrationRounded,
	Check,
	CheckRounded,
} from "@mui/icons-material";
import PageWrapper from "@components/page-wrapper.tsx";
import { DataLabelDisplay } from "@components/data-label-display.tsx";
import { DownloadIcon } from "@components/icons";
import { PageHeader } from "@components/page-header";

type Participant = {
	participantId: string;
	participantName: string;
	participantState: string;
	participantEmail: string;
};

type Schedule = {
	speaker: string;
	date: string;
	startTime: string;
	endTime: string;
};

function ParticipantListItem(props: Participant) {
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

function ScheduleListItem(props: Schedule) {
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
				<DataLabelDisplay data={props.speaker} label="Ministrante" />
				<DataLabelDisplay data={props.date} label="Data do evento" />
				<DataLabelDisplay data={props.startTime} label="Início" />
				<DataLabelDisplay data={props.endTime} label="Fim" />

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
	const [activeStep, setActiveStep] = useState(0);
	const [participants, setParticipants] = useState<Participant[]>([]);
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const [participantName, setParticipantName] = useState("");
	const [participantEmail, setParticipantEmail] = useState("");
	const [speaker, setSpeaker] = useState("");
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	const [filePreview, setFilePreview] = useState("");
	const [file, setFile] = useState(null);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setFile(file);
		const blob = URL.createObjectURL(file);

		if (blob) setFilePreview(blob);
	};

	const [filePreviewBanner, setFilePreviewBanner] = useState("");
	const [fileBanner, setFileBanner] = useState(null);

	const handleFileBannerChange = (event) => {
		const file = event.target.files[0];
		setFileBanner(file);
		const blob = URL.createObjectURL(file);

		if (blob) setFilePreviewBanner(blob);
	};

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
					<Box>
						<Box
							sx={{
								height: "200px",
								borderRadius: "1rem",
								backgroundColor: "lightgray",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								overflow: "hidden",
								position: "relative",
							}}
						>
							{filePreviewBanner ? (
								<img
									src={filePreviewBanner}
									alt="Pré-visualização"
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
									}}
								/>
							) : (
								<Input
									type="file"
									onChange={handleFileBannerChange}
									sx={{ display: "none" }}
									id="file-upload"
								/>
							)}
							{!filePreviewBanner && (
								<label htmlFor="file-upload">
									<Button
										component="span"
										sx={{
											paddingY: "0.75rem",
											borderRadius: "0.5rem",
											backgroundColor:
												"rgba(0, 0, 0, 0.75)",
											"&:hover": {
												backgroundColor:
													"rgba(0, 0, 0, 0.85)",
											},
											width: "100%",
											height: "100%",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										Upload
									</Button>
								</label>
							)}
						</Box>
					</Box>

					<FormControl>
						<FormLabel>Nome do Evento</FormLabel>
						<Input
							placeholder="Nome do Evento"
							size="sm"
							variant="outlined"
						/>
					</FormControl>

					<FormControl>
						<FormLabel>Resumo do Evento</FormLabel>
						<Input
							placeholder="Breve resumo sobre o evento"
							size="sm"
							variant="outlined"
						/>
					</FormControl>

					<FormControl>
						<FormLabel>Descrição</FormLabel>
						<Textarea
							placeholder="Descrição do evento"
							minRows={6}
							variant="outlined"
						/>
					</FormControl>
				</Box>
			),
		},
		{
			title: "Cronograma",
			indicator: "2",
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
					<Grid container spacing={2}>
						<Grid xs={12} sm={3}>
							<FormControl>
								<FormLabel>Ministrante</FormLabel>
								<Input
									placeholder="Exemplo"
									size="sm"
									variant="outlined"
									value={speaker}
									onChange={(e) => setSpeaker(e.target.value)}
								/>
							</FormControl>
						</Grid>
						<Grid xs={12} sm={3}>
							<FormControl>
								<FormLabel>Data do evento</FormLabel>
								<Input
									placeholder="Exemplo"
									size="sm"
									variant="outlined"
									value={date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</FormControl>
						</Grid>
						<Grid xs={12} sm={3}>
							<FormControl>
								<FormLabel>Horário de Início</FormLabel>
								<Input
									placeholder="Exemplo"
									size="sm"
									variant="outlined"
									value={startTime}
									onChange={(e) =>
										setStartTime(e.target.value)
									}
								/>
							</FormControl>
						</Grid>
						<Grid xs={12} sm={3}>
							<FormControl>
								<FormLabel>Horário de Encerramento</FormLabel>
								<Input
									placeholder="Exemplo"
									size="sm"
									variant="outlined"
									value={endTime}
									onChange={(e) => setEndTime(e.target.value)}
								/>
							</FormControl>
						</Grid>
						<Grid xs={12} sm={3}>
							<IconButton
								variant="solid"
								sx={{
									width: "2.75rem",
									height: "2.75rem",
									backgroundColor: `${colors["purple-50"]}`,
									borderRadius: "50%",
								}}
								onClick={() => {
									setSchedules([
										...schedules,
										{ speaker, date, startTime, endTime },
									]);
									setSpeaker("");
									setDate("");
									setStartTime("");
									setEndTime("");
								}}
							>
								<Add />
							</IconButton>
						</Grid>
					</Grid>

					<Box component="ul" sx={{ m: 0, p: 0 }}>
						{schedules.map((schedule, index) => (
							<ScheduleListItem key={`${index}`} {...schedule} />
						))}
					</Box>
				</Box>
			),
		},
		{
			title: "Certificado",
			indicator: "3",
			content: (
				<Box>
					<Box
						sx={{
							height: "500px",
							borderRadius: "1rem",
							backgroundColor: "lightgray",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							overflow: "hidden",
							position: "relative",
						}}
					>
						{filePreview ? (
							<img
								src={filePreview}
								alt="Pré-visualização"
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
						) : (
							<Input
								type="file"
								onChange={handleFileChange}
								sx={{ display: "none" }}
								id="file-upload"
							/>
						)}
						{!filePreview && (
							<label htmlFor="file-upload">
								<Button
									component="span"
									sx={{
										paddingY: "0.75rem",
										borderRadius: "0.5rem",
										backgroundColor: "rgba(0, 0, 0, 0.75)",
										"&:hover": {
											backgroundColor:
												"rgba(0, 0, 0, 0.85)",
										},
										width: "100%",
										height: "100%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									Upload
								</Button>
							</label>
						)}
					</Box>
				</Box>
			),
		},
		{
			title: "Participantes",
			indicator: "4",
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
								value={participantName}
								onChange={(e) =>
									setParticipantName(e.target.value)
								}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>E-mail para participar</FormLabel>
							<Input
								placeholder="E-mail"
								size="sm"
								variant="outlined"
								value={participantEmail}
								onChange={(e) =>
									setParticipantEmail(e.target.value)
								}
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
							onClick={() => {
								setParticipants([
									...participants,
									{
										participantId:
											participants.length.toString(),
										participantName,
										participantState: "Convite pendente",
										participantEmail,
									},
								]);
								setParticipantName("");
								setParticipantEmail("");
							}}
						>
							<Add />
						</IconButton>
					</Stack>

					<Box component="ul" sx={{ m: 0, p: 0 }}>
						{participants.map((participant) => (
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

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<PageWrapper breadcrumbLabel="Criar Evento">
			<PageHeader title="Criar Evento" />

			<Stepper
				sx={{
					paddingY: 3,
					"--Stepper-verticalGap": "2.5rem",
					"--StepIndicator-size": "2.5rem",
					"--Step-gap": "1rem",
					"--Step-connectorInset": "0.5rem",
					"--Step-connectorRadius": "1rem",
					"--Step-connectorThickness": "4px",
					"--joy-palette-success-solidBg":
						"var(--joy-palette-success-400)",
					color: "black",
					[`& .${stepClasses.completed}`]: {
						"&::after": { bgcolor: "success.solidBg" },
					},
					[`& .${stepClasses.active}`]: {
						[`& .${stepIndicatorClasses.root}`]: {
							border: "4px solid",
							borderColor: "#fff",
							boxShadow: (theme) =>
								`0 0 0 1px ${theme.vars.palette.primary[500]}`,
						},
					},
					[`& .${stepClasses.disabled} *`]: {},
					[`& .${typographyClasses["title-sm"]}`]: {
						textTransform: "uppercase",
						letterSpacing: "1px",
						fontSize: "10px",
						color: "black",
					},
				}}
			>
				{steps.map((step, index) => (
					<Step
						key={`${step.title}-${index}`}
						active={activeStep === index}
						completed={activeStep > index}
						indicator={
							activeStep === index ? (
								<StepIndicator variant="solid" color="primary">
									<AppRegistrationRounded />
								</StepIndicator>
							) : activeStep < index ? (
								<StepIndicator>{index + 1}</StepIndicator>
							) : (
								<StepIndicator variant="solid" color="success">
									<CheckRounded />
								</StepIndicator>
							)
						}
					>
						<div>
							<Typography level="title-sm">
								Passo {index + 1}
							</Typography>
							{step.title}
						</div>
					</Step>
				))}
			</Stepper>

			<Box sx={{ my: 2 }}>{steps[activeStep].content}</Box>

			<Stack
				direction="row"
				spacing={2}
				sx={{ mt: 2, justifyContent: "space-between" }}
			>
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
