import { ReactNode } from "react";
import { i18n } from "@translate/i18n";
import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Modal,
	ModalClose,
	ModalDialog,
	Typography,
} from "@mui/joy";

interface ConfirmationModalProps {
	title: string | null;
	children: ReactNode;
	open: boolean;
	onClose: (confirmed: boolean) => void;
	onConfirm: () => void;
}

const ConfirmationModal = ({
	title,
	children,
	open,
	onClose,
	onConfirm,
}: ConfirmationModalProps): JSX.Element => {
	return (
		<Modal
			open={open}
			onClose={() => onClose(false)}
			aria-labelledby="confirm-dialog"
		>
			<ModalDialog>
				<ModalClose />
				<DialogTitle id="confirm-dialog">{title}</DialogTitle>
				<DialogContent>
					<Typography>{children}</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						variant="solid"
						onClick={() => {
							onClose(false);
							onConfirm();
						}}
						color="primary"
					>
						{i18n.t("Confirmar")}
					</Button>
					<Button onClick={() => onClose(false)} color="danger">
						{i18n.t("confirmationModal.buttons.cancel")}
					</Button>
				</DialogActions>
			</ModalDialog>
		</Modal>
	);
};

export default ConfirmationModal;
