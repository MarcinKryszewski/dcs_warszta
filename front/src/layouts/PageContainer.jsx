import { Box } from "@mui/material";
import React from "react";
import { Sidebar, Footer, Navbar } from "./_layouts";

const PageContainer = ({children}) => {
  console.log("PageContainer")
  return (
    <div>      
      <Box sx={{ width: "calc(100% - 260px)", float: "right" }}>
        <Navbar />
        {children}
        <Footer />
      </Box>
    </div>
  );;
}

export default PageContainer;
