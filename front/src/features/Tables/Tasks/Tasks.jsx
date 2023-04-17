import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { plPL } from "@mui/x-data-grid";
import { tokens } from "@/assets/themes/theme";
import React, { useContext, useEffect, useState } from "react";

import Edit from "@mui/icons-material/Edit";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import Info from "@mui/icons-material/Info";

import { HeaderTitleContext } from "@/context/HeaderTitleContext";
import { DefaultTableToolbar, DataGrid } from "@/components/_components";
import { mockTasksData } from "@/data/mock/mockTasks";
import { DeleteTask } from "@/features/Tables/Tasks/DeleteTask";
import { useLocation, useNavigate } from "react-router-dom";

function Tasks() {
  console.log("Tasks");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const gridData = mockTasksData;
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

  function PartStatusColor(category) {
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
        title: "Tasks",
        subtitle: "Tasks table",
      }),
    []
  );

  function EditHandle(row) {
    navigate(`${location.pathname}/edit/${row.id}`, { state: { row: row } });
  }
  function RemoveHandle(row) {
    setTask(row);
    setOpen(true);
  }
  function DetailsHandle(row) {
    console.log("DETAILS: " + row);
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
        params.row.Machines.Area + " " + params.row.Machines.MachineName,
      renderCell: (params) => (
        <Box>
          <Typography>{params.row?.Machines?.Area}</Typography>
          <Typography color={colors.greenAccent[500]}>
            {params.row?.Machines?.MachineName}
          </Typography>
        </Box>
      ),
    },
    {
      field: "Area",
      headerName: "Obszar",
      valueGetter: (params) => params.row.Machines.Area,
      hide: true,
    },
    {
      field: "Machine",
      headerName: "Maszyna",
      valueGetter: (params) => params.row.Machines.MachineName,
    },
    { field: "Description", headerName: "Opis", flex: 1 },
    { field: "Type", headerName: "Rodzaj działania", flex: 0.3 },
    {
      field: "Category",
      headerName: "Kategoria",
      flex: 0.2,
      renderCell: ({ row: { Category } }) => {
        return (
          <Box
            width="40%"
            m="0"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={() => PartStatusColor(Category)}
            borderRadius="15px"
          >
            <Typography color={colors.grey[700]} sx={{ fontWeight: 600 }}>
              {Category}
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
      valueGetter: (params) => params.row.PartsStatus.Status,
      renderCell: ({
        row: {
          PartsStatus: { Status },
        },
      }) => {
        return (
          <Box
            width="90%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={() => PartStatusColor(Status)}
            borderRadius="4px"
          >
            <Typography color={colors.grey[700]} sx={{ fontWeight: 600 }}>
              {Status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "TaskStatus",
      headerName: "Status zadania",
      flex: 0.3,
      valueGetter: (params) => params.row?.TaskStatus?.Status,
      renderCell: ({
        row: {
          TaskStatus: { Status },
        },
      }) => {
        return (
          <Box
            width="90%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={() => TaskStatusColor(Status)}
            borderRadius="4px"
          >
            <Typography color={colors.grey[700]} sx={{ fontWeight: 600 }}>
              {Status}
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
        rows={gridData}
        columns={columns}
        components={{ Toolbar: DefaultTableToolbar }}
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
