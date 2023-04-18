import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Box from "@mui/material/Box";

import { PageContainer, Sidebar } from "@/layouts/_layouts";

const Dashboard = lazy(() => import("@/features/Dashboard/Dashboard"));
const Machines = lazy(() => import("@/features/Tables/Machines/Machines"));
const NewMachine = lazy(() => import("@/features/Tables/Machines/NewMachine"));
const EditMachine = lazy(() =>
  import("@/features/Tables/Machines/EditMachine")
);
const Persons = lazy(() => import("@/features/Tables/Persons/Persons"));
const NewPerson = lazy(() => import("@/features/Tables/Persons/NewPerson"));
const EditPerson = lazy(() => import("@/features/Tables/Persons/EditPerson"));
const Tasks = lazy(() => import("@/features/Tables/Tasks/Tasks"));
const NewTask = lazy(() => import("@/features/Tables/Tasks/NewTask"));
const EditTask = lazy(() => import("@/features/Tables/Tasks/EditTask"));

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
            <Route path="/machines" element={<Machines />} />
            <Route path="/machines/new" element={<NewMachine />} />
            <Route path="/machines/edit/:id" element={<EditMachine />} />
            <Route path="/persons" element={<Persons />} />
            <Route path="/persons/new" element={<NewPerson />} />
            <Route path="/persons/edit/:id" element={<EditPerson />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<NewTask />} />
            <Route path="/tasks/edit/:id" element={<EditTask />} />
            <Route path="/*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </PageContainer>
    </Box>
  );
}
export default Admin;
