import React, {  useState,useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchProgramme,deleteProgramme} from '../../redux/programmeSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { fetchHotels } from "../../redux/hotelSlice";

function ListProgramme() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const programme = useSelector(state=>state.programme)
    const {getAllData} = useSelector(state=>state.hotels)
    const hotels= useSelector(state=>state.hotels)
    let navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
   dispatch(fetchProgramme())
  
      },[dispatch])
  
      useEffect(()=>{
  
       console.log('programme : ', programme)
           },[programme,hotels])
   
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
  onClick={() =>{navigate(`/admin/programmeForm/${params.id}`)}}
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

                      dispatch(deleteProgramme(params.id))
                    }
                  })
                  
                }}
  
              />,
            ]
          
       
        
      },
      { field: "nom_programme", headerName: "nom_programme", width: 150 },
      { field: "nom_hotel", headerName: "Hotel", width: 150 },
      { field: "matricule", headerName: "Bus", width: 200 },
      { field: "reference_avion", headerName: "Avion", width: 200 },
      {
        field: "nom_evenement",
        headerName: "Evenement",
        width: 100,
      },
      
      { field: "date_debut", headerName: "date debut", width: 100 },
      { field: "date_fin", headerName: "Date fin", width: 100 },
    ];
  return (
    <Box m="20px">
    { programme.error!==null ?  <Alert severity="error">{programme.error}</Alert>
    : 
    
    programme.status ==="loading"? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :programme.getAllData.length===0? "there is no data found":
    <Box> 
    <Box display="flex" justifyContent="space-between" alignItems="center">


<Header title="List des programme" subtitle="Bienvenue a ton liste des programme" />
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
rows={programme.getAllData}
columns={columns}
components={{ Toolbar: GridToolbar }}
/>
</Box></Box> }
 
 </Box>
  )
}

export default ListProgramme