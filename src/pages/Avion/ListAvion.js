import React, {  useState,useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchAvion,deleteAvion} from '../../redux/avionSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

function ListAvion() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
      const avion = useSelector(state=>state.avion)
      const {error} = useSelector(state=>state.avion)
      const {status} = useSelector(state=>state.avion)
      const {data} = useSelector(state=>state.avion)
      let navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
   dispatch(fetchAvion())
  
      },[dispatch])
  
      useEffect(()=>{
  
       console.log('avion : ', avion)
           },[avion])
   
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
  onClick={() =>{navigate(`/avionform/${params.id}`)}}
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

                      dispatch(deleteAvion(params.id))
                    }
                  })
                  
                }}
  
              />,
            ]
          
       
        
      },
      { field: "nom_avion", headerName: "Nom Avion", width: 150 },
      { field: "reference", headerName: "Reference", width: 150 },
      { field: "point_depart", headerName: "Point départ", width: 200 },
      { field: "point_arrive", headerName: "Point arrive", width: 200 },
      {
        field: "nb_place",
        headerName: "Nombre de place",
        width: 100,
      },
      {
        field: "nb_place_reserver",
        headerName: "Nombre de place reserver",
        width: 100,
      },
      { field: "prix_place_simple", headerName: "Prix de place simple", width: 100 },
      { field: "prix_place_speciale", headerName: "Prix de place special", width: 100 },
      { field: "date_debut", headerName: "date debut", width: 100 },
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
    :avion.data.length===0? "there is no data found":
    <Box> 
    <Box display="flex" justifyContent="space-between" alignItems="center">


<Header title="List des avion" subtitle="Bienvenue a ton liste des avion" />
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
  )
}

export default ListAvion