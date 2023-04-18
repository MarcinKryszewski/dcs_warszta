import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Stack from "@mui/material/Stack";

import { tokens } from "@/assets/themes/theme";
//import ProgressCircle from "./ProgressCircle";

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
