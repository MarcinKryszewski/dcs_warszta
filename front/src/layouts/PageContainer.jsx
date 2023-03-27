import { Box, Button } from "@mui/material";
import { Header } from "src/components/_components";
import React, { useState, createContext } from "react";
import { Footer, Navbar } from "./_layouts";

export const HeaderTitle = createContext({
  title: { title: "en", subtitle: "aaa" },
  setTitle: () => {},
});

const PageContainer = ({ children }) => {
  console.log("PageContainer");

  const [headerTitleValue, setHeaderTitleValue] = useState({
    title: "",
    subtitle: "",
  });

  function setupTitle(title, subtitle) {
    setHeaderTitleValue({ title: title, subtitle: subtitle });
  }
  //{ title: "", subtitle: "" }

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
        <HeaderTitle.Provider value={[headerTitleValue, setHeaderTitleValue]}>
          <Navbar />
          <Header
            title={headerTitleValue.title}
            subtitle={headerTitleValue.subtitle}
          />

          {children}
          {/*<Footer />*/}
        </HeaderTitle.Provider>
      </Box>
    </Box>
  );
};

export default PageContainer;

//<Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
