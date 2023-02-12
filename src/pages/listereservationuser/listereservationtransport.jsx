import React, {  useState,useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {getuserleReservationTrans,deleteReservationTrans} from '../../redux/reservationtransSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListreservationTransportuser = () => {
  const id = localStorage.getItem('id');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const reservationtransport = useSelector(state=>state.reservationtrans)
    
    const {error} = useSelector(state=>state.reservationtrans)
    const {status} = useSelector(state=>state.reservationtrans)
    const {getAllDatauser} = useSelector(state=>state.reservationtrans)
    let navigate = useNavigate();
const dispatch = useDispatch();
console.log(id)
console.log(getAllDatauser)

    useEffect(()=>{
      dispatch(getuserleReservationTrans(id))
     
         },[dispatch])
     
         useEffect(()=>{
     
              },[reservationtransport])
  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 130,
      cellClassName: 'actions',
      getActions: ( params ) => 

           [
            <GridActionsCellItem
              icon={<RemoveRedEyeIcon />}
              label="tous les client"
              onClick={() =>{navigate(`/agence/listuserclientreservation/${params.id}`)}}
            />,
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={() =>{
                    if(params.row.type==="bus")
                  {   navigate(`/agence/updatereservationtransportbus/${params.id}`)}
                else{   navigate(`/agence/updatereservationtransportavion/${params.id}`)}       
                
                }}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              color="error"
              onClick={(event)=> {
                Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                     dispatch(deleteReservationTrans(params.id))
                  }
                })
                
              }}

            />
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
       :reservationtransport.getAllDatauser.length===0? "there is no data found":
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
   rows={getAllDatauser}
   columns={columns}
   components={{ Toolbar: GridToolbar }}
 />
</Box></Box> }
    
    </Box>
  );
};

export default ListreservationTransportuser;
