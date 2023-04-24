import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useTheme from "@mui/material/styles/useTheme";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { tokens } from "@/assets/themes/theme";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";
import { mockUsersData } from "@/data/mock/mockUsers";
import UniqueValuesFromJson from "@/utils/uniqueValuesFromJson";

function NewPerson() {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [person, setPerson] = useState({
    Name: "",
    Surname: "",
    Login: "",
    Role: { RoleId: 0, Name: "" },
    Password: "",
  });
  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();

  const usersDataRetriever = import.meta.env.VITE_MOCK_DATA
    ? mockUsersData
    : usersData;

  const uniqueNames = UniqueValuesFromJson(usersDataRetriever, "Name");
  const uniqueSurnames = UniqueValuesFromJson(usersDataRetriever, "Surname");
  const uniqueRoles = UniqueValuesFromJson(usersDataRetriever, "Role");

  function CreatePerson() {
    if (!person.Name) return setErrorText("Podaj imię!");
    if (!person.Surname) return setErrorText("Podaj nazwisko!");
    if (!person.Login) return setErrorText("Podaj login!");
    if (!person.Password) return setErrorText("Podaj hasło!");
    if (!person.Role.Name) return setErrorText("Podaj uprawnienia!");
    setErrorText(null);
    console.log(person);
  }

  useEffect(() => {
    setTitleText({
      title: "Osoby",
      subtitle: "Dodaj nową osobę",
    });
  }, []);

  return (
    <Box width={"40%"} ml={2} mt={4}>
      <Stack alignItems="center" spacing={3}>
        <Stack direction="row" spacing={3} width={"100%"}>
          <Autocomplete
            freeSolo
            openOnFocus
            value={person.Name}
            options={uniqueNames}
            onChange={(event, values) => {
              setPerson({ ...person, Name: values });
            }}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "clear") return setPerson({ ...person, Name: "" });
              setPerson({ ...person, Name: newInputValue });
            }}
            sx={{
              width: "100%",
              "& .MuiInputLabel-shrink": {
                color: `${colors.greenAccent[400]} !important;`,
              },
              "& .Mui-focused": {
                "& fieldset": {
                  borderColor: `${colors.greenAccent[400]} !important;`,
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.greenAccent[400],
                },
              },
              "& .MuiOutlinedInput-root:hover": {
                "& fieldset": {
                  borderColor: colors.greenAccent[400],
                },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!person.Name ? true : false}
                label="Imię"
              />
            )}
          />
          <Autocomplete
            freeSolo
            openOnFocus
            value={person.Surname}
            options={uniqueSurnames}
            onChange={(event, values) => {
              setPerson({ ...person, Surname: values });
            }}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "clear")
                return setPerson({ ...person, Surname: "" });
              setPerson({ ...person, Surname: newInputValue });
            }}
            sx={{
              width: "100%",
              "& .MuiInputLabel-shrink": {
                color: `${colors.greenAccent[400]} !important;`,
              },
              "& .Mui-focused": {
                "& fieldset": {
                  borderColor: `${colors.greenAccent[400]} !important;`,
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.greenAccent[400],
                },
              },
              "& .MuiOutlinedInput-root:hover": {
                "& fieldset": {
                  borderColor: colors.greenAccent[400],
                },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!person.Surname ? true : false}
                label="Nazwisko"
              />
            )}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={3}
          width={"100%"}
        >
          <TextField
            value={person.Login}
            onChange={(event) => {
              setPerson({ ...person, Login: event.target.value });
            }}
            error={!person.Login ? true : false}
            label="Login"
            sx={{
              width: "100%",
              "& .MuiInputLabel-shrink": {
                color: `${colors.greenAccent[400]} !important;`,
              },
              "& .Mui-focused": {
                "& fieldset": {
                  borderColor: `${colors.greenAccent[400]} !important;`,
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.greenAccent[400],
                },
              },
              "& .MuiOutlinedInput-root:hover": {
                "& fieldset": {
                  borderColor: colors.greenAccent[400],
                },
              },
            }}
          />
          <TextField
            value={person.Password}
            onChange={(event) => {
              setPerson({ ...person, Password: event.target.value });
            }}
            error={!person.Password ? true : false}
            label="Hasło"
            sx={{
              width: "100%",
              "& .MuiInputLabel-shrink": {
                color: `${colors.greenAccent[400]} !important;`,
              },
              "& .Mui-focused": {
                "& fieldset": {
                  borderColor: `${colors.greenAccent[400]} !important;`,
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.greenAccent[400],
                },
              },
              "& .MuiOutlinedInput-root:hover": {
                "& fieldset": {
                  borderColor: colors.greenAccent[400],
                },
              },
            }}
          />
        </Stack>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel
            sx={{
              color:
                person.Role.Name == ""
                  ? theme.palette.error.main
                  : colors.greenAccent[400],
              "&.Mui-focused": {
                color: `${colors.greenAccent[400]} !important`,
              },
            }}
          >
            Uprawnienia
          </InputLabel>
          <Select
            value={person.Role.Name}
            onChange={(event, key) => {
              setPerson({
                ...person,
                Role: { RoleId: key.key.slice(2), Name: event.target.value },
              });
            }}
            label="Uprawnienia"
            color="secondary"
            sx={{
              "& fieldset": {
                borderColor:
                  person.Role.Name == ""
                    ? theme.palette.error.main
                    : colors.greenAccent[400],
              },
            }}
          >
            {uniqueRoles.map(({ RoleId, Name }) => (
              <MenuItem key={RoleId} value={Name}>
                {Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={5} justifyContent="center">
          <Button
            variant="contained"
            color="success"
            onClick={() => CreatePerson()}
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
        <Typography sx={{ fontWeight: 600 }} color="error" variant="h4">
          {errorText}
        </Typography>
      </Stack>
    </Box>
  );
}

export default NewPerson;
