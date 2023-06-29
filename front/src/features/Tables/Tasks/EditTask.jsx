import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "@/api/axios";

import useTheme from "@mui/material/styles/useTheme";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { tokens } from "@/assets/themes/theme";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";
import UniqueValuesFromJson from "@/utils/uniqueValuesFromJson";
import TaskStatus from "@/components/TaskStatus";
import PartsStatus from "@/components/PartsStatus";

import { mockUsersData } from "@/data/mock/mockUsers";
import { mockMachinesData } from "@/data/mock/mockMachines";
import { mockTasksData } from "@/data/mock/mockTasks";

export default function EditTask() {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [task, setTask] = useState({
    Id: 0,
    MachineId: 0,
    Description: "",
    Priority: "",
    Category: "",
    ResponsibleId: 0,
  });
  const [person, setPerson] = useState("");
  const [machine, setMachine] = useState({
    Id: 0,
    Area: "",
    MachineName: "",
  });

  const [machines, setMachines] = useState([
    {
      Id: 0,
      Area: "Area",
      MachineName: "MachineName",
    },
  ]);
  const [users, setUsers] = useState([{ Id: 0, Name: "Name", Surname: "" }]);
  const [uniqueAreas, setUniqueAreas] = useState([""]);
  const [uniqueTypes, setUniqueTypes] = useState([""]);

  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  async function machinesDataRetriever() {
    if (import.meta.env.VITE_MOCK_DATA) {
      setMachines(mockMachinesData);
      return;
    }
    const res = await axios.get("/dcs/machine/all");
    const data = res.data;
    setUniqueAreas(UniqueValuesFromJson(data, "Area"));
    setMachines(data);
  }

  async function taskTypesRetriever() {
    if (import.meta.env.VITE_MOCK_DATA) {
      setUniqueTypes(UniqueValuesFromJson(mockTasksData, "Type"));
      return;
    }
    const res = await axios.post("/dcs/task/types");
    const data = res.data;
    setUniqueTypes(data);
  }

  async function usersDataRetriever() {
    if (import.meta.env.VITE_MOCK_DATA) {
      setUsers(mockUsersData);
      return;
    }
    const res = await axios.get("/dcs/person/all");
    const data = res.data;
    setUsers(data);
  }

  async function taskDataRetriever() {
    const res = await axios.get(`${something.Id}`);
    setTask(res);
  }

  async function machineDataRetriever() {
    const res = await axios.get(`${something.Id}`);
    setMachine(res);
  }

  useEffect(() => {
    setTitleText({
      title: "Działania",
      subtitle: "Dodaj nowe działanie",
    });
  }, []);

  useEffect(() => {
    machinesDataRetriever();
    taskTypesRetriever();
    usersDataRetriever();
  }, []);

  async function EditTask() {
    //if (!person.Name) return setErrorText("Podaj imię!");
    setErrorText(null);
    const req = await axios.put("/dcs/task/" + task.Id, task);
    console.log(req);
    //console.log(task);
    //console.log(machine);
  }

  useEffect(() => {
    setTitleText({
      title: "Działania",
      subtitle: "Edytuj działanie",
    });
    console.log(state.row);
    setTask({
      Id: state.row.Id,
      MachineId: state.row.Machine.Id,
      Description: state.row.Description,
      Category: state.row.Category,
      Priority: state.row.Priority,
      ResponsibleId: state.row.Responsible.Id,
    });
    setPerson(state.row.Responsible);
    setMachine({
      Id: state.row.Machine.Id,
      Area: state.row.Machine.Area,
      MachineName: state.row.Machine.MachineName,
    });
  }, []);

  return (
    <Box width={"100%"} ml={2} mt={4} height={"100%"}>
      <Stack direction="row" spacing={3} width={"100%"} height={"100%"}>
        <Stack alignItems="center" spacing={3} width={"80%"}>
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
              options={machines.filter(
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
                value={task.Priority}
                onChange={(event) =>
                  setTask({ ...task, Priority: event.target.value })
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
                value={task.Category == "" ? null : task.Type}
                options={uniqueTypes}
                onChange={(event, value) => {
                  setTask({ ...task, Category: value });
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
                    error={!task.Category ? true : false}
                    label="Rodzaj"
                  />
                )}
              />

              <Autocomplete
                autoHighlight
                openOnFocus
                value={person == "" ? null : person}
                options={users}
                getOptionLabel={(persons) =>
                  `${persons.Name} ${persons.Surname}`
                }
                onChange={(event, value, reason) => {
                  if (reason === "clear") return setPerson("");
                  setPerson(value);
                  setTask({ ...task, ResponsibleId: value.Id });
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
                    <li {...props} key={option.Id}>
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
              onClick={() => EditTask()}
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

        <Stack
          direction={"column"}
          spacing={2}
          width={"100%"}
          mt={5}
          height={"100%"}
        >
          <Box height={"100%"}>
            <Typography>Status zadania</Typography>
            <TaskStatus taskbar={true} editable={true} />
          </Box>
          <Box height={"100%"}>
            <Typography>Status części</Typography>
            <PartsStatus taskbar={true} editable={true} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
