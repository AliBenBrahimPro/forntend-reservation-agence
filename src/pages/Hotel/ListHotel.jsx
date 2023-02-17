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
import {fetchHotels,deleteHotels} from '../../redux/hotelSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

const ListHotel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const hotels = useSelector(state=>state.hotels)
    const {error} = useSelector(state=>state.hotels)
    const {status} = useSelector(state=>state.hotels)
    const {getAllData} = useSelector(state=>state.hotels)
    let navigate = useNavigate();

const dispatch = useDispatch();

useEffect(()=>{
 dispatch(fetchHotels())

    },[dispatch])

    useEffect(()=>{

     console.log('hotels : ', hotels)
         },[hotels])
 
//   const[data,setData]=useState([])

//   const url =`${process.env.REACT_APP_BASE_URL}/api/hotel/getallhotel`;
  
//   useEffect(() =>  {
//     let mounted =true;
  
//   const loadData= async()=>{
//   const response = await axios.get(url);
//   if(mounted){

   
// setData(response.data)
//   }
  
//      };
//      loadData();
      
//       return () => { mounted =false;
//      };
//   },[])
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
                  title: 'Es-tu sûr?',
                  text: "Vous ne pourrez pas revenir en arrière !",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Oui, supprimez-le !'
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
                    dispatch(deleteHotels(params.id))
                  }
                })
                
              }}

            />,
          ]
        

     
      
    },
    { field: "nom_hotel", headerName: "Nom Hotel", width: 100 },
    { field: "e_mail", headerName: "E-mail", width: 200 },
    {
      field: "adresse",
      headerName: "Adresse",
      width: 250,
    },
    {
      field: "numero_telephone",
      headerName: "Numero telephone",
      width: 250,
    },
    
    {
      field: "nb_etoile",
      headerName: "Nombre des étoiles",
      width: 200,
      renderCell: ({ row: { nb_etoile } }) => {
        console.log(nb_etoile)
        return (
          <Rating
          size="large"
        defaultValue={nb_etoile}
        readOnly
        />
        
        );
      },
    },
    { field: "frais_chambre_single", headerName: "frais_chambre_single", width: 100 },
    { field: "services_equipements", headerName: "Service", width: 100 },
    { field: "prix_chambre_triple", headerName: "Prix chambre triple", width: 100 },
    { field: "prix_demi_pension", headerName: "Prix demi pension", width: 100 },
    { field: "prix_pension_complete", headerName: "Prix pension complete", width: 100 },
    { field: "prix_all_inclusive", headerName: "Prix all inclusive", width: 100 },
    { field: "commision", headerName: "Commision", width: 100 },
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
       :hotels.getAllData.length===0? "il n'y a pas de données trouvées":
       <Box> 
       <Box display="flex" justifyContent="space-between" alignItems="center">
 

 <Header title="List des hotels" subtitle="Bienvenue a ton liste des hotels" />
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

export default ListHotel;
