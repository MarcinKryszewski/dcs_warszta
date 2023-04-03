import { useTheme } from "@emotion/react";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "src/assets/themes/theme";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";

import { mockMachinesData } from "src/data/mock/mockMachines";
import UniqueValuesFromJson from "src/utils/uniqueValuesFromJson";

function NewMachine() {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState({ Area: "", MachineName: "" });
  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();

  function MachineManipulator() {
    if (!value.Area) return setErrorText("Wpisz obszar!");
    if (value.MachineName == "") return setErrorText("Wpisz maszynę!");
    setErrorText(null);
    console.log(value);
  }

  useEffect(() => {
    setTitleText({
      title: "Maszyny",
      subtitle: "Dodaj nową maszynę",
    });
  }, []);

  return (
    <Box width={"20%"} ml={2} mt={4}>
      <Stack alignItems="center">
        <Autocomplete
          value={value.Area}
          onChange={(event, values) => {
            setValue({ ...value, Area: values });
          }}
          options={UniqueValuesFromJson(mockMachinesData, "Area")}
          onInputChange={(event, newInputValue, reason) => {
            if (reason === "clear") return setValue({ ...value, Area: "" });
          }}
          sx={{
            width: 300,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              value={value.Area}
              onChange={(event) => {
                setValue({ ...value, Area: event.target.value });
              }}
              error={!value.Area ? true : false}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: colors.greenAccent[400],
                  },
                },
              }}
              label="Obszar"
            />
          )}
          freeSolo
        />
        <Box height="20px" />
        <Autocomplete
          value={value.MachineName}
          onChange={(event, values) => {
            setValue({ ...value, MachineName: values });
          }}
          options={UniqueValuesFromJson(mockMachinesData, "MachineName")}
          onInputChange={(event, newInputValue, reason) => {
            if (reason === "clear")
              return setValue({ ...value, MachineName: "" });
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              value={value.MachineName}
              onChange={(event) => {
                setValue({ ...value, MachineName: event.target.value });
              }}
              error={!value.MachineName ? true : false}
              color="secondary"
              label="Maszyna"
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
        <Box height="30px" />
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

export default NewMachine;
