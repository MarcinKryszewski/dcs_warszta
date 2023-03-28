import { Box, Button, Typography, useTheme } from "@mui/material";
import {
  DataGrid,
  gridStringOrNumberComparator,
  GridToolbar,
  plPL,
} from "@mui/x-data-grid";
import { tokens } from "src/assets/themes/theme";
import React, { lazy, useContext, useEffect } from "react";
import { Edit, RemoveCircle } from "@mui/icons-material";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";

import { mockTasksData } from "src/data/mock/mockTasks";

function Tasks() {
  console.log("Tasks");
  const { titleText, setTitleText } = useContext(HeaderTitleContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const lineMachineSortComparator = (v1, v2, param1, param2) => {
    const lineComparatorResult = gridStringOrNumberComparator(
      v1.line,
      v2.line,
      param1,
      param2
    );

    if (lineComparatorResult !== 0) {
      return lineComparatorResult;
    }

    return gridStringOrNumberComparator(v1.machine, v2.machine, param1, param2);
  };

  const personSortComparator = (v1, v2, param1, param2) => {
    const nameComparatorResult = gridStringOrNumberComparator(
      v1.Name,
      v2.Name,
      param1,
      param2
    );

    if (nameComparatorResult !== 0) {
      return nameComparatorResult;
    }

    return gridStringOrNumberComparator(v1.Surname, v2.Surname, param1, param2);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50, minWidth: 50 },
    {
      field: "LineMachine",
      headerName: "Linia Maszyna",
      renderHeader: (params) => (
        <Box>
          <Typography>Linia</Typography>
          <Typography>Maszyna</Typography>
        </Box>
      ),
      flex: 0.6,

      renderCell: (params) => (
        <Box>
          <Typography>{params.row?.Machines?.Area}</Typography>
          <Typography color={colors.greenAccent[500]}>
            {params.row?.Machines?.MachineName}
          </Typography>
        </Box>
      ),
      sortComparator: lineMachineSortComparator,
    },
    { field: "Description", headerName: "Opis", flex: 1 },
    { field: "Type", headerName: "Rodzaj działania", flex: 0.3 },
    { field: "Category", headerName: "Kategoria", flex: 0.2 },
    {
      field: "Responsible",
      headerName: "Odpowiedzialny",
      flex: 0.2,
      //valueGetter: (params) =>
      //params.row?.Responsible?.Name + " " + params.row?.Responsible?.Surname,

      renderCell: (params) => (
        <Box>
          <Typography>{params.row?.Responsible?.Name}</Typography>
          <Typography>{params.row?.Responsible?.Surname}</Typography>{" "}
        </Box>
      ),
      sortComparator: personSortComparator,
    },
    {
      field: "PartsStatus",
      headerName: "Status części",
      flex: 0.3,
      valueGetter: (params) => params.row?.PartsStatus?.Status,
    },
    {
      field: "TaskStatus",
      headerName: "Status zadania",
      flex: 0.3,
      valueGetter: (params) => params.row?.TaskStatus?.Status,
    },
    {
      field: "Actions",
      headerName: "Akcje",
      width: 100,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              "& .MuiSvgIcon-root": {
                color: colors.greenAccent[400],
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

  return (
    <Box
      m="10px 0 0 0"
      height="100%"
      width="100%"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      <DataGrid
        rows={mockTasksData}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
}

export default Tasks;
