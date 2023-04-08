import { Box, Button, useTheme, useThemeProps } from "@mui/material";
import { plPL } from "@mui/x-data-grid";
import { tokens } from "src/assets/themes/theme";
import React, { useContext, useEffect, useState } from "react";
import { DefaultTableToolbar, DataGrid } from "src/components/_components";
import { mockUsersData } from "src/data/mock/mockUsers";
import { Edit, RemoveCircle } from "@mui/icons-material";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";
import { useLocation, useNavigate } from "react-router-dom";
import DeletePerson from "./DeletePerson";

function Persons() {
  console.log("Persons");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const gridData = mockUsersData;
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [person, setPerson] = useState({ id: 0, Name: "", Surname: "" });

  useEffect(
    () =>
      setTitleText({
        title: "Persons",
        subtitle: "Persons table",
      }),
    []
  );

  function EditHandle(row) {
    navigate(`${location.pathname}/edit/${row.id}`, { state: { row: row } });
  }
  function RemoveHandle(row) {
    setPerson(row);
    setOpen(true);
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
        rows={gridData}
        columns={columns}
        components={{ Toolbar: DefaultTableToolbar }}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
      />
      <DeletePerson state={{ open, setOpen }} person={{ person }} />
    </Box>
  );
}

export default Persons;
