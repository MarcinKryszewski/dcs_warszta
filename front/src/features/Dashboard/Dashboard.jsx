import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "src/assets/themes/theme";
import React, { useContext, useEffect } from "react";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";
import { mockTasksData } from "src/data/mock/mockTasks";
import { StatBox } from "src/components/StatBox";
import {
  ChangeCircle,
  CheckCircle,
  Report,
  ThumbUpAlt,
} from "@mui/icons-material";
//import { HeaderTitle } from "src/layouts/PageContainer";

export default function Dashboard() {
  console.log("Dashboard");

  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const dashboardData = mockTasksData;
  const tasksStatus = {
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
  };
  const allTasks = tasksStatus.done + tasksStatus.late + tasksStatus.ongoing;

  console.log(allTasks);

  useEffect(
    () =>
      setTitleText({
        title: "Dashboard",
        subtitle: "Awesome dashboard",
      }),
    []
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Typography variant="h2" my={2}>
        STATUS ZADAŃ
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

      <Typography variant="h2" my={2}>
        STATUS ZADAŃ
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
    </Box>
  );
}
