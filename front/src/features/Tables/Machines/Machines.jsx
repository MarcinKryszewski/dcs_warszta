import { Box, Button, useTheme } from "@mui/material";
import { plPL } from "@mui/x-data-grid";
import { tokens } from "src/assets/themes/theme";
import React, { useContext, useEffect, useState } from "react";
import { DefaultTableToolbar, DataGrid } from "src/components/_components";
import { mockMachinesData } from "src/data/mock/mockMachines";
import { Edit, RemoveCircle } from "@mui/icons-material";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteMachine from "./DeleteMachine";

function Machines() {
  console.log("Machines");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { titleText, setTitleText } = useContext(HeaderTitleContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [machine, setMachine] = useState({ id: 0, Area: "", MachineName: "" });

  useEffect(
    () =>
      setTitleText({
        title: "Maszyny",
        subtitle: "Lista maszyn",
      }),
    []
  );

  function EditHandle(row) {
    console.log(location.pathname);
    navigate(`${location.pathname}/edit/${row.id}`, { state: { row: row } });
  }

  function RemoveHandle(row) {
    setMachine(row);
    setOpen(true);
  }

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
            <Button onClick={() => EditHandle(params.row)}>
              <Edit />
            </Button>
            <Button onClick={() => RemoveHandle(params.row)}>
              <RemoveCircle />
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
        rows={mockMachinesData}
        columns={columns}
        components={{ Toolbar: DefaultTableToolbar }}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
      />
      <DeleteMachine state={{ open, setOpen }} machine={{ machine }} />
    </Box>
  );
}

export default Machines;
