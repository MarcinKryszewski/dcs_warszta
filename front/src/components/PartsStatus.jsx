import { useContext, useEffect, useState } from "react";

import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { plPL } from "@mui/x-data-grid";

import { DefaultTableToolbar, DataGrid } from "@/components/_components";
import { tokens } from "@/assets/themes/theme";

export default function PartsStatus() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const mockData = [
    {
      id: 1,
      date: "DATA",
      person: "OSOBA",
      status: "STATUS",
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
      status: "STATUS",
      comment: "KOMENTARZ",
    },
    {
      id: 4,
      date: "DATA",
      person: "OSOBA",
      status: "STATUS",
      comment: "KOMENTARZ",
    },
    {
      id: 5,
      date: "DATA",
      person: "OSOBA",
      status: "STATUS",
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
  ];

  return (
    <Box
      height="90%"
      /*m="10px 0 0 0"
      height="100%"
      width="100%"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
      }}*/
    >
      <DataGrid
        rows={mockData}
        columns={columns}
        //components={{ Toolbar: DefaultTableToolbar }}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
        columnVisibilityModel={{
          Area: false,
          Machine: false,
        }}
        hideFooter
      />
    </Box>
  );
}
