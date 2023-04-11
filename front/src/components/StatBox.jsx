import { Box, Stack, Typography, useTheme } from "@mui/material";
import { tokens } from "src/assets/themes/theme";
import ProgressCircle from "./ProgressCircle";

export const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={0} display="flex" justifyContent="center">
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
          <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
            {subtitle}
          </Typography>
        </Stack>
        <Box mr={1}>{icon}</Box>
      </Stack>
    </Box>
  );
};
