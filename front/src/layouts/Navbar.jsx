import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { ColorModeContext, tokens } from "@/assets/themes/theme";
import { UserContext } from "@/context/UserContext";

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [user, setUser, isAuth, setIsAuth] = useContext(UserContext);

  const navigate = useNavigate();

  function LoginHandle() {
    return navigate("/login");
  }

  return (
    <Box display="flex" justifyContent="flex-end" p={0} width={"100%"}>
      <Box display="flex" alignItems="center">
        {isAuth && (
          <Typography
            mr={1}
            variant={"h5"}
            sx={{ color: colors.greenAccent[400] }}
          >
            Witaj {user.Name}!
          </Typography>
        )}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>

        <IconButton onClick={LoginHandle}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
