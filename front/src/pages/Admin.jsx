import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Box from "@mui/material/Box";

import { PageContainer, Sidebar } from "@/layouts/_layouts";
import RequireAuth from "@/components/RequireAuth";

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

const PartsStatusAdd = lazy(() =>
  import("@/features/Tables/Tasks/Status/PartsStatusAdd")
);
const PartsStatusEdit = lazy(() =>
  import("@/features/Tables/Tasks/Status/PartsStatusEdit")
);
const TaskStatusAdd = lazy(() =>
  import("@/features/Tables/Tasks/Status/TaskStatusAdd")
);
const TaskStatusEdit = lazy(() =>
  import("@/features/Tables/Tasks/Status/TaskStatusEdit")
);

const ROLES = {
  USER: 2001,
  ADMIN: 5150,
  MANAGER: 3241,
  ACCOUNTANT: 8432,
};

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
            <Route element={<RequireAuth allowedRoles={[ROLES.USER]} />}>
              <Route path="/mytask" element={<MyTask />} />
              <Route path="/mytask/edit/:id" element={<EditTask />} />
              <Route path="/tasks/edit/:id" element={<EditTask />} />

              <Route
                path="/tasks/edit/:id/partsStatusAdd"
                element={<PartsStatusAdd />}
              />
              <Route
                path="/mytask/edit/:id/partsStatusAdd"
                element={<PartsStatusAdd />}
              />

              <Route
                path="/tasks/edit/:taskid/partsStatusEdit/:statusid"
                element={<PartsStatusEdit />}
              />
              <Route
                path="/mytask/edit/:taskid/partsStatusEdit/:statusid"
                element={<PartsStatusEdit />}
              />

              <Route
                path="/tasks/edit/:id/taskStatusAdd"
                element={<TaskStatusAdd />}
              />
              <Route
                path="/mytask/edit/:id/taskStatusAdd"
                element={<TaskStatusAdd />}
              />

              <Route
                path="/tasks/edit/:taskid/taskStatusEdit/:statusid"
                element={<TaskStatusEdit />}
              />
              <Route
                path="/mytask/edit/:taskid/taskStatusEdit/:statusid"
                element={<TaskStatusEdit />}
              />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/machines/new" element={<NewMachine />} />
              <Route path="/machines/edit/:id" element={<EditMachine />} />
              <Route path="/persons" element={<Persons />} />
              <Route path="/persons/new" element={<NewPerson />} />
              <Route path="/persons/edit/:id" element={<EditPerson />} />
            </Route>

            {/* CATCH ALL */}
            <Route path="/*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </PageContainer>
    </Box>
  );
}
export default Admin;

//<Route path="/*" element={<Navigate to="/dashboard" replace />} />
