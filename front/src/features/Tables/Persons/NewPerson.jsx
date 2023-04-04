import { useTheme } from "@emotion/react";
import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "src/assets/themes/theme";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";

import { mockUsersData } from "src/data/mock/mockUsers";
import UniqueValuesFromJson from "src/utils/uniqueValuesFromJson";

function NewPerson() {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState({
    Name: "",
    Surname: "",
    Login: "",
    Role: { RoleId: 0, Name: "" },
    Password: "",
  });
  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();

  function MachineManipulator() {
    //if (!value.Area) return setErrorText("Wpisz obszar!");
    //if (value.MachineName == "") return setErrorText("Wpisz maszynę!");
    setErrorText(null);
    console.log(value);
  }

  const roleHandle = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setTitleText({
      title: "Osoby",
      subtitle: "Dodaj nową osobę",
    });
  }, []);

  return (
    <Box width={"38%"} ml={2} mt={4}>
      <Stack>
        <Stack direction="row" spacing={3}>
          <Autocomplete
            value={value.Name}
            onChange={(event, values) => {
              setValue({ ...value, Name: values });
            }}
            options={UniqueValuesFromJson(mockUsersData, "Name")}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "clear") return setValue({ ...value, Name: "" });
            }}
            sx={{
              width: 300,
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                value={value.Name}
                onChange={(event) => {
                  setValue({ ...value, Name: event.target.value });
                }}
                error={!value.Name ? true : false}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.greenAccent[400],
                    },
                  },
                }}
                label="Imię"
              />
            )}
            freeSolo
          />
          <Autocomplete
            value={value.Surname}
            onChange={(event, values) => {
              setValue({ ...value, Surname: values });
            }}
            options={UniqueValuesFromJson(mockUsersData, "Surname")}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "clear")
                return setValue({ ...value, Surname: "" });
            }}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                value={value.Surname}
                onChange={(event) => {
                  setValue({ ...value, Surname: event.target.value });
                }}
                error={!value.Surname ? true : false}
                color="secondary"
                label="Nazwisko"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.greenAccent[400],
                    },
                  },
                }}
              />
            )}
            freeSolo
            disablePortal
          />
        </Stack>
        <Box height="20px" />
        <Stack direction="row" justifyContent="center" spacing={3}>
          <TextField
            value={value.Login}
            onChange={(event) => {
              setValue({ ...value, Login: event.target.value });
            }}
            error={!value.Login ? true : false}
            color="secondary"
            label="Login"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.greenAccent[400],
                },
              },
              width: "100%",
            }}
          />
          <TextField
            value={value.Password}
            onChange={(event) => {
              setValue({ ...value, Password: event.target.value });
            }}
            error={!value.Password ? true : false}
            color="secondary"
            label="Hasło"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.greenAccent[400],
                },
              },
              width: "100%",
            }}
          />
        </Stack>
        <Box height="20px" />
        <Select
          value={value.Role.Name}
          onChange={(event, key) => {
            setValue({
              ...value,
              Role: { RoleId: key.key.slice(2), Name: event.target.value },
            });
          }}
        >
          {UniqueValuesFromJson(mockUsersData, "Role").map(
            ({ RoleId, Name }) => (
              <MenuItem key={RoleId} value={Name}>
                {Name}
              </MenuItem>
            )
          )}
        </Select>
        <Box height="20px" />
        <Stack direction="row" spacing={5} justifyContent="center">
          <Button
            variant="contained"
            color="success"
            onClick={() => MachineManipulator()}
            sx={{ boxShadow: `0 0 10px 1px ${colors.greenAccent[400]};` }}
          >
            <Typography>ZAPISZ</Typography>
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={() => navigate(-1)}
            sx={{ boxShadow: `0 0 10px 1px ${colors.blueAccent[400]};` }}
          >
            <Typography>WYJDŹ</Typography>
          </Button>
        </Stack>
        <Box height="20px" />
        <Typography sx={{ fontWeight: 600 }} color="error" variant="h4">
          {errorText}
        </Typography>
      </Stack>
    </Box>
  );
}

export default NewPerson;
