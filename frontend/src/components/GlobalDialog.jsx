import { useDialog } from "./DialogContext";
import RegistrationFormDialog from "./Membership"; // Your dialog component

export default function GlobalDialog() {
  const { isDialogOpen, closeDialog } = useDialog();

  return isDialogOpen ? (
    <RegistrationFormDialog onClose={closeDialog} />
  ) : null;
}
