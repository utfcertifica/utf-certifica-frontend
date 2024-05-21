import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { AspectRatio, Sheet } from "@mui/joy";
import { AuthContext } from "@context/auth";
import logo from "@assets/logo.png";
import vector from "@assets/vector.png";
import { Google } from "@mui/icons-material";

export function ColorSchemeToggle(props: IconButtonProps) {
	const { onClick, ...other } = props;
	const { mode, setMode } = useColorScheme();
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) {
		return (
			<IconButton size="sm" variant="outlined" color="neutral" disabled />
		);
	}
	return (
		<IconButton
			id="toggle-mode"
			size="sm"
			variant="outlined"
			color="neutral"
			aria-label="toggle light/dark mode"
			{...other}
			onClick={(event) => {
				if (mode === "light") {
					setMode("dark");
				} else {
					setMode("light");
				}
				onClick?.(event);
			}}
		>
			{mode === "light" ? (
				<DarkModeRoundedIcon />
			) : (
				<LightModeRoundedIcon />
			)}
		</IconButton>
	);
}

interface User {
	email: string;
	password: string;
}

export default function LoginPage() {
	const [user, setUser] = React.useState<User>({ email: "", password: "" });

	const { handleLogin } = React.useContext(AuthContext);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("target", e.target.name);
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleLogin(user);
	};

	return (
		<CssVarsProvider defaultMode="dark" disableTransitionOnChange>
			<CssBaseline />
			<GlobalStyles
				styles={{
					":root": {
						"--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
						"--Cover-width": "50vw", // must be `vw` only
						"--Form-maxWidth": "800px",
						"--Transition-duration": "0.4s", // set to `none` to disable transition
					},
				}}
			/>

			<Sheet sx={{ flex: 2, flexDirection: "row" }}>
				<Box sx={{ flex: 1 }}></Box>
				<Box sx={{ flex: 1 }}></Box>
			</Sheet>

			<Box
				sx={(theme) => ({
					position: "fixed",
					left: 0,
					top: 0,
					bottom: 0,
					right: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
					transition:
						"background-image var(--Transition-duration), left var(--Transition-duration) !important",
					transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundColor: "#2F33C0",
					borderRadius: 20,
					margin: 2,
					flex: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				})}
			>
				<img
					style={{ width: "70%", position: "absolute" }}
					src={vector}
					alt=""
				/>
				<img
					style={{ width: "40%", position: "absolute" }}
					src={logo}
					alt=""
				/>
			</Box>

			<Box
				sx={(theme) => ({
					width: "100dvw",
					transition: "width var(--Transition-duration)",
					transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
					zIndex: 1,
					display: "flex",
					justifyContent: "flex-end",
					backgroundColor: "rgba(255 255 255 / 0.2)",
					[theme.getColorSchemeSelector("dark")]: {
						backgroundColor: "rgba(19 19 24 / 0.4)",
					},
				})}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						minHeight: "100vh",
						width: "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
						maxWidth: "100%",
						px: 2,
						right: 0,
					}}
				>
					<Box
						component="main"
						sx={{
							my: "auto",
							py: 2,
							pb: 5,
							display: "flex",
							flexDirection: "column",
							gap: 2,
							width: 400,
							maxWidth: "100%",
							mx: "auto",
							borderRadius: "sm",
							"& form": {
								display: "flex",
								flexDirection: "column",
								gap: 2,
							},
							[`& .${formLabelClasses.asterisk}`]: {
								visibility: "hidden",
							},
						}}
					>
						<Stack gap={4} sx={{ mb: 2 }}>
							<Stack gap={1}>
								<Box
									sx={{
										display: "flex",
										gap: 1,
										alignItems: "center",
									}}
								>
									<Typography level="h1">Entrar</Typography>
									<ColorSchemeToggle sx={{ ml: "auto" }} />
								</Box>

								<Typography level="body-md">
									É novo por aqui? &nbsp;
									<Link
										href="#replace-with-a-link"
										level="title-md"
									>
										Cadastre-se
									</Link>
								</Typography>
							</Stack>
							<Button
								variant="soft"
								color="neutral"
								fullWidth
								startDecorator={<Google />}
							>
								Continue com Google
							</Button>
						</Stack>
						<Divider
							sx={(theme) => ({
								[theme.getColorSchemeSelector("light")]: {
									color: { xs: "#FFF", md: "text.tertiary" },
									"--Divider-lineColor": {
										xs: "#FFF",
										md: "var(--joy-palette-divider)",
									},
								},
							})}
						>
							ou
						</Divider>
						<Stack gap={4} sx={{ mt: 2 }}>
							<form onSubmit={handleSubmit}>
								<FormControl required>
									<FormLabel>
										RA
									</FormLabel>
									<Input
										type="text"
										name="email"
										value={user.email}
										onChange={handleChangeInput}
									/>
								</FormControl>
								<FormControl required>
									<FormLabel>Senha</FormLabel>
									<Input
										type="password"
										name="password"
										value={user.password}
										onChange={handleChangeInput}
									/>
								</FormControl>
								<Stack gap={4} sx={{ mt: 2 }}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Checkbox
											size="sm"
											label="Lembrar de mim"
											name="persistent"
										/>
										<Link
											level="title-sm"
											href="#replace-with-a-link"
										>
											Esqueceu sua senha?
										</Link>
									</Box>
									<Button size="lg" type="submit">
										Entrar
									</Button>
								</Stack>
							</form>
						</Stack>
					</Box>
					<Box component="footer" sx={{ py: 3 }}>
						<Typography level="body-xs" textAlign="center">
							© {new Date().getFullYear()} Certifica UTFPR. Todos
							os direitos reservados.
						</Typography>
					</Box>
				</Box>
			</Box>
		</CssVarsProvider>
	);
}
