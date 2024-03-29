import React, {  useState,useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchReservationTrans} from '../../redux/reservationtransSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

const ListreservationTransport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector(state=>state.user)

    const reservationtransport = useSelector(state=>state.reservationtrans)
    
    const {error} = useSelector(state=>state.reservationtrans)
    const {status} = useSelector(state=>state.reservationtrans)
    const {getAllData} = useSelector(state=>state.reservationtrans)
    let navigate = useNavigate();
const dispatch = useDispatch();
console.log(getAllData)

    useEffect(()=>{
      dispatch(fetchReservationTrans())
     
         },[dispatch])
     
         useEffect(()=>{
     
              },[reservationtransport,user])
  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'voir tous les client',
      width: 130,
      cellClassName: 'actions',
      getActions: ( params ) => 

           [
            <GridActionsCellItem
              icon={<RemoveRedEyeIcon />}
              label="tous les client"
              onClick={() =>{navigate(`/admin/listclientreservation/${params.id}`)}}
            />,
          ] 
    },
    { field: "reference", headerName: "Reference", width: 100 },
    { field: "type", headerName: "Type transport", width: 100 },
    { field: "nom_agence", headerName: "Nom Agence", width: 100 },
    {
      field: "nb_place",
      headerName: "Nombre de place reserver",
      width: 150,
    },
    {
      field: "monatnt_total",
      headerName: "Montant total",
      width: 150,
    },
    
    {
      field: "solde",
      headerName: "Solde",
      width: 150,
      },
    { field: "credit", headerName: "Credit", width: 150 },
    { field: "date_debut", headerName: "Date debut", width: 150 },
    { field: "date_fin", headerName: "Date fin", width: 150 },
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
       :reservationtransport.getAllData.length===0? "il n'y a pas de données trouvées":
       <Box> 
       <Box display="flex" justifyContent="space-between" alignItems="center">
 

 <Header title="List des transport " subtitle="Bienvenue a ton liste des reservations des transport" />
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
   rows={getAllData}
   columns={columns}
   components={{ Toolbar: GridToolbar }}
 />
</Box></Box> }
    
    </Box>
  );
};

export default ListreservationTransport;
