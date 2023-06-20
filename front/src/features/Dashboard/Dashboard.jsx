import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "@/api/axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import ChangeCircle from "@mui/icons-material/ChangeCircle";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Report from "@mui/icons-material/Report";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";

import { tokens } from "@/assets/themes/theme";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";
import { StatBox } from "@/components/StatBox";
import UserContext from "@/context/UserContext";
import { mockTasksData } from "@/data/mock/mockTasks";
import AuthContext from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";

export default function Dashboard() {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //console.log(sessionStorage.getItem("user"));
  //Authorization()

  const { user, setUser } = useContext(UserContext);
  const { auth, setAuth } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState({});
  const [tasksStatus, setTasksStatus] = useState({
    late: 0,
    done: 0,
    ongoing: 0,
    confirmed: 0,
  });

  const [personalTasksStatus, setPersonalTasksStatus] = useState({
    late: 0,
    done: 0,
    ongoing: 0,
    confirmed: 0,
  });

  //const dashboardData = axios.get("/dcs/task/all").data; //mockTasksData;

  async function dashboardDataAxios() {
    //console.log("FETCHING DATA");
    //console.log(await axios.get("/dcs/parts-status/last", 1).data);
    const res = await axios.get("/dcs/task/all");
    console.log(res.data);
    setDashboardData(res.data);

    setTasksStatus({
      late: dashboardData.filter(
        (task) => task.TaskStatus.LastStatus == "SPÓŹNIONE"
      ).length,
      done: dashboardData.filter(
        (task) => task.TaskStatus.LastStatus == "WYKONANE"
      ).length,
      ongoing: dashboardData.filter(
        (task) => task.TaskStatus.LastStatus == "W TRAKCIE"
      ).length,
      confirmed: dashboardData.filter(
        (task) => task.TaskStatus.LastStatus == "ZATWIERDZONE"
      ).length,
    });

    const personalTasks = dashboardData.filter(
      (task) =>
        `${task.Responsible.Name} ${task.Responsible.Surname}` ==
        `${user.Name} ${user.Surname}`
    );

    setPersonalTasksStatus({
      late: personalTasks.filter(
        (task) => task.TaskStatus.LastStatus == "SPÓŹNIONE"
      ).length,
      done: personalTasks.filter(
        (task) => task.TaskStatus.LastStatus == "WYKONANE"
      ).length,
      ongoing: personalTasks.filter(
        (task) => task.TaskStatus.LastStatus == "W TRAKCIE"
      ).length,
      confirmed: personalTasks.filter(
        (task) => task.TaskStatus.LastStatus == "ZATWIERDZONE"
      ).length,
    });

    console.log(dashboardData);
  }

  useEffect(() => {
    dashboardDataAxios();
  }, []);

  /*const tasksStatus = {
    late: dashboardData.filter((task) => task.TaskStatus.Status == "SPÓŹNIONE")
      .length,
    done: dashboardData.filter((task) => task.TaskStatus.Status == "WYKONANE")
      .length,
    ongoing: dashboardData.filter(
      (task) => task.TaskStatus.Status == "W TRAKCIE"
    ).length,
    confirmed: dashboardData.filter(
      (task) => task.TaskStatus.Status == "ZATWIERDZONE"
    ).length,
  };*/

  /*const personalTasks = dashboardData.filter(
    (task) =>
      `${task.Responsible.Name} ${task.Responsible.Surname}` ==
      `${user.Name} ${user.Surname}`
  );
  const personalTasksStatus = {
    late: personalTasks.filter((task) => task.TaskStatus.Status == "SPÓŹNIONE")
      .length,
    done: personalTasks.filter((task) => task.TaskStatus.Status == "WYKONANE")
      .length,
    ongoing: personalTasks.filter(
      (task) => task.TaskStatus.Status == "W TRAKCIE"
    ).length,
    confirmed: personalTasks.filter(
      (task) => task.TaskStatus.Status == "ZATWIERDZONE"
    ).length,
  };*/
  const allTasks = tasksStatus.done + tasksStatus.late + tasksStatus.ongoing;

  useEffect(
    () =>
      setTitleText({
        title: "Dashboard",
        subtitle: "Dashboard DCS",
      }),
    []
  );

  /*const [authorizationHandler] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    async function autoLogin() {
      await authorizationHandler();
      //if (auth == true) navigate(-1);
    }
    autoLogin();
  }, [auth]);*/

  return (
    <Box>
      <Typography variant="h2" my={2}>
        ZADANIA DCS
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        sx={{
          "& .MuiBox-root:hover": {
            cursor: "pointer",
          },
          "& [aria-label=buttonBox]:hover": {
            outline: `thick solid ${colors.greenAccent[400]}`,
          },
        }}
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          aria-label="buttonBox"
          onClick={(event) => {
            console.log("1");
          }}
        >
          <StatBox
            title={tasksStatus.late}
            subtitle="SPÓŹNIONE"
            icon={
              <Report
                sx={{ color: theme.palette.error.main, fontSize: "5rem" }}
              />
            }
          ></StatBox>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          aria-label="buttonBox"
        >
          <StatBox
            title={tasksStatus.done}
            subtitle="GOTOWE DO ZATWIERDZENIA"
            icon={
              <ThumbUpAlt
                sx={{ color: theme.palette.warning.main, fontSize: "5rem" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          aria-label="buttonBox"
        >
          <StatBox
            title={tasksStatus.ongoing}
            subtitle="W TRAKCIE"
            icon={
              <ChangeCircle
                sx={{ color: theme.palette.info.main, fontSize: "5rem" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          aria-label="buttonBox"
        >
          <StatBox
            title={tasksStatus.confirmed}
            subtitle="WYKONANE"
            icon={
              <CheckCircle
                sx={{ color: theme.palette.success.main, fontSize: "5rem" }}
              />
            }
          />
        </Box>
      </Box>

      {auth ? (
        <Box>
          <Typography variant="h2" my={2}>
            MOJE ZADANIA
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            sx={{
              "& .MuiBox-root:hover": {
                cursor: "pointer",
              },
              "& [aria-label=buttonBox]:hover": {
                outline: `thick solid ${colors.greenAccent[400]}`,
              },
            }}
          >
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              aria-label="buttonBox"
              onClick={(event) => {
                console.log("1");
              }}
            >
              <StatBox
                title={personalTasksStatus.late}
                subtitle="SPÓŹNIONE"
                icon={
                  <Report
                    sx={{ color: theme.palette.error.main, fontSize: "5rem" }}
                  />
                }
              ></StatBox>
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              aria-label="buttonBox"
            >
              <StatBox
                title={personalTasksStatus.done}
                subtitle="GOTOWE DO ZATWIERDZENIA"
                icon={
                  <ThumbUpAlt
                    sx={{ color: theme.palette.warning.main, fontSize: "5rem" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              aria-label="buttonBox"
            >
              <StatBox
                title={personalTasksStatus.ongoing}
                subtitle="W TRAKCIE"
                icon={
                  <ChangeCircle
                    sx={{ color: theme.palette.info.main, fontSize: "5rem" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              aria-label="buttonBox"
            >
              <StatBox
                title={personalTasksStatus.confirmed}
                subtitle="WYKONANE"
                icon={
                  <CheckCircle
                    sx={{ color: theme.palette.success.main, fontSize: "5rem" }}
                  />
                }
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
}
