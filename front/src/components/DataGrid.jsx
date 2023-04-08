import { styled } from "@mui/material/styles";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";

const DataGrid = styled(MuiDataGrid)(({ theme }) => ({
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
    backgroundColor: theme.palette.neutral.darker,
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
    borderRadius: 8,
    backgroundColor: theme.palette.neutral.mainLighter,
    minHeight: 24,
    border: "3px solid " + theme.palette.neutral.darker,
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:focus": {
    backgroundColor: theme.palette.secondary.light,
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:active": {
    backgroundColor: theme.palette.secondary.light,
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.secondary.light,
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-corner": {
    backgroundColor: theme.palette.neutral.darker,
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
  },
  "& .name-column--cell": {
    color: theme.palette.secondary.light,
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.tertiary.dark,
    borderBottom: "none",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "none",
    backgroundColor: theme.palette.tertiary.dark,
  },
  "& .MuiDataGrid-virtualScroller": {
    backgroundColor: theme.palette.primary.mainDarker,
  },
  "& .MuiCheckbox-root": {
    color: `${theme.palette.secondary.light} !important`,
  },
  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
    color: `${theme.palette.neutral.light} !important`,
  },
}));

export default DataGrid;

/*
"& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: theme.palette.secondary.light,
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.tertiary.dark,
          borderBottom: "none",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: theme.tertiary.dark,
        },
        "& .MuiCheckbox-root": {
          color: `${theme.secondary.light} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.neutral.light} !important`,
        },
  */
