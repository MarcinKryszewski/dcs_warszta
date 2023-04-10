import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "@/assets/themes/theme";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";
import { mockUsersData } from "@/data/mock/mockUsers";
import { mockMachinesData } from "@/data/mock/mockMachines";
import UniqueValuesFromJson from "@/utils/uniqueValuesFromJson";
import { mockTasksData } from "@/data/mock/mockTasks";

export default function EditTask() {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [task, setTask] = useState({
    Id: 0,
    MachineId: 0,
    Description: "",
    Type: "",
    Category: "",
    ResponsibleId: 0,
  });
  const [person, setPerson] = useState("");
  const [machine, setMachine] = useState({
    id: 0,
    Area: "",
    MachineName: "",
  });
  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  const uniqueAreas = UniqueValuesFromJson(mockMachinesData, "Area");
  const uniqueTypes = UniqueValuesFromJson(mockTasksData, "Type");

  function CreateTask() {
    //if (!person.Name) return setErrorText("Podaj imię!");
    setErrorText(null);
    console.log(task);
    console.log(machine);
  }

  useEffect(() => {
    setTitleText({
      title: "Działania",
      subtitle: "Dodaj nowe działanie",
    });
    console.log(state.row);
    setTask({
      Id: state.row.id,
      MachineId: state.row.Machines.id,
      Description: state.row.Description,
      Type: state.row.Type,
      Category: state.row.Category,
      ResponsibleId: state.row.Responsible.id,
    });
    setPerson(state.row.Responsible);
    setMachine({
      id: state.row.Machines.id,
      Area: state.row.Machines.Area,
      MachineName: state.row.Machines.MachineName,
    });
  }, []);

  return (
    <Box width={"40%"} ml={2} mt={4}>
      <Stack alignItems="center" spacing={3}>
        <Stack direction="row" spacing={3} width={"100%"}>
          <Autocomplete
            openOnFocus
            value={machine.Area == "" ? null : machine.Area}
            options={uniqueAreas}
            onChange={(event, value) => {
              setMachine({
                id: 0,
                Area: value,
                MachineName: "",
              });
              setTask({ ...task, MachineId: 0 });
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
            autoHighlight
            openOnFocus
            value={machine.MachineName == "" ? null : machine}
            options={mockMachinesData.filter(
              (machines) => machines.Area == machine.Area
            )}
            getOptionLabel={(machines) => machines.MachineName}
            onChange={(event, value, reason) => {
              if (reason === "clear")
                return setMachine({ ...machine, MachineName: "" });
              setMachine(value);
              setTask({ ...task, MachineId: value.id });
            }}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.greenAccent[400],
                },
              },
            }}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.MachineName}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!machine.MachineName ? true : false}
                label="Obszar"
              />
            )}
          />
        </Stack>

        <Stack direction="row" spacing={3} width={"100%"}>
          <FormControl sx={{ width: "100%" }}>
            <FormLabel
              color={"secondary"}
              sx={{
                color:
                  task.Category == ""
                    ? theme.palette.error.main
                    : colors.greenAccent[400],
              }}
            >
              Kategoria
            </FormLabel>
            <RadioGroup
              value={task.Category}
              onChange={(event) =>
                setTask({ ...task, Category: event.target.value })
              }
            >
              <FormControlLabel
                value="A"
                control={<Radio />}
                label="A"
                sx={{
                  color: theme.palette.error.main,
                  "& .MuiRadio-root": {
                    "&.Mui-checked": {
                      color: theme.palette.error.main,
                    },
                  },
                }}
              />
              <FormControlLabel
                value="B"
                control={<Radio />}
                label="B"
                sx={{
                  color: theme.palette.warning.main,
                  "& .MuiRadio-root": {
                    "&.Mui-checked": {
                      color: theme.palette.warning.main,
                    },
                  },
                }}
              />
              <FormControlLabel
                value="C"
                control={<Radio />}
                label="C"
                sx={{
                  color: theme.palette.info.main,
                  "& .MuiRadio-root": {
                    "&.Mui-checked": {
                      color: theme.palette.info.main,
                    },
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
          <Stack spacing={3} width={"100%"}>
            <Autocomplete
              openOnFocus
              value={task.Type == "" ? null : task.Type}
              options={uniqueTypes}
              onChange={(event, value) => {
                setTask({ ...task, Type: value });
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
                  error={!task.Type ? true : false}
                  label="Rodzaj"
                />
              )}
            />

            <Autocomplete
              autoHighlight
              openOnFocus
              value={person == "" ? null : person}
              options={mockUsersData}
              getOptionLabel={(persons) => `${persons.Name} ${persons.Surname}`}
              onChange={(event, value, reason) => {
                if (reason === "clear") return setPerson("");
                setPerson(value);
                setTask({ ...task, ResponsibleId: value.id });
              }}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: colors.greenAccent[400],
                  },
                },
              }}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.Name} {option.Surname}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!person ? true : false}
                  label="Odpowiedzialny"
                />
              )}
            />
          </Stack>
        </Stack>
        <TextField
          label="OPIS"
          multiline
          minRows={3}
          value={task.Description}
          onChange={(event) =>
            setTask({ ...task, Description: event.target.value })
          }
          error={!task.Description ? true : false}
          color="secondary"
          sx={{
            "& fieldset": {
              borderColor:
                task.Description == ""
                  ? theme.palette.error.main
                  : colors.greenAccent[400],
            },
            width: "100%",
          }}
        />
        <Stack direction="row" spacing={5} justifyContent="center">
          <Button
            variant="contained"
            color="success"
            onClick={() => CreateTask()}
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
