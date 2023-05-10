import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

//import { useAuth } from "@/hooks/useAuth";
import AuthContext from "@/context/AuthContext";

export function RequireAuth() {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
