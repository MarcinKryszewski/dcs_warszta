import React from "react";

import Box from "@mui/material/Box";

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
