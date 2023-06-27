import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "@/api/axios";

import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { plPL } from "@mui/x-data-grid";

import { tokens } from "@/assets/themes/theme";
import { DefaultTableToolbar, DataGrid } from "@/components/_components";
import Edit from "@mui/icons-material/Edit";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";
import { DeletePerson } from "@/features/Tables/Persons/DeletePerson";

import { mockUsersData } from "@/data/mock/mockUsers";

function Persons(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [person, setPerson] = useState({ id: 0, Name: "", Surname: "" });
  const [persons, setPersons] = useState({ id: 0, Name: "", Surname: "" });

  async function PersonsDataRetriever() {
    if (import.meta.env.VITE_MOCK_DATA) return setPersons(mockUsersData);
    const res = await axios.get("/dcs/person/all");
    const data = res.data;
    setPersons(data);
  }

  useEffect(() => {
    PersonsDataRetriever();
  }, []);

  useEffect(
    () =>
      setTitleText({
        title: "Osoby",
        subtitle: "Lista osób",
      }),
    []
  );

  function EditHandle(row) {
    navigate(`${location.pathname}/edit/${row.Id}`, { state: { row: row } });
  }
  function RemoveHandle(row) {
    setPerson(row);

    setOpen(true);
  }

  if (deleted) {
    PersonsDataRetriever();
    setDeleted(false);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 50, minWidth: 50 },
    { field: "Name", headerName: "Imię", flex: 1 },
    { field: "Surname", headerName: "Nazwisko", flex: 1 },
    { field: "Login", headerName: "Login", flex: 1 },
    { field: "Password", headerName: "Hasło", flex: 1 },
    {
      field: "Role.Name",
      headerName: "Uprawnienia",
      flex: 1,
      valueGetter: (params) => params.row.Role.Name,
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
        rows={persons}
        getRowId={(row) => row.Id}
        columns={columns}
        components={{ Toolbar: DefaultTableToolbar }}
        componentsProps={{ toolbar: ["/new"] }}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
      />
      <DeletePerson
        state={{ open, setOpen }}
        person={{ person }}
        action={{ deleted, setDeleted }}
      />
    </Box>
  );
}

export default Persons;
