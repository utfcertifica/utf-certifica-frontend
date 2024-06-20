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
	Camera,
	CheckRounded,
	Delete,
	Photo,
} from "@mui/icons-material";
import PageWrapper from "@components/page-wrapper.tsx";
import { DataLabelDisplay } from "@components/data-label-display.tsx";
import { PageHeader } from "@components/page-header";
import { toast } from "react-toastify";
import api from "@services/api";
import { useNavigate } from "react-router-dom";

type Schedule = {
	speaker: string;
	title: string;
	date: string;
	startTime: string;
	endTime: string;
};

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
				spacing={4}
				sx={{
					width: "100%",
				}}
			>
				<DataLabelDisplay data={props.speaker} label="Ministrante" />
				<DataLabelDisplay
					data={props.title}
					label="Título do curso ou palestra"
				/>
				<DataLabelDisplay data={props.date} label="Data do evento" />
				<DataLabelDisplay data={props.startTime} label="Início" />
				<DataLabelDisplay data={props.endTime} label="Fim" />

				<IconButton
					variant="plain"
					sx={{
						width: "1rem",
						height: "1rem",
					}}
				>
					<Delete sx={{ color: "#ff0000" }} />
				</IconButton>
			</Stack>
		</Grid>
	);
}

const CreateEventsPage = () => {
	const [activeStep, setActiveStep] = useState(0);

	/**
	 * inputs relacionados ao step de cadastro
	 */
	const [eventName, setEventName] = useState("");
	const [dateStart, setDateStart] = useState("");
	const [dateEnd, setDateEnd] = useState("");
	const [eventSummary, setEventSummary] = useState("");
	const [eventDescription, setEventDescription] = useState("");

	/**
	 * inputs relacionados ao step de cronograma
	 */
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const [speaker, setSpeaker] = useState("");
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	/**
	 * filePreview do certificado
	 */
	const [filePreview, setFilePreview] = useState("");
	const [file, setFile] = useState(null);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setFile(file);
		const blob = URL.createObjectURL(file);

		if (blob) setFilePreview(blob);
	};

	/**
	 * filePreview do banner
	 */
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
										<Photo /> &nbsp; Upload do banner do
										evento
									</Button>
								</label>
							)}
						</Box>
					</Box>

					<Grid container spacing={2}>
						<Grid xs={12} sm={8}>
							<FormControl>
								<FormLabel>Nome do Evento</FormLabel>
								<Input
									placeholder="Nome do Evento"
									size="sm"
									variant="outlined"
									value={eventName}
									onChange={(e) =>
										setEventName(e.target.value)
									}
								/>
							</FormControl>
						</Grid>
						<Grid xs={12} sm={2}>
							<FormControl>
								<FormLabel>Data inicial do evento</FormLabel>
								<Input
									type="date"
									placeholder="DD/MM/AAAA"
									fullWidth
									size="sm"
									variant="outlined"
									value={dateStart}
									onChange={(e) =>
										setDateStart(e.target.value)
									}
								/>
							</FormControl>
						</Grid>
						<Grid xs={12} sm={2}>
							<FormControl>
								<FormLabel>Data final do evento</FormLabel>
								<Input
									type="date"
									placeholder="DD/MM/AAAA"
									fullWidth
									size="sm"
									variant="outlined"
									value={dateEnd}
									onChange={(e) => setDateEnd(e.target.value)}
								/>
							</FormControl>
						</Grid>
						<Grid xs={12} sm={12}>
							<FormControl>
								<FormLabel>Resumo do Evento</FormLabel>
								<Input
									placeholder="Breve resumo sobre o evento"
									size="sm"
									variant="outlined"
									value={eventSummary}
									onChange={(e) =>
										setEventSummary(e.target.value)
									}
								/>
							</FormControl>
						</Grid>
					</Grid>

					<FormControl>
						<FormLabel>Descrição</FormLabel>
						<Textarea
							placeholder="Descrição do evento"
							minRows={6}
							variant="outlined"
							value={eventDescription}
							onChange={(e) =>
								setEventDescription(e.target.value)
							}
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
						<Grid xs={12} sm={9}>
							<FormControl>
								<FormLabel>Título</FormLabel>
								<Input
									placeholder="Nome do curso ou palestra"
									size="sm"
									variant="outlined"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</FormControl>
						</Grid>
						<Grid xs={12} sm={3}>
							<FormControl>
								<FormLabel>Data do evento</FormLabel>
								<Input
									type="date"
									placeholder="DD/MM/AAAA"
									fullWidth
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
									type="time"
									placeholder="00:00"
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
									type="time"
									placeholder="00:00"
									size="sm"
									variant="outlined"
									value={endTime}
									onChange={(e) => setEndTime(e.target.value)}
								/>
							</FormControl>
						</Grid>
						<Grid
							xs={12}
							sm={3}
							sx={{ display: "flex", alignItems: "center" }}
						>
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
										{
											speaker,
											title,
											date,
											startTime,
											endTime,
										},
									]);
									setSpeaker("");
									setTitle("");
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
							<ScheduleListItem
								key={`${schedule.date}-${index}`}
								{...schedule}
							/>
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
	];

	const handleNext = async () => {
		if (activeStep === 2) {
			await handleSubmit();
		} else {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const navigate = useNavigate();

	const handleSubmit = async () => {
		const formData = new FormData();
		const event = {
			name: eventName,
			dateStart: dateStart,
			dateEnd: dateEnd,
			abstract: eventSummary,
			nrUuidResponsavel: "1",
			informations: eventDescription,
			dateEvents: schedules.map((schedule) => ({
				ministrante: schedule.speaker,
				titulo: schedule.title,
				date: schedule.date,
				startTime: schedule.startTime,
				endTime: schedule.endTime,
			})),
		};

		// Adiciona o JSON do evento como uma string
		formData.append("event", JSON.stringify(event));

		// Adiciona o arquivo ao FormData
		if (fileBanner) {
			formData.append("file", fileBanner);
		}

		try {
			const response = await api.post("/api/evento", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log(response);
			navigate("/eventos");
			toast.success("Evento criado com sucesso");
		} catch (error) {
			console.error("Error submitting event data:", error);
		}
	};

	// const handleSubmit = async () => {
	// 	const formData = new FormData();
	// 	formData.append("name", eventName);
	// 	formData.append("dateStart", dateStart);
	// 	formData.append("dateEnd", dateEnd);
	// 	formData.append("abstract", eventSummary);
	// 	formData.append("informations", eventDescription);

	// 	if (fileBanner) {
	// 		formData.append("banner", fileBanner);
	// 	}

	// 	try {
	// 		const response = await fetch("/api/evento", {
	// 			method: "POST",
	// 			body: formData,
	// 		});

	// 		if (!response.ok) {
	// 			throw new Error("Failed to submit event data");
	// 		}

	// 		const data = await response.json();
	// 		toast.success("Evento criado com sucesso");
	// 	} catch (error) {
	// 		console.error("Error submitting event data:", error);
	// 	}
	// };

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
				<Button variant="solid" color="primary" onClick={handleNext}>
					{activeStep === steps.length - 1
						? "Criar Evento"
						: "Próximo passo"}
				</Button>
			</Stack>
		</PageWrapper>
	);
};

export default CreateEventsPage;
