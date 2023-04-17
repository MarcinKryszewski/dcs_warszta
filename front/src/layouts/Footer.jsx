import Box from "@mui/material/Box";
import React from "react";

function Footer() {
  console.log("Footer");
  return (
    <Box
      display="flex"
      p={1}
      width={"100%"}
      justifyContent={"center"}
      bgcolor={"green"}
    >
      FOOTER
    </Box>
  );
}

export default Footer;
