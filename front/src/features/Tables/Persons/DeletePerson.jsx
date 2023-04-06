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

function DeletePerson(props) {
  const [open, setOpen] = useState(false);
  const person = props.person.person;

  const handleDelete = () => {
    console.log(person);
    props.state.setOpen(false);
  };
  const handleClose = () => {
    props.state.setOpen(false);
  };

  useEffect(() => setOpen(props.state.open));

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Czy chcesz usunąć tą osobę?"}</DialogTitle>
        <DialogContent>
          <Typography variant="h5">Imię: {person.Name}</Typography>
          <Typography variant="h5">Nazwisko: {person.Surname}</Typography>
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

export default DeletePerson;
