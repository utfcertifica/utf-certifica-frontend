import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// import ColorSchemeToggle from "@components/color-scheme-toggle";
import { closeSidebar, getInitials } from "@utils/utils";
import { AspectRatio, Button } from "@mui/joy";
import logo from "../assets/logo.png";
import { i18n } from "@translate/i18n";
import {
	AccountTreeOutlined,
	CodeRounded,
	ContactPhone,
	Event,
	EventAvailable,
	FlashOn,
	Forum,
	HelpOutline,
	ListAlt,
	LocalOffer,
	People,
	Person,
	Settings,
	SupportAgent,
	SyncAlt,
	ViewKanban,
	WhatsApp,
	WorkspacePremium,
} from "@mui/icons-material";
import { AuthContext } from "@context/auth";
import { ColorSchemeToggle } from "@pages/login";

function Toggler(props: {
	defaultExpanded?: boolean;
	children: React.ReactNode;
	renderToggle: (params: {
		open: boolean;
		setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	}) => React.ReactNode;
}) {
	const { defaultExpanded = false, renderToggle, children } = props;
	const [open, setOpen] = React.useState(defaultExpanded);

	return (
		<React.Fragment>
			{renderToggle({ open, setOpen })}
			<Box
				sx={{
					display: "grid",
					gridTemplateRows: open ? "1fr" : "0fr",
					transition: "0.2s ease",
					"& > *": {
						overflow: "hidden",
					},
				}}
			>
				{children}
			</Box>
		</React.Fragment>
	);
}

export default function Sidebar() {
	const { user, handleLogout } = React.useContext(AuthContext);

	const [open, setOpen] = React.useState(false);

	const handleEditProfile = () => {
		setOpen(true);
	};

	const handleCloseModal = () => {
		setOpen(false);
	};

	return (
		<Sheet
			className="Sidebar"
			sx={{
				position: { xs: "fixed", md: "sticky" },
				transform: {
					xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
					md: "none",
				},
				transition: "transform 0.4s, width 0.4s",
				height: "100vh",
				width: "var(--Sidebar-width)",
				top: 0,
				p: 6,
				flexShrink: 0,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				gap: 2,
			}}
		>
			<GlobalStyles
				styles={(theme) => ({
					":root": {
						"--Sidebar-width": "350px",
						[theme.breakpoints.up("lg")]: {
							"--Sidebar-width": "350px",
						},
					},
				})}
			/>
			<Box
				className="Sidebar-overlay"
				sx={{
					position: "fixed",
					zIndex: 9998,
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					opacity: "var(--SideNavigation-slideIn)",
					backgroundColor: "var(--joy-palette-background-backdrop)",
					transition: "opacity 0.4s",
					transform: {
						xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
						lg: "translateX(-100%)",
					},
				}}
				onClick={() => closeSidebar()}
			/>
			<Box
				sx={{ display: "flex", alignItems: "center", paddingBottom: 2 }}
			>
				<a href="/" style={{ display: "flex", alignItems: "center" }}>
					<img
						src={logo}
						srcSet={logo}
						loading="lazy"
						alt=""
						width={200}
					/>
				</a>
				<ColorSchemeToggle sx={{ ml: "auto" }} />
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 1,
					alignItems: "start",
				}}
			>
				<IconButton
					variant="plain"
					sx={{
						"--Avatar-size": "70px",
						width: "var(--Avatar-size)",
						height: "var(--Avatar-size)",
					}}
					onClick={handleEditProfile}
				>
					<Avatar
						variant="outlined"
						size="lg"
						src="https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2014/11/formacao_1600x1200-uma-mulher-virtuosa-e-feita-de-esforcos.jpg"
					>
						{user?.avatar ? null : getInitials(user?.name)}
					</Avatar>
				</IconButton>
				<Box
					sx={{
						paddingBottom: 2,
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Box sx={{ flex: 1, flexDirection: "column" }}>
						<Typography level="title-sm" fontSize={25}>
							{user?.name ?? "Fulano de tal"}
						</Typography>
						<Typography
							level="body-xs"
							sx={{
								width: "100%",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
								overflow: "hidden",
							}}
						>
							{user?.email ?? "fulano@alunos.utfpr.edu.br"}
						</Typography>
					</Box>
					<IconButton
						size="sm"
						variant="plain"
						color="neutral"
						onClick={handleLogout}
					>
						<LogoutRoundedIcon />
					</IconButton>
				</Box>
			</Box>

			{/* <Input size='sm' startDecorator={<SearchRoundedIcon />} placeholder='Pesquisar' /> */}
			<Box
				sx={{
					minHeight: 0,
					overflow: "hidden auto",
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					[`& .${listItemButtonClasses.root}`]: {
						gap: 1.5,
					},
				}}
			>
				<List
					size="sm"
					sx={{
						gap: 2,
						"--List-nestedInsetStart": "30px",
						"--ListItem-radius": (theme) => theme.vars.radius.sm,
					}}
				>
					<ListItem>
						<ListItemButton role="menuitem" component="a" href="/">
							<DashboardRoundedIcon fontSize={"large"} />
							<ListItemContent>
								<Typography level="title-lg">
									Visão Inicial
								</Typography>
							</ListItemContent>
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton
							role="menuitem"
							component="a"
							href="/eventos"
						>
							<Event fontSize={"large"} />
							<ListItemContent>
								<Typography level="title-lg">
									Eventos
								</Typography>
							</ListItemContent>
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton
							role="menuitem"
							component="a"
							href="/certificados"
						>
							<WorkspacePremium fontSize={"large"} />
							<ListItemContent>
								<Typography level="title-lg">
									Certificados
								</Typography>
							</ListItemContent>
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton role="menuitem" component="a" href="/">
							<Person fontSize={"large"} />
							<ListItemContent>
								<Typography level="title-lg">
									Minha Conta
								</Typography>
							</ListItemContent>
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton role="menuitem" component="a" href="/">
							<Settings fontSize={"large"} />
							<ListItemContent>
								<Typography level="title-lg">
									Configurações
								</Typography>
							</ListItemContent>
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Sheet>
	);
}
