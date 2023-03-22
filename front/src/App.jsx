import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./assets/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

//################TEMP###############

import Admin from "./pages/Admin";

//###################################

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route path="/admin/*" element={<Admin />} />  
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />      
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;