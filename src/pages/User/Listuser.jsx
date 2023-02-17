import React, {  useState,useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import { fetchUser,deletUser } from "../../redux/userSlice";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

function ListUser() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
      const bus = useSelector(state=>state.user)
      const {error} = useSelector(state=>state.user)
      const {status} = useSelector(state=>state.user)
      const {data} = useSelector(state=>state.user)
      let navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
   dispatch(fetchUser())
  
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
  onClick={() =>{navigate(`/admin/userform/${params.id}`)}}
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

                      dispatch(deletUser(params.id))
                    }
                  })
                  
                }}
  
              />,
            ]
          
       
        
      },
      { field: "code_agence", headerName: "Code Agence", width: 150 },
      { field: "nom_agence", headerName: "Nom agence", width: 150 },
      { field: "e_mail", headerName: "Adresse mail", width: 200 },
      { field: "numero_telephone", headerName: "Numéro de téléphone", width: 200 },
      {
        field: "adresse",
        headerName: "Adresse",
        width: 200,
      },
      {
        field: "cp_agence",
        headerName: "Code postal",
        width:100,
      },
      { field: "solde", headerName: "solde de l'agence", width: 200 },
      { field: "credit", headerName: "credit de l'agence", width: 200 },
      { field: "commition_hotel", headerName: "Commition sur l'hotel", width: 200 },
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
    :bus.data.length===0? "there is no data found":
    <Box> 
    <Box display="flex" justifyContent="space-between" alignItems="center">


<Header title="List des bus" subtitle="Bienvenue a ton liste des Agence" />
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

export default ListUser