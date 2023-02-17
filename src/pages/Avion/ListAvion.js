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
  const tokenss=localStorage.getItem('tokens')
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
      const avion = useSelector(state=>state.avion)
      const {error} = useSelector(state=>state.avion)
      const {status} = useSelector(state=>state.avion)
      const {getAllData} = useSelector(state=>state.avion)
      let navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
   dispatch(fetchAvion(tokenss))
  
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
  onClick={() =>{navigate(`/admin/avionform/${params.id}`)}}
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                color="error"
                onClick={(event)=> {
                  Swal.fire({
                    title: 'Es-tu sûr?',
                    text: "Vous ne pourrez pas revenir en arrière !",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, supprimez-le !'
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
      { field: "prix_place_simple", headerName: "Prix de place", width: 100 },
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
    :avion.getAllData.length===0? "il n'y a pas de données trouvées":
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
rows={getAllData}
columns={columns}
components={{ Toolbar: GridToolbar }}
/>
</Box></Box> }
 
 </Box>
  )
}

export default ListAvion