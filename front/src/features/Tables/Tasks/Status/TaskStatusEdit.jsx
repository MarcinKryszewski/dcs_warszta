import { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import useTheme from "@mui/material/styles/useTheme";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { tokens } from "@/assets/themes/theme";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";

export default function TaskStatusEdit() {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const { state } = useLocation();

  const taskId = useParams().id;
  const statuses = ["W TRAKCIE", "WYKONANE", "ZATWIERDZONE", "SPÓŹNIONE"];
  const [taskStatus, setTaskStatus] = useState({
    status: "",
    comment: "",
  });

  useEffect(() => {
    setTitleText({
      title: "Status działania",
      subtitle: "Edytuj status",
    });
    setTaskStatus({
      status: state.row.status,
      comment: state.row.status.comment,
    });
    console.log(taskStatus);
  }, []);

  console.log(state.row.status);

  function TaskStatusColor(status) {
    if (status == "W TRAKCIE") return theme.palette.info.main;
    if (status == "WYKONANE") return theme.palette.warning.main;
    if (status == "ZATWIERDZONE") return theme.palette.success.main;
    if (status == "SPÓŹNIONE") return theme.palette.error.main;
  }

  return (
    <Box ml={2} mt={4}>
      <Stack direction="column" spacing={3} width={"100%"} height={"100%"}>
        <Stack direction="row" spacing={3} width={"100%"} height={"100%"}>
          <Stack spacing={2} width={"30%"}>
            {statuses.map((StatusText) => (
              <Button
                onClick={() =>
                  setTaskStatus({ ...taskStatus, status: StatusText })
                }
              >
                <Box
                  key={StatusText}
                  width="90%"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor={() => TaskStatusColor(StatusText)}
                  borderRadius="4px"
                  height={"100%"}
                  border={
                    taskStatus.status == StatusText ? "5px solid" : "0px solid"
                  }
                  borderColor={"white"}
                >
                  <Typography color={colors.grey[700]} sx={{ fontWeight: 600 }}>
                    {StatusText}
                  </Typography>
                </Box>
              </Button>
            ))}
          </Stack>
          <TextField
            label="OPIS"
            multiline
            minRows={8}
            height={"100%"}
            width={"100%"}
            sx={{
              width: "100%",
              height: "100%",
            }}
            value={taskStatus.comment}
            /*onChange={(event) =>
              setTask({ ...task, Description: event.target.value })
            }*/
            //error={!task.Description ? true : false}
            color="secondary"
            /*sx={{
              "& fieldset": {
                borderColor:
                  task.Description == ""
                    ? theme.palette.error.main
                    : colors.greenAccent[400],
              },
              width: "100%",
            }}*/
          />
        </Stack>
        <Stack direction="row" spacing={5} justifyContent="center">
          <Button
            variant="contained"
            color="success"
            onClick={() => CreateTask()}
            sx={{ boxShadow: `0 0 10px 1px ${colors.greenAccent[400]};` }}
          >
            <Typography>ZAPISZ</Typography>
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={() => navigate(-1)}
            sx={{ boxShadow: `0 0 10px 1px ${colors.blueAccent[400]};` }}
          >
            <Typography>WYJDŹ</Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

/*

<Box
            width="90%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={() => TaskStatusColor(Status)}
            borderRadius="4px"
          >
            <Typography color={colors.grey[700]} sx={{ fontWeight: 600 }}>
              {Status}
            </Typography>
          </Box>

          */
