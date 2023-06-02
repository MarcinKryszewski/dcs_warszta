import useTheme from "@mui/material/styles/useTheme";

import PlaylistAdd from "@mui/icons-material/PlaylistAdd";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import { useLocation, useNavigate } from "react-router-dom";

import { tokens } from "@/assets/themes/theme";

export default function DefaultTableToolbar(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log;

  function AddButton() {
    //console.log(props[0]);
    navigate(`${location.pathname}${props[0]}`);
  }

  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button
        startIcon={
          <PlaylistAdd
            sx={{
              color: `${colors.greenAccent[400]} !important`,
            }}
          />
        }
        onClick={AddButton}
        sx={{ px: "5px", py: "4px" }}
      >
        <Typography
          color={colors.greenAccent[400]}
          sx={{ textShadow: `0px 0px 8px ${colors.greenAccent[300]}` }}
        >
          Dodaj
        </Typography>
      </Button>
    </GridToolbarContainer>
  );
}
