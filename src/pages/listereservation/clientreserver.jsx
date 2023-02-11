import React, {  useState,useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchclientReservationTrans} from '../../redux/reservationtransSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ClientReserver = () => {
    const {id} = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const reservationtransport = useSelector(state=>state.reservationtrans)
    
    const {error} = useSelector(state=>state.reservationtrans)
    const {status} = useSelector(state=>state.reservationtrans)
    const {getAllDataclient} = useSelector(state=>state.reservationtrans)
    let navigate = useNavigate();
const dispatch = useDispatch();
console.log(getAllDataclient)

    useEffect(()=>{
      dispatch(fetchclientReservationTrans(id))
     
         },[])
  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ( params ) => 

           [
            <GridActionsCellItem
              icon={<RemoveRedEyeIcon />}
              label="Edit"
onClick={() =>{navigate(`/admin/hotelform/${params.id}`)}}
            />,
          ]
        

     
      
    },
    { field: "full_name", headerName: "Nom Prenom", width: 100 },
    { field: "cin", headerName: "CIN", width: 100 },
    { field: "e_mail", headerName: "Adresse mail", width: 100 },
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
       :reservationtransport.getAllData.length===0? "there is no data found":
       <Box> 
       <Box display="flex" justifyContent="space-between" alignItems="center">
 

 <Header title="List des transport" subtitle="Bienvenue a ton liste des reservations des transport" />
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
   rows={getAllDataclient}
   columns={columns}
   components={{ Toolbar: GridToolbar }}
 />
</Box></Box> }
    
    </Box>
  );
};

export default ClientReserver;
