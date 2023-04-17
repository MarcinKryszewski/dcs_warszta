import Box from "@mui/material/Box";
import { Header } from "@/components/_components";
import React, { useState } from "react";
import { Footer, Navbar } from "@/layouts/_layouts";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";

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
