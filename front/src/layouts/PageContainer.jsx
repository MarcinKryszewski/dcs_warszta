import { Box } from "@mui/material";
import React from "react";
import { Footer, Navbar } from "./_layouts";

const PageContainer = ({children}) => {
  console.log("PageContainer")
  return (
    <Box sx={{ width: "calc(100% - 260px)",}} >      
      <Box sx={{ width: "100%", float: "right",}}>
        <Navbar />
        {children}
        <Footer />
      </Box>
    </Box>
  );;
}

export default PageContainer;
