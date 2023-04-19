import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import LockOutlined from "@mui/icons-material/LockOutlined";

import { tokens } from "@/assets/themes/theme";
import { UserContext } from "@/context/UserContext";

export default function Login() {
  console.log("Login");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [errorText, setErrorText] = useState(undefined);
  const [user, setUser, isAuth, setIsAuth] = useContext(UserContext);

  function handleSubmit() {
    if (!user.Login)
      return (
        setErrorText("Nazwa użytkownika nie może być pusta!"),
        setUsernameError(true),
        setIsAuth(false)
      );
    if (!password)
      return (
        setErrorText("Pole hasła nie może być puste!"),
        setPasswordError(true),
        setIsAuth(false)
      );

    setUser({
      ...user,
      Login: user.Login,
      Name: "Damian",
      Surname: "Nowak",
    });
    setUsernameError(false);
    setPasswordError(false);
    setErrorText(null);
    setIsAuth(true);
    navigate(-1);
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
          value={user.login}
          onChange={(event) => setUser({ ...user, Login: event.target.value })}
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
            <Typography>ZAPISZ</Typography>
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
