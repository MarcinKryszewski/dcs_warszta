import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";

import Edit from "@mui/icons-material/Edit";
import RemoveCircle from "@mui/icons-material/RemoveCircle";

import { plPL } from "@mui/x-data-grid";

import { tokens } from "@/assets/themes/theme";
import { DefaultTableToolbar, DataGrid } from "@/components/_components";
import { mockMachinesData } from "@/data/mock/mockMachines";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";
import DeleteMachine from "@/features/Tables/Machines/DeleteMachine";

function Machines(machinesData) {
  console.log("Machines");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { titleText, setTitleText } = useContext(HeaderTitleContext);

  const gridData = import.meta.env.VITE_MOCK_DATA
    ? mockMachinesData
    : machinesData;

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
        rows={gridData}
        columns={columns}
        components={{ Toolbar: DefaultTableToolbar }}
        componentsProps={{ toolbar: ["/new"] }}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
      />
      <DeleteMachine state={{ open, setOpen }} machine={{ machine }} />
    </Box>
  );
}

export default Machines;
