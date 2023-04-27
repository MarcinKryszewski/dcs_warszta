import { useContext } from "react";
import { Navigate } from "react-router-dom";

import Box from "@mui/material/Box";

import Tasks from "@/features/Tables/Tasks/Tasks";
import { mockTasksData } from "@/data/mock/mockTasks";
import useAuth from "@/hooks/useAuth";

import UserContext from "@/context/UserContext";
import AuthContext from "@/context/AuthContext";

export default function MyTasks() {
  const { user, setUser } = useContext(UserContext);
  const { auth, setAuth } = useContext(AuthContext);

  //const [authorized, authorizationHandler] = useAuth();
  const personalTasks = mockTasksData.filter(
    (task) =>
      `${task.Responsible.Name} ${task.Responsible.Surname}` ==
      `${user.Name} ${user.Surname}`
  );

  //console.log(user);

  return (
    <Box height={"100%"}>
      {auth ? <Tasks tasksData={personalTasks} /> : <Navigate to="/login" />}
    </Box>
  );
}
