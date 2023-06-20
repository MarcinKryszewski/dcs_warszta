import { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "@/api/axios";
const LOGIN_URL = "/dcs/auth";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import LockOutlined from "@mui/icons-material/LockOutlined";

import { tokens } from "@/assets/themes/theme";

//import { Authorization } from "@/services/authorization";
import useAuth from "@/hooks/useAuth";

import UserContext from "@/context/UserContext";
import AuthContext from "@/context/AuthContext";

export default function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //const { auth, setAuth } = useContext(AuthContext);
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [userName, setUserName] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setErrorText("");
  }, [userName, password]);

  async function handleSubmit() {
    if (!userName)
      return (
        setErrorText("Nazwa użytkownika nie może być pusta!"),
        setUsernameError(true)
      );
    if (!password)
      return (
        setErrorText("Pole hasła nie może być puste!"), setPasswordError(true)
      );

    const user = { username: userName, password: password };

    try {
      const response = await axios.post(LOGIN_URL, user);
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      console.log(response.data);

      setAuth(response.data);

      setUserName("");
      setPassword("");

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrorText("Brak odpowiedzi od serwera");
      } else if (err.response?.status === 400) {
        setErrorText("Brakujące dane logowanie");
      } else if (err.response?.status === 401) {
        setErrorText("Błędny login lub hasło");
      } else {
        setErrorText("Nieudane logowanie");
      }
    }
  }

  return (
    <Box
      mt={5}
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}
        width={"20%"}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logowanie
        </Typography>
        <TextField
          required
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          fullWidth
          label="Login"
          autoFocus
          error={usernameError}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: colors.greenAccent[400],
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.greenAccent[400],
              },
            },
            "& .MuiInputLabel-shrink": {
              color: `${colors.greenAccent[400]} !important;`,
            },
            width: "100%",
          }}
        />
        <TextField
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          label="Hasło"
          type="password"
          error={passwordError}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: colors.greenAccent[400],
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.greenAccent[400],
              },
            },
            "& .MuiInputLabel-shrink": {
              color: `${colors.greenAccent[400]} !important;`,
            },
            width: "100%",
          }}
        />
        <Stack direction="row" spacing={5} justifyContent="center">
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            sx={{ boxShadow: `0 0 10px 1px ${colors.greenAccent[400]};` }}
          >
            <Typography>ZALOGUJ SIĘ</Typography>
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={() => navigate(-1)}
            sx={{ boxShadow: `0 0 10px 1px ${colors.blueAccent[400]};` }}
          >
            <Typography>WRÓĆ</Typography>
          </Button>
        </Stack>
        <Typography color={theme.palette.error.main} variant="h5">
          {errorText}
        </Typography>
      </Stack>
    </Box>
  );
}
