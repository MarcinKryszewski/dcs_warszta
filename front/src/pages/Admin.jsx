import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Box from "@mui/material/Box";

import { PageContainer, Sidebar } from "@/layouts/_layouts";
import { RequireAuth } from "@/components/RequireAuth";

const Dashboard = lazy(() => import("@/features/Dashboard/Dashboard"));
const MyTask = lazy(() => import("@/features/Dashboard/MyTasks"));
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
const DetailsTask = lazy(() => import("@/features/Tables/Tasks/DetailsTask"));

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
            {/* PUBLIC */}

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/machines" element={<Machines />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<NewTask />} />

            <Route path="/mytask/details/:id" element={<DetailsTask />} />
            <Route path="/tasks/details/:id" element={<DetailsTask />} />

            {/* PRIVATE */}

            <Route path="/mytask" element={<MyTask />} />
            <Route path="/mytask/edit/:id" element={<EditTask />} />
            <Route path="/tasks/edit/:id" element={<EditTask />} />
            <Route path="/machines/new" element={<NewMachine />} />
            <Route path="/machines/edit/:id" element={<EditMachine />} />
            <Route path="/persons" element={<Persons />} />
            <Route path="/persons/new" element={<NewPerson />} />
            <Route path="/persons/edit/:id" element={<EditPerson />} />
            <Route element={<RequireAuth />}></Route>

            {/* CATCH ALL */}
            <Route path="/*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </PageContainer>
    </Box>
  );
}
export default Admin;
