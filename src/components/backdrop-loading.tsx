import { CircularProgress, Modal } from "@mui/joy";


const BackdropLoading = () => {
	return (
		<Modal open={true} >
			<CircularProgress determinate={false} />
		</Modal>
	);
};

export default BackdropLoading;
