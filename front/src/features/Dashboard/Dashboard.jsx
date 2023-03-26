import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "src/assets/themes/theme";
import React from "react";

function Dashboard() {
  console.log("Dashboard");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [];
  return <Box>Dashboard</Box>;
}

export default Dashboard;
