import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "src/assets/themes/theme";
import React, { useContext, useEffect } from "react";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";
//import { HeaderTitle } from "src/layouts/PageContainer";

function Dashboard() {
  console.log("Dashboard");

  const { titleText, setTitleText } = useContext(HeaderTitleContext);

  useEffect(
    () =>
      setTitleText({
        title: "Dashboard",
        subtitle: "Awesome dashboard",
      }),
    []
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [];
  return <Box>Dashboard</Box>;
}

export default Dashboard;
