import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "@/api/axios";

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

function Machines(props) {
  console.log("Machines");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { titleText, setTitleText } = useContext(HeaderTitleContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [machine, setMachine] = useState({ id: 0, Area: "", MachineName: "" });
  const [machines, setMachines] = useState({
    id: 0,
    Area: "",
    MachineName: "",
  });

  async function MachinesDataRetriever() {
    if (props.machinesData) return setMachines(props.machinesData);
    if (import.meta.env.VITE_MOCK_DATA) return setMachines(mockMachinesData);

    const res = await axios.get("/dcs/machine/all");
    const data = res.data;
    setMachines(data);
  }

  useEffect(() => {
    MachinesDataRetriever();
  }, []);

  useEffect(
    () =>
      setTitleText({
        title: "Maszyny",
        subtitle: "Lista maszyn",
      }),
    []
  );

  function EditHandle(row) {
    //navigate(`${location.pathname}/edit/${row.Id}`, { state: { row: row } });
  }

  function RemoveHandle(row) {
    /* setMachine(row);
    setOpen(true); */
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
        rows={machines}
        getRowId={(row) => row.Id}
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
