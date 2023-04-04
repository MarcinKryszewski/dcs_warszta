import { Box, Button, Typography, useTheme } from "@mui/material";
import { plPL } from "@mui/x-data-grid";
import { tokens } from "src/assets/themes/theme";
import React, { useContext, useEffect } from "react";
import { Edit, Info, RemoveCircle } from "@mui/icons-material";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";
import { DefaultTableToolbar, DataGrid } from "src/components/_components";
import { mockTasksData } from "src/data/mock/mockTasks";

function Tasks() {
  console.log("Tasks");
  const { titleText, setTitleText } = useContext(HeaderTitleContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
            backgroundColor={
              Category == "A"
                ? theme.palette.error.main
                : Category == "B"
                ? theme.palette.warning.main
                : theme.palette.info.main
            }
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
          <Typography>{params.row?.Responsible?.Name}</Typography>
          <Typography>{params.row?.Responsible?.Surname}</Typography>{" "}
        </Box>
      ),
      valueGetter: (params) =>
        params.row?.Responsible?.Name + " " + params.row?.Responsible?.Surname,
    },
    {
      field: "PartsStatus",
      headerName: "Status części",
      flex: 0.3,
      valueGetter: (params) => params.row?.PartsStatus?.Status,
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
            <Button onClick={() => EditHandle(params.row.id)}>
              <Edit />
            </Button>
            <Button onClick={() => RemoveHandle(params.row.id)}>
              <RemoveCircle />
            </Button>
            <Button onClick={() => DetailsHandle(params.row.id)}>
              <Info />
            </Button>
          </Box>
        );
      },
    },
  ];

  useEffect(
    () =>
      setTitleText({
        title: "Tasks",
        subtitle: "Tasks table",
      }),
    []
  );

  function EditHandle(rowId) {
    console.log("EDIT: " + rowId);
  }
  function RemoveHandle(rowId) {
    console.log("REMOVE: " + rowId);
  }
  function DetailsHandle(rowId) {
    console.log("DETAILS: " + rowId);
  }

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
        rows={mockTasksData}
        columns={columns}
        components={{ Toolbar: DefaultTableToolbar }}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
        columnVisibilityModel={{
          Area: false,
          Machine: false,
        }}
      />
    </Box>
  );
}

export default Tasks;
