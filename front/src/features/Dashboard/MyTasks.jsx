import { useContext } from "react";
import { Navigate } from "react-router-dom";

import Box from "@mui/material/Box";

import Tasks from "@/features/Tables/Tasks/Tasks";
import { mockTasksData } from "@/data/mock/mockTasks";
import { UserContext } from "@/context/UserContext";

export default function MyTasks() {
  const [user, setUser, isAuth, setIsAuth] = useContext(UserContext);
  const personalTasks = mockTasksData.filter(
    (task) =>
      `${task.Responsible.Name} ${task.Responsible.Surname}` ==
      `${user.Name} ${user.Surname}`
  );

  return (
    <Box height={"100%"}>
      {isAuth ? <Tasks tasksData={personalTasks} /> : <Navigate to="/login" />}
    </Box>
  );
}
