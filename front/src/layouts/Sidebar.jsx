import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, Typography, useTheme, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "src/assets/theme";
import ConstructionIcon from '@mui/icons-material/Construction';

function Sidebar() {  
  console.log("SIDEBAR");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

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
  <Box sx={{ display: 'flex', height: '100%', bgcolor: (colors.primary[400]) }} width="270">
    <ProSidebar backgroundColor="transparent" 
    rootStyles={{
      border: 0, 
      backgroundColor: "transparent",
      }}>

      <Menu menuItemStyles={{
        button: {
            backgroundColor: "transparent",
            '&:hover': {
              backgroundColor: "transparent",
            },
            '&:active': {
              backgroundColor: "transparent",
            }
          },
        
        }}>
        <MenuItem component={<Link to="/admin/dashboard" />}>
          <Box display={"flex"} p={0} m={1} gap={2} textTransform={"uppercase"} >
            <ConstructionIcon fontSize="large" />
            <Typography variant="h3">dcs warsztat</Typography> 
          </Box>
          <Divider />
        </MenuItem>
      </Menu>


      <Menu menuItemStyles={{
        button: {
          backgroundColor: "transparent",
            '&:hover': {
              color: "#868dfb",
              backgroundColor: "transparent",
            },
            '&.ps-active': {
              color: "#6870fa",
              backgroundColor: "transparent",
            },
          }, 
        subMenuContent: {
          backgroundColor: "transparent"
          },
        }}
        
        transitionDuration={1} >
        <SubMenu label="DCS Warsztat" defaultOpen >
          <Item
              title="Dashboard"
              to="/admin/dashboard"
              //icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
          />
          <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 25px" }}>TABLES</Typography>

          <Item
              title="Tasks"
              to="/admin/tables"
              //icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
          />

          <Item
              title="Machines"
              to="/admin/tables"
              //icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
          />

          <Item
              title="Persons"
              to="/admin/tables"
              //icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
          />
          
        </SubMenu>
      </Menu>
    </ProSidebar>
  </Box>    
  );
  
}

export default Sidebar;