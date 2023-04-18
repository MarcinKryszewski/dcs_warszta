import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";

import App from "@/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/dcs">
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
