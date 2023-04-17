import useTheme from "@mui/material/styles/useTheme";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "@/assets/themes/theme";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";
import { mockMachinesData } from "@/data/mock/mockMachines";
import UniqueValuesFromJson from "@/utils/uniqueValuesFromJson";

function NewMachine() {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [machine, setMachine] = useState({ Area: "", MachineName: "" });
  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();

  const uniqueAreas = UniqueValuesFromJson(mockMachinesData, "Area");
  const uniqueMachineNames = UniqueValuesFromJson(
    mockMachinesData,
    "MachineName"
  );

  function CreateMachine() {
    if (!machine.Area) return setErrorText("Wpisz obszar!");
    if (machine.MachineName == "") return setErrorText("Wpisz maszynę!");
    setErrorText(null);
    console.log(machine);
  }

  useEffect(() => {
    setTitleText({
      title: "Maszyny",
      subtitle: "Dodaj nową maszynę",
    });
  }, []);

  return (
    <Box width={"30%"} ml={2} mt={4}>
      <Stack alignItems="center" spacing={3}>
        <Autocomplete
          openOnFocus
          freeSolo
          value={machine.Area}
          options={uniqueAreas}
          onChange={(event, value) => {
            setMachine({ ...machine, Area: value });
          }}
          onInputChange={(event, newInputValue, reason) => {
            if (reason === "clear") return setMachine({ ...machine, Area: "" });
            setMachine({ ...machine, Area: newInputValue });
          }}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.greenAccent[400],
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!machine.Area ? true : false}
              label="Obszar"
            />
          )}
        />
        <Autocomplete
          openOnFocus
          freeSolo
          value={machine.MachineName}
          options={uniqueMachineNames}
          onChange={(event, values) => {
            setMachine({ ...machine, MachineName: values });
          }}
          onInputChange={(event, newInputValue, reason) => {
            if (reason === "clear")
              return setMachine({ ...machine, MachineName: "" });
            setMachine({ ...machine, MachineName: newInputValue });
          }}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.greenAccent[400],
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!machine.MachineName ? true : false}
              label="Maszyna"
            />
          )}
        />
        <Stack direction="row" spacing={5} justifyContent="center">
          <Button
            variant="contained"
            color="success"
            onClick={() => CreateMachine()}
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

export default NewMachine;
