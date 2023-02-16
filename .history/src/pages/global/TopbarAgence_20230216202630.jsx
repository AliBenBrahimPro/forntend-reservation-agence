import React, { useEffect } from "react";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme, Box, IconButton, InputBase, TextField, Button } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import {getSingleUser} from"../../redux/userSlice"
import { useDispatch, useSelector } from "react-redux";
const TopbarAgence = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch =useDispatch();
 
  const {solde,credit} = useSelector(state=>state.user.data)
 
  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(()=>{
    dispatch(getSingleUser(localStorage.getItem('id')))
        },[])  
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
      
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            
           <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
        >
          
          
          <Button disableTouchRipple color="secondary" variant="outlined" startIcon={<MonetizationOnIcon />}>Solde : {solde}</Button>
          
        </Box>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
        >
          
          
          <Button disableTouchRipple color="error" variant="outlined" startIcon={<MonetizationOnIcon />}>Crédit : {credit}</Button>
          
        </Box>
        {broken && rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default TopbarAgence;
