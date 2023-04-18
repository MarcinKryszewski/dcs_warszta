import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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
