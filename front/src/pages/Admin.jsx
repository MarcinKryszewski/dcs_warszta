import React from "react";
import { PageContainer } from "../layouts/_layouts";
import { Dashboard, Tables } from "../features/_features";

//################TEMP###############

import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";

//################TEMP###############

function Admin() {
  return (
    <div>
      <PageContainer>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tables" element={<Tables />} />
        </Routes>
      </PageContainer>
    </div>
  );
}
export default Admin;