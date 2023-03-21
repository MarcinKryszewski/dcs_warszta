import React from "react";
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Box,
  Link,
} from "@mui/material";
import { hexToRgb } from "../utils/hexToRgb";
import {
  blackColor,
  grayColor,
  whiteColor,
  primaryColor,
} from "../assets/colors";
import { defaultFont } from "../assets/fonts";
import ConstructionIcon from "@mui/icons-material/Construction";
import { NavLink } from "react-router-dom";

function Sidebar() {
  console.log("SIDEBAR")
  return (
    <div>
      <Drawer
        sx={{
          width: 260,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 260,
            boxSizing: "border-box",
            background: blackColor,
            opacity: ".8",
            boxShadow:
              "0 10px 30px -12px rgba(" +
              hexToRgb(blackColor) +
              ", 0.42), 0 4px 25px 0px rgba(" +
              hexToRgb(blackColor) +
              ", 0.12), 0 8px 10px -5px rgba(" +
              hexToRgb(blackColor) +
              ", 0.2)",
          },
        }}
        variant="permanent"
        anchor="left"
        open
      >
        <Box
          sx={{
            position: "relative",
            padding: "15px 15px",
            zIndex: "4",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: "0",
              height: "1px",
              right: "15px",
              width: "calc(100% - 30px)",
              backgroundColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)",
            },
          }}
        >
          <Link
            sx={{
              ...defaultFont,
              textTransform: "uppercase",
              padding: "5px 0",
              display: "block",
              fontSize: "18px",
              textAlign: "left",
              fontWeight: "400",
              lineHeight: "30px",
              textDecoration: "none",
              backgroundColor: "transparent",
              "&,&:hover": {
                color: whiteColor,
              },
            }}
            underline="none"
            color={whiteColor}
            component="button"
          >
            <Box
              sx={{
                width: "30px",
                display: "inline-block",
                maxHeight: "30px",
                marginLeft: "10px",
                marginRight: "15px",
              }}
            >
              <ConstructionIcon
                sx={{
                  fontSize: 32,
                  color: grayColor[4],
                  width: "35px",
                  top: "22px",
                  verticalAlign: "middle",
                  border: "0",
                }}
              />
            </Box>
            dcs warsztat
          </Link>
        </Box>

        <List>
          <ListItem>
            <NavLink to="/admin/dashboard">DASHBOARD</NavLink>
          </ListItem>
          <ListItem>
          <NavLink to="/admin/tables">TABLES</NavLink>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Sidebar;
