import { Box, Button, FormControl, FormLabel, Grid, Input } from "@mui/joy";
import { useState } from "react";
import { toast } from "react-toastify";
import toastError from "@utils/toast-error";
import api from "@services/api";
import { useNavigate } from "react-router-dom";

export const NewCertficateForm = () => {
	const [ministrante, setMinistrante] = useState("");
	const [nomeEvento, setNomeEvento] = useState("");
	const [dataEvento, setDataEvento] = useState("");
	const [nrCargaHoraria, setNrCargaHoraria] = useState("");
	const [file, setFile] = useState(null);
	const [filePreview, setFilePreview] = useState("");
	const [loading, setLoading] = useState(false);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setFile(file);
		const blob = URL.createObjectURL(file);

		if (blob) setFilePreview(blob);
	};

	const navigate = useNavigate();

	const handleSubmit = async () => {
		const formData = new FormData();

		const certificado = {
			ministrante: ministrante,
			nomeEvento: nomeEvento,
			dataEvento: dataEvento,
			nrCargaHoraria: nrCargaHoraria,
			fileCertificado: "",
			idCertificadoModelo: "",
		};

		formData.append(
			"certificado",
			new Blob([JSON.stringify(certificado)], {
				type: "application/json",
			})
		);

		if (file) formData.append("file", file);

		// Log the content of the FormData
		for (const pair of formData.entries()) {
			console.log(`${pair[0]}: ${pair[1]}`);
		}

		setLoading(true);

		try {
			await api.post("/api/certificado/create", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setLoading(false);
			navigate("/certificados");
			toast.success("Certificado criado com sucesso");
		} catch (error) {
			toastError(error);
		}
	};

	return (
		<Box>
			<Grid container spacing={3}>
				<Grid xs={12} sm={9}>
					<FormControl>
						<FormLabel>Nome do curso ou palestra</FormLabel>
						<Input
							type="text"
							placeholder="Nome do curso ou palestra..."
							value={nomeEvento}
							onChange={(e) => setNomeEvento(e.target.value)}
						/>
					</FormControl>
				</Grid>

				<Grid xs={12} sm={3}>
					<FormControl>
						<FormLabel>Data do curso ou palestra</FormLabel>
						<Input
							type="date"
							placeholder="DD/MM/AAAA"
							fullWidth
							value={dataEvento}
							onChange={(e) => setDataEvento(e.target.value)}
						/>
					</FormControl>
				</Grid>

				<Grid xs={12} sm={6}>
					<FormControl>
						<FormLabel>Ministrante</FormLabel>
						<Input
							type="text"
							placeholder="Quem ministrou o curso ou palestra?"
							value={ministrante}
							onChange={(e) => setMinistrante(e.target.value)}
						/>
					</FormControl>
				</Grid>

				<Grid xs={12} sm={6}>
					<FormControl>
						<FormLabel>Carga horária</FormLabel>
						<Input
							type="number"
							placeholder="10 horas"
							value={nrCargaHoraria}
							onChange={(e) => setNrCargaHoraria(e.target.value)}
						/>
					</FormControl>
				</Grid>
			</Grid>

			<Grid container rowSpacing={4} columnSpacing={1.5}>
				<Grid xs={12}>
					<Box
						sx={{
							height: "230px",
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
				</Grid>

				<Grid xs={12} sm={6}>
					<Button
						fullWidth
						sx={{ paddingY: "0.75rem", borderRadius: "0.5rem" }}
						onClick={handleSubmit}
					>
						Salvar Certificado
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};
