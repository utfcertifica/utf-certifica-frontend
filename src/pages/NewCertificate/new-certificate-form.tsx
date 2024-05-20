import { Box, Button, FormControl, FormLabel, Grid, Input } from "@mui/joy";

export const NewCertficateForm = () => {
	return (
		<Box sx={{ maxWidth: "75%" }}>
			<FormControl>
				<Grid container spacing={4} marginBottom={"30px"}>
					<Grid xs={10}>
						<FormLabel>Nome do evento</FormLabel>
						<Input type="text" placeholder="Nome do evento..." />
					</Grid>

					<Grid xs={4}>
						<FormLabel>Data do evento</FormLabel>
						<Input type="date" placeholder="DD/MM/AAAA" fullWidth />
					</Grid>
					<Grid xs={4}>
						<FormLabel>Horário de Início</FormLabel>
						<Input type="time" placeholder="12:00" fullWidth />
					</Grid>
					<Grid xs={4}>
						<FormLabel>Horário de Encerramento</FormLabel>
						<Input type="time" placeholder="12:00" fullWidth />
					</Grid>

					<Grid xs={6}>
						<FormLabel>Carga horária</FormLabel>
						<Input type="text" placeholder="10 horas" />
					</Grid>
				</Grid>
			</FormControl>
			<Grid
				container
				sx={{ maxWidth: "60%" }}
				rowSpacing={4}
				columnSpacing={1.5}
			>
				<Grid xs={12}>
					<Box
						sx={{
							height: "230px",
							borderRadius: "1rem",
							backgroundColor: "lightgray",
						}}
					/>
				</Grid>

				<Grid xs={6}>
					<Button
						fullWidth
						sx={(theme) => ({
							paddingY: "0.75rem",
							borderRadius: "0.5rem",
							backgroundColor:
								theme.colorSchemes.light.palette.common[
									"black-500"
								],
							"&:hover": {
								backgroundColor: "rgba(0, 0, 0, 0.75)",
							},
						})}
					>
						Upload
					</Button>
				</Grid>
				<Grid xs={6}>
					<Button
						fullWidth
						sx={{ paddingY: "0.75rem", borderRadius: "0.5rem" }}
					>
						Próximo passo
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};
