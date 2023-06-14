import { useLocation, useNavigate } from "react-router-dom";

import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { plPL } from "@mui/x-data-grid";

import Edit from "@mui/icons-material/Edit";

import { DefaultTableToolbar, DataGrid } from "@/components/_components";
import { tokens } from "@/assets/themes/theme";

export default function TaskStatus(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();

  function EditHandle(row) {
    navigate(`${location.pathname}/taskStatusEdit/${row.id}`, {
      state: { row: row },
    });
  }

  const mockData = [
    {
      id: 1,
      date: "DATA",
      person: "OSOBA",
      status: "WYKONANE",
      comment: "KOMENTARZ",
    },
    {
      id: 2,
      date: "DATA",
      person: "OSOBA",
      status: "STATUS",
      comment: "KOMENTARZ",
    },
    {
      id: 3,
      date: "DATA",
      person: "OSOBA",
      status: "WYKONANE",
      comment: "KOMENTARZ",
    },
    {
      id: 4,
      date: "DATA",
      person: "OSOBA",
      status: "ZATWIERDZONE",
      comment: "KOMENTARZ",
    },
    {
      id: 5,
      date: "DATA",
      person: "OSOBA",
      status: "ZATWIERDZONE",
      comment: "KOMENTARZ",
    },
    {
      id: 6,
      date: "DATA",
      person: "OSOBA",
      status: "STATUS",
      comment: "KOMENTARZ",
    },
    {
      id: 7,
      date: "DATA",
      person: "OSOBA",
      status: "STATUS",
      comment: "KOMENTARZ",
    },
    {
      id: 8,
      date: "DATA",
      person: "OSOBA",
      status: "STATUS",
      comment: "KOMENTARZ",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "date", headerName: "Data" },
    { field: "person", headerName: "Osoba" },
    { field: "status", headerName: "Status" },
    { field: "comment", headerName: "Komentarz" },
    ...(props.editable == true
      ? [
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

                    "& .MuiButtonBase-root": {
                      minWidth: 30,
                      maxWidth: 30,
                      p: 1,
                    },
                  }}
                >
                  <Button onClick={() => EditHandle(params.row)}>
                    <Edit />
                  </Button>
                </Box>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <Box height="90%">
      {props.taskbar == true ? (
        <DataGrid
          rows={mockData}
          columns={columns}
          components={{ Toolbar: DefaultTableToolbar }}
          componentsProps={{ toolbar: ["/taskStatusAdd"] }}
          localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
          columnVisibilityModel={{
            Area: false,
            Machine: false,
          }}
          hideFooter
        />
      ) : (
        <DataGrid
          rows={mockData}
          columns={columns}
          localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
          columnVisibilityModel={{
            Area: false,
            Machine: false,
          }}
          hideFooter
        />
      )}
    </Box>
  );
}
