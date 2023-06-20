import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
//import AuthContext from "@/context/AuthContext";

export default function RequireAuth({ allowedRoles }) {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  return allowedRoles.find((role) => role == auth.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
