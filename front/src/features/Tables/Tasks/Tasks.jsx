import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "@/api/axios";

import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { plPL } from "@mui/x-data-grid";

import Edit from "@mui/icons-material/Edit";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import Info from "@mui/icons-material/Info";

import { tokens } from "@/assets/themes/theme";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";
import { DefaultTableToolbar, DataGrid } from "@/components/_components";
import { mockTasksData } from "@/data/mock/mockTasks";
import { DeleteTask } from "@/features/Tables/Tasks/DeleteTask";

function Tasks(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  //const gridData = TasksDataRetriever();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    id: 0,
    Machines: { id: 0, Area: "", MachineName: "" },
    Description: "",
    Type: "",
    Category: "",
    Responsible: { id: 0, Name: "", Surname: "" },
    PartsStatus: { Status: "" },
    TaskStatus: { Status: "" },
  });
  const [tasks, setTasks] = useState([
    {
      Id: 0,
      Machine: { id: 0, Area: "", MachineName: "" },
      Description: "",
      Type: "",
      Category: "",
      Responsible: { id: 0, Name: "", Surname: "" },
      PartsStatus: "",
      LastStatus: "",
    },
  ]);
  console.log(tasks);

  async function TasksDataRetriever() {
    if (props.tasksData) return setTasksprops(tasksData);
    if (import.meta.env.VITE_MOCK_DATA) return setTasks(mockTasksData);

    const res = await axios.get("/dcs/task/all");
    const data = res.data;
    //console.log(data);
    setTasks(data);

    //return res.data; //props.tasksData;
  }

  useEffect(() => {
    TasksDataRetriever();
  }, []);

  function TaskCategoryColor(category) {
    if (category == "A") return theme.palette.error.main;
    if (category == "B") return theme.palette.warning.main;
    if (category == "C") return theme.palette.info.main;
  }

  function PartStatusColor(status) {
    if (status == "SPECYFIKOWANIE") return theme.palette.info.main;
    if (status == "ZAMÓWIONE") return theme.palette.warning.main;
    if (status == "DOSTĘPNE") return theme.palette.success.main;
  }

  function TaskStatusColor(status) {
    if (status == "W TRAKCIE") return theme.palette.info.main;
    if (status == "WYKONANE") return theme.palette.warning.main;
    if (status == "ZATWIERDZONE") return theme.palette.success.main;
    if (status == "SPÓŹNIONE") return theme.palette.error.main;
  }

  useEffect(
    () =>
      setTitleText({
        title: "Działania",
        subtitle: "Lista działań",
      }),
    []
  );

  function EditHandle(row) {
    console.log(location);
    navigate(`${location.pathname}/edit/${row.id}`, { state: { row: row } });
  }
  function RemoveHandle(row) {
    setTask(row);
    setOpen(true);
  }
  function DetailsHandle(row) {
    console.log("DETAILS: " + JSON.stringify(row));
    navigate(`${location.pathname}/details/${row.id}`, { state: { row: row } });
  }

  const columns = [
    { field: "id", headerName: "ID", width: 50, minWidth: 50 },
    {
      field: "LineMachine",
      headerName: "Linia Maszyna",
      filterable: false,
      renderHeader: (params) => (
        <Box>
          <Typography>Linia</Typography>
          <Typography>Maszyna</Typography>
        </Box>
      ),
      flex: 0.6,
      valueGetter: (params) =>
        params.row.Machine.Area + " " + params.row.Machine.MachineName,
      renderCell: (params) => (
        <Box>
          <Typography>{params.row?.Machine?.Area}</Typography>
          <Typography color={colors.greenAccent[500]}>
            {params.row?.Machine?.MachineName}
          </Typography>
        </Box>
      ),
    },
    {
      field: "Area",
      headerName: "Obszar",
      valueGetter: (params) => params.row.Machine.Area,
      hide: true,
    },
    {
      field: "Machine",
      headerName: "Maszyna",
      valueGetter: (params) => params.row.Machine.MachineName,
    },
    { field: "Description", headerName: "Opis", flex: 1 },
    { field: "Catgory", headerName: "Rodzaj działania", flex: 0.3 },
    {
      field: "Priority",
      headerName: "Kategoria",
      flex: 0.2,
      renderCell: ({ row: { Priority } }) => {
        return (
          <Box
            width="40%"
            m="0"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={() => TaskCategoryColor(Priority)}
            borderRadius="15px"
          >
            <Typography color={colors.grey[700]} sx={{ fontWeight: 600 }}>
              {Priority}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Responsible",
      headerName: "Odpowiedzialny",
      flex: 0.2,
      renderCell: (params) => (
        <Box>
          <Typography>{params.row.Responsible.Name}</Typography>
          <Typography>{params.row.Responsible.Surname}</Typography>{" "}
        </Box>
      ),
      valueGetter: (params) =>
        params.row.Responsible.Name + " " + params.row.Responsible.Surname,
    },
    {
      field: "PartsStatus",
      headerName: "Status części",
      flex: 0.3,
      valueGetter: (params) => params.row.PartsStatus,
      renderCell: ({ PartsStatus }) => {
        return (
          <Box
            width="90%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={() => PartStatusColor(PartsStatus)}
            borderRadius="4px"
          >
            <Typography color={colors.grey[700]} sx={{ fontWeight: 600 }}>
              {PartsStatus}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "TaskStatus",
      headerName: "Status zadania",
      flex: 0.3,
      valueGetter: (params) => params.row?.LastStatus,
      renderCell: ({ LastStatus }) => {
        return (
          <Box
            width="90%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={() => TaskStatusColor(LastStatus)}
            borderRadius="4px"
          >
            <Typography color={colors.grey[700]} sx={{ fontWeight: 600 }}>
              {LastStatus}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Actions",
      headerName: "Akcje",
      width: 110,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              "& .MuiSvgIcon-root": {
                color: colors.greenAccent[500],
              },
              "& .MuiButtonBase-root:hover": {
                bgcolor: colors.greenAccent[300],
                "& .MuiSvgIcon-root": {
                  color: colors.greenAccent[800],
                },
              },

              "& .MuiButtonBase-root": { minWidth: 30, maxWidth: 30, p: 1 },
            }}
          >
            <Button onClick={() => EditHandle(params.row)}>
              <Edit />
            </Button>
            <Button onClick={() => RemoveHandle(params.row)}>
              <RemoveCircle />
            </Button>
            <Button onClick={() => DetailsHandle(params.row)}>
              <Info />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      m="10px 0 0 0"
      height="100%"
      width="100%"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
      }}
    >
      <DataGrid
        rows={tasks}
        getRowId={(row) => row.Id}
        columns={columns}
        components={{ Toolbar: DefaultTableToolbar }}
        componentsProps={{ toolbar: ["/new"] }}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
        columnVisibilityModel={{
          Area: false,
          Machine: false,
        }}
      />
      <DeleteTask state={{ open, setOpen }} task={{ task }} />
    </Box>
  );
}

export default Tasks;
