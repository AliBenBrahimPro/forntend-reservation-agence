// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import Profileimage from '../../../assets/ali.png'
import { useSidebarContext } from "./sidebarContext";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ExploreIcon from '@mui/icons-material/Explore';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MySideBarAgence = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image='./admin.png'
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : sidebarRTL ? (
                <SwitchLeftOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              ) : (
                <SwitchRightOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Agence
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  src='./user.png'
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                 {localStorage.getItem('nom_agence')}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/agence"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Réservation
            </Typography>
            <Item
              title="Avion"
              to="/agence/allavion"
              icon={<AirplanemodeActiveIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Bus"
              to="/agence/allbus"
              icon={<DirectionsBusIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Hotel"
              to="/agence/allhotel"
              icon={<ApartmentIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Evenement"
              to="/agence/allevent"
              icon={<LocalActivityIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Programme"
              to="/agence/allprog"
              icon={<ExploreIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Gestion de Réservation
            </Typography>
            <Item
              title="List des reservations transport"
              to="/agence/listuserreservationtransport"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List des reservations hotel"
              to="/agence/listuserreservationhotel"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List des reservations Evenement"
              to="/agence/listuserreservationevenement"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Gestion des client
            </Typography>
            <Item
              title="Ajouter Client"
              to="/agence/formclient"
              icon={<PeopleIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List client"
              to="/agence/listclient"
              icon={<PeopleIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="reservation"
              to="/agence/reservation"
              icon={<PeopleIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Hotel details"
              to="/agence/hoteldetails"
              icon={<ApartmentIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Chambre"
              to="/agence/chambre"
              icon={<ApartmentIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
    
   
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MySideBarAgence;
