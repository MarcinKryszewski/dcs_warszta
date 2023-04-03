import { PersonPinCircle } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function DeleteMachine(props) {
  const [open, setOpen] = useState(false);
  const machine = props.machine.machine;

  const handleDelete = () => {
    console.log(machine.id);
    props.state.setOpen(false);
  };
  const handleClose = () => {
    props.state.setOpen(false);
  };

  useEffect(() => setOpen(props.state.open));

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Czy chcesz usunąć tą maszynę?"}</DialogTitle>
        <DialogContent>
          <Typography variant="h4">Obszar: {machine.Area}</Typography>
          <Typography variant="h5">Maszyna: {machine.MachineName}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="outlined">
            NIE
          </Button>
          <Button
            onClick={handleDelete}
            color="success"
            variant="contained"
            autoFocus
          >
            TAK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DeleteMachine;
