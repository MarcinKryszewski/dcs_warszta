import { Box, useTheme } from "@mui/material";
import { tokens } from "@/assets/themes/theme";
import React, { useContext, useEffect } from "react";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";
//import { HeaderTitle } from "layouts/PageContainer";

export default function Dashboard() {
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
  return <Box>Dashboard</Box>;
}
