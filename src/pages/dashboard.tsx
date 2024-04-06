import PageWrapper from "@components/page-wrapper";
import {
	Check,
	Close,
	FilterAlt,
	FilterAltOutlined,
	Height,
	Message,
	Speed,
} from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Card,
	Grid,
	Sheet,
	Stack,
	Typography,
	styled,
} from "@mui/joy";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export const Item = styled(Sheet)(({ theme }) => ({
	...theme.typography["body-sm"],
	padding: theme.spacing(1),
	textAlign: "center",
	borderRadius: 4,
	color: theme.vars.palette.text.secondary,
	maxWidth: 400,
}));

const DashboardPage = () => {
	return <PageWrapper breadcrumbLabel="Visão inicial"></PageWrapper>;
};
export default DashboardPage;
