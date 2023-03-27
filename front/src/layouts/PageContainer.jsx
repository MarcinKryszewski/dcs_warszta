import { Box } from "@mui/material";
import { Header } from "src/components/_components";
import React, { useState } from "react";
import { Footer, Navbar } from "./_layouts";

const PageContainer = ({ children }) => {
  console.log("PageContainer");
  const [pageTitle, setPageTitle] = useState({ title: "", subtitle: "" });

  return (
    <Box sx={{ width: "calc(100% - 260px)" }} m={2.5}>
      <Box
        sx={{
          width: "100%",
          float: "right",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Navbar />
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        {children}
        {/*<Footer />*/}
      </Box>
    </Box>
  );
};

export default PageContainer;
