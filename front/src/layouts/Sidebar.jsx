import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import Divider from "@mui/material/Divider";

import ConstructionIcon from "@mui/icons-material/Construction";
import Dashboard from "@mui/icons-material/Dashboard";
import FormatListNumbered from "@mui/icons-material/FormatListNumbered";
import Person from "@mui/icons-material/Person";
import PrecisionManufacturing from "@mui/icons-material/PrecisionManufacturing";
import AddCard from "@mui/icons-material/AddCard";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import { tokens } from "@/assets/themes/theme";

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function Sidebar() {
  console.log("SIDEBAR");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(
    capitalizeFirstLetter(useLocation().pathname.split("/").pop())
  );

  const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        rootStyles={{
          color: colors.grey[100],
          paddingLeft: "20px",
        }}
        onClick={() => setSelected(title)}
        icon={icon}
        component={<Link to={to} />}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        background: colors.primary[400],
      }}
      width="270px"
    >
      <ProSidebar
        backgroundColor="transparent"
        rootStyles={{
          border: 0,
          backgroundColor: "transparent",
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&:active": {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          <MenuItem component={<Link to="/admin/dashboard" />}>
            <Box
              display={"flex"}
              p={0}
              m={1}
              gap={1}
              textTransform={"uppercase"}
            >
              <ConstructionIcon fontSize="large" />
              <Typography variant="h3">dcs warsztat</Typography>
            </Box>
            <Divider />
          </MenuItem>
        </Menu>

        <Menu
          menuItemStyles={{
            button: {
              backgroundColor: "transparent",
              "&:hover": {
                color: colors.blueAccent[600],
                backgroundColor: "transparent",
              },
              "&.ps-active": {
                color: colors.blueAccent[400],
                backgroundColor: "transparent",
              },
            },
            subMenuContent: {
              backgroundColor: "transparent",
            },
          }}
          transitionDuration={1}
        >
          <SubMenu label="DCS Warsztat" defaultOpen>
            <Item
              title="Dashboard"
              to="/admin/dashboard"
              icon={<Dashboard />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Nowe zadanie"
              to="/admin/tasks/new"
              icon={<AddCard />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Moje zadania"
              to="/admin/dashboard"
              icon={<FormatListNumberedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu label="LISTY">
              <Item
                title="Zadania"
                to="/admin/tasks"
                icon={<FormatListNumbered />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Maszyny"
                to="/admin/machines"
                icon={<PrecisionManufacturing />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Osoby"
                to="/admin/persons"
                icon={<Person />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </Box>
  );
}

export default Sidebar;
