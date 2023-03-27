import { Box, Button } from "@mui/material";
import { Header } from "src/components/_components";
import React, { useState, createContext } from "react";
import { Footer, Navbar } from "src/layouts/_layouts";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";

const PageContainer = ({ children }) => {
  console.log("PageContainer");
  const [titleText, setTitleText] = useState([]);

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
        <HeaderTitleContext.Provider value={{ titleText, setTitleText }}>
          <Navbar />
          <Header />
          {children}
          {/*<Footer />*/}
        </HeaderTitleContext.Provider>
      </Box>
    </Box>
  );
};

export default PageContainer;
