import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

//################TEMP###############

import Admin from "./pages/Admin";

//###################################

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />  
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />      
      </Routes>
    </div>
  );
}

export default App;