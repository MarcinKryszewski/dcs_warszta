import { Typography, Box, useTheme } from "@mui/material";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";
import { useContext } from "react";
import { tokens } from "@/assets/themes/theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { titleText, setTitleText } = useContext(HeaderTitleContext);

  return (
    <Box mb="10px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {titleText.title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {titleText.subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
