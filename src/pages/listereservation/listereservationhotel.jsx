import React, {  useState,useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchreservationhotel} from '../../redux/reservationhotelSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import {fetchHotels,deleteHotels} from '../../redux/hotelSlice'

const ListreservationHotel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const reservationhotel = useSelector(state=>state.reservationhotel)
    // const hotels = useSelector(state=>state.hotels)
    // const {getAllDataHotel} = useSelector(state=>state.hotels)
    const {error} = useSelector(state=>state.reservationhotel)
    const {status} = useSelector(state=>state.reservationhotel)
    const {getAllData} = useSelector(state=>state.reservationhotel)
    let navigate = useNavigate();
const dispatch = useDispatch();
console.log(getAllData)
useEffect(async()=>{
 dispatch(fetchreservationhotel())
 dispatch(fetchHotels())
    },[dispatch])
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
              icon={<EditIcon />}
              label="Edit"
onClick={() =>{navigate(`/admin/hotelform/${params.id}`)}}
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
                  //   axios.delete(`${process.env.REACT_APP_BASE_URL}/api/hotel/deletehotel/${params.id}`).then((response) => {
                  //     if(response.status===200){
                  //       Swal.fire(
                  //         'Deleted!',
                  //         'Your file has been deleted.',
                  //         'success'
                  //       )
                  //     }
                  //     else{
                  //       Swal.fire({
                  //         icon: 'error',
                  //         title: 'Oops...',
                  //         text:  "something wrong",
                  //       })
                  //     }
                     
                  //  });
                    // dispatch(deleteHotels(params.id))
                  }
                })
                
              }}

            />,
          ]
        

     
      
    },
    // { field: "nom_hotel", headerName: "Nom Hotel", width: 100 },
    // { field: "nom_agence", headerName: "Nom Agence", width: 200 },
    {
      field: "nb_place",
      headerName: "Nombre de place reserver",
      width: 250,
    },
    {
      field: "monatnt_total",
      headerName: "Montant total",
      width: 250,
    },
    
    {
      field: "solde",
      headerName: "Solde",
      width: 200,
      },
    { field: "credit", headerName: "Credit", width: 100 },
    { field: "date_debut", headerName: "Date debut", width: 100 },
    { field: "date_fin", headerName: "Date fin", width: 100 },
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
       :reservationhotel.getAllData.length===0? "there is no data found":
       <Box> 
       <Box display="flex" justifyContent="space-between" alignItems="center">
 

 <Header title="List des hotels" subtitle="Bienvenue a ton liste des reservations des hotels" />
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

export default ListreservationHotel;
