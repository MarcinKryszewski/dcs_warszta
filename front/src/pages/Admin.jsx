import React from "react";
import { PageContainer, Sidebar } from "../layouts/_layouts";
import { Dashboard, Machines } from "../features/_features";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

function Admin() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
    >
      <Sidebar />
      <PageContainer>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tables/machines" element={<Machines />} />
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </PageContainer>
    </Box>
  );
}
export default Admin;
