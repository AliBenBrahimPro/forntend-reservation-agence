import React, {  useState,useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchHotels} from '../../redux/hotelSlice'
import Header from "../../components/Header";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const hotels = useSelector(state=>state.hotels)
const dispatch = useDispatch();

useEffect(()=>{
 dispatch(fetchHotels())

    },[dispatch])

    useEffect(()=>{

     console.log('products : ', hotels)
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
onClick={() =>{ 
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
                    axios.delete(`${process.env.REACT_APP_BASE_URL}/api/hotel/deletehotel/${params.id}`).then((response) => {
                      if(response.status===200){
                        Swal.fire(
                          'Deleted!',
                          'Your file has been deleted.',
                          'success'
                        )
                      }
                      else{
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text:  "something wrong",
                        })
                      }
                     
                   });
                    
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
    { field: "prix_chambre_single", headerName: "Prix chambre single", width: 100 },
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
          rows={hotels.data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
