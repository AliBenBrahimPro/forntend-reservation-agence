import React, {  useState,useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchclientReservationEvent} from '../../redux/reservationeventSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ClientReserveruserevent = () => {
    const {id} = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const reservationtransport = useSelector(state=>state.reservationhotel)
    
    const {error} = useSelector(state=>state.reservationhotel)
    const {status} = useSelector(state=>state.reservationhotel)
    const {data} = useSelector(state=>state.reservationhotel)
    let navigate = useNavigate();
const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(fetchclientReservationEvent(id))
     
         },[])
  const columns = [
    { field: "full_name", headerName: "Nom Prenom", width: 150 },
    { field: "cin", headerName: "CIN", width: 130 },
    { field: "e_mail", headerName: "Adresse mail", width: 200 },
    {
      field: "numero_telephone",
      headerName: "Numero téléphone",
      width: 150,
    },
    {
      field: "date_naissance",
      headerName: "date Naissance",
      width: 150,
    }
  ];

  return (
   
    <Box m="20px">
       { error!==null ?  <Alert severity="error">{error}</Alert>
       : 
       
       status ==="loading"? <Box style={{position: 'relative'}}>
       <CircularProgress size={40}
        left={-20}
        top={10}
        
        style={{marginLeft: '50%'}} color="secondary" /></Box>
       :reservationtransport.data.length===0? "il n'y a pas de données trouvées":
       <Box> 
       <Box display="flex" justifyContent="space-between" alignItems="center">
 

 <Header title="List des client" subtitle="Bienvenue a ton liste des client a recerver" />
</Box>
<Box
 m="8px 0 0 0"
 width="100%"
 height="80vh"
 sx={{
   "& .MuiDataGrid-root": {
     border: "none",
   },
   "& .MuiDataGrid-cell": {
     borderBottom: "none",
   },
   "& .name-column--cell": {
     color: colors.greenAccent[300],
   },
   "& .MuiDataGrid-columnHeaders": {
     backgroundColor: colors.blueAccent[700],
     borderBottom: "none",
   },
   "& .MuiDataGrid-virtualScroller": {
     backgroundColor: colors.primary[400],
   },
   "& .MuiDataGrid-footerContainer": {
     borderTop: "none",
     backgroundColor: colors.blueAccent[700],
   },
   "& .MuiCheckbox-root": {
     color: `${colors.greenAccent[200]} !important`,
   },
   "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
     color: `${colors.grey[100]} !important`,
   },
 }}
>
 <DataGrid
   rows={data}
   columns={columns}
   components={{ Toolbar: GridToolbar }}
 />
</Box></Box> }
    
    </Box>
  );
};

export default ClientReserveruserevent;
