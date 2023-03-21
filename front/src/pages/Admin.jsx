import React from "react";
import { PageContainer, Sidebar } from "../layouts/_layouts";
import { Dashboard, Tables } from "../features/_features";
import { Route, Routes } from "react-router-dom";

function Admin() {
  return (
    <div>
      <Sidebar />
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