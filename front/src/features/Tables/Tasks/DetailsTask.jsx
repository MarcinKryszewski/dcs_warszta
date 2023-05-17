import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";

import { HeaderTitleContext } from "@/context/HeaderTitleContext";
import { tokens } from "@/assets/themes/theme";
import TaskStatus from "@/components/TaskStatus";
import PartsStatus from "@/components/PartsStatus";

export default function DetailsTask(props) {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  useEffect(() => {
    setTitleText({
      title: "Działania",
      subtitle: "Szczegóły działania",
    });
  }, []);

  return (
    <Box width={"100%"} height={"100%"}>
      <Stack
        direction={"row"}
        spacing={5}
        width={"100%"}
        height={"100%"}
        mt={2}
      >
        <Stack direction={"row"} spacing={3} width={"100%"}>
          <Stack width={"100%"} spacing={2} mr={4}>
            <Stack spacing={2} direction={"row"} mb={3}>
              <Avatar sx={{ bgcolor: theme.palette.error.main }}>A</Avatar>
              <Typography variant="h2">DCS</Typography>
            </Stack>
            <TextField
              label="Linia"
              defaultValue="RB1"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />

            <TextField
              label="Maszyna"
              defaultValue="Monoblok"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />

            <TextField
              label="Odpowiedzialny"
              defaultValue="Paweł Brzozowski"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />

            <TextField
              label="Opis"
              defaultValue="Monoblok się zepsuł"
              multiline
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
            <Stack direction="row" spacing={5} justifyContent="center">
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
        </Stack>
        <Stack direction={"column"} spacing={2} width={"100%"} mt={5}>
          <Box height={"100%"}>
            <Typography>Status zadania</Typography>
            <TaskStatus />
          </Box>
          <Box height={"100%"}>
            <Typography>Status części</Typography>
            <PartsStatus />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
