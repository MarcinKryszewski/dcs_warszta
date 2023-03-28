import React, { lazy, Suspense } from "react";
import { PageContainer, Sidebar } from "src/layouts/_layouts";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

const Dashboard = lazy(() => import("src/features/Dashboard/Dashboard"));
const Machines = lazy(() => import("src/features/Tables/Machines"));
const Persons = lazy(() => import("src/features/Tables/Persons"));
const Tasks = lazy(() => import("src/features/Tables/Tasks"));

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
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tables/machines" element={<Machines />} />
            <Route path="/tables/persons" element={<Persons />} />
            <Route path="/tables/tasks" element={<Tasks />} />
            <Route path="/*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </PageContainer>
    </Box>
  );
}
export default Admin;
