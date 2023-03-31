import { useTheme } from "@emotion/react";
import { PlaylistAdd } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "src/assets/themes/theme";

function DefaultTableToolbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  function testButton() {
    navigate(`${location.pathname}/new`);
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
        onClick={testButton}
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

export default DefaultTableToolbar;
