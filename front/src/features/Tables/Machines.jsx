import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, plPL } from "@mui/x-data-grid";
import { tokens } from "src/assets/themes/theme";
import React, { useContext, useEffect } from "react";

import { mockMachinesData } from "src/data/mock/mockMachines";
import { Edit, RemoveCircle } from "@mui/icons-material";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";

function Machines() {
  console.log("Machines");
  const { titleText, setTitleText } = useContext(HeaderTitleContext);

  useEffect(
    () =>
      setTitleText({
        title: "Machines",
        subtitle: "Machines table",
      }),
    []
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", width: 50, minWidth: 50 },
    { field: "Area", headerName: "Obszar", flex: 1 },
    { field: "MachineName", headerName: "Nazwa maszyny", flex: 3 },
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
        rows={mockMachinesData}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
}

export default Machines;
