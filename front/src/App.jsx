import React, { lazy, Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { ColorModeContext, useMode } from "@/assets/themes/theme";
import Admin from "@/pages/Admin";
import { AppContextProvider } from "@/context/AppContextProvider";
//import { UserContextProvider } from "@/context/UserContext";
//import { AuthContextProvider } from "@/context/AuthContext";

const Login = lazy(() => import("@/features/Login/Login"));

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Suspense fallback={<h1>Loading...</h1>}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin/*" element={<Admin />} />

                <Route
                  path="*"
                  element={<Navigate to="/admin/dashboard" replace />}
                />
              </Routes>
            </Suspense>
          </div>
        </ThemeProvider>
      </AppContextProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

//<Route
//                  path="*"
//                 element={<Navigate to="/admin/dashboard" replace />}
//              />
