import React,{useEffect} from 'react'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header";
import { useDispatch ,useSelector} from 'react-redux';
import Swal from 'sweetalert2'
import moment from 'moment'
import { getSingleAvion,editBus } from '../../../redux/avionSlice';
import {  useNavigate, useParams } from 'react-router-dom';
import { insertReservationTrans } from '../../../redux/reservationtransSlice';

import axios from 'axios';
function RCA({id,nbr,even}) {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const {data} = useSelector(state=>state.avion)
    const {nb_place}= useSelector(state=>state.avion.data)
    let navigate = useNavigate();
    console.log('avion id',id)
    useEffect(()=>{
      dispatch(getSingleAvion(id))
          },[])  
          useEffect(()=>{
                },[data]) 
                
    const handleFormSubmit = (values) => {
         values.monatnt_total=data.prix_place_simple*nbr
        dispatch(insertReservationTrans(values)).then((data)=>{
            if(data.type==="reservationtrans/insertReservationTrans/fulfilled" ){
             
                     Swal.fire({
                     
                      title: "Réservation a effecte avec succes",
                      text: "Tu veux remplir coordonnées des clients?",
                      icon: 'success',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Ajouter client'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate(`/agence/clientavion/${data.payload.id}`) 
                      }
                    })
                   
            }else{
                 Swal.fire({
                     icon: 'error',
                     title: data.response,
                     text: 'Something went wrong!',
                   })}
           })
    };
  

    const checkoutSchema = yup.object().shape({
        nb_place_res:yup.number().required("Required"),
        nb_place_reserver:yup.number().required("Required"),
        monatnt_total:yup.number().required("Required"),
        date_debut:yup.string().required("Required"),
        date_fin:yup.string().required("Required"),

    })
   let initialdata={
      nb_place:"",
      monatnt_total:"",
      type:"avion",
      prix_place_simple:"",
      date_debut:data.date_debut,
      date_fin:data.date_fin,
      id_transport:id,
      userId:localStorage.getItem('id'),
    }
  return (
    <Box m="20px">
    <Header title="Réservation Avion" subtitle="Réservation des places sur l'avion" />

    <Formik onSubmit={handleFormSubmit} initialValues={initialdata} enableReinitialize={true} validationSchema={checkoutSchema}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit,}) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              disabled
              variant="filled"
              type="text"
              label="Nombre de place à reserver"
              onBlur={handleBlur}
              onChange={handleChange}
              value={nbr}
              name="nb_place"
              error={!!touched.nb_place && !!errors.nb_place}
              helperText={touched.nb_place && errors.nb_place}
              sx={{ gridColumn: "span 2" }}
            />
             <TextField
              fullWidth
              disabled
              variant="filled"
              type="text"
              label="Nombre de place disponible"
              value={nb_place-data.nb_place_reserver}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Prix unitaire"
              onBlur={handleBlur}
              onChange={handleChange}
              value={data.prix_place_simple}
              name="prix_place_simple"
             disabled
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Monatnt total"
              disabled
              
              value={data.prix_place_simple*nbr}
              name="monatnt_total"
              error={!!touched.monatnt_total && !!errors.monatnt_total}
              helperText={touched.monatnt_total && errors.monatnt_total}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              disabled
              variant="filled"
              type="datetime-local"
              label="Date début"
             
              onChange={handleChange}
              value={moment(data.date_debut).format("YYYY-MM-DD[T]HH:mm")}
              name="date_debut"
              error={!!touched.date_debut && !!errors.date_debut}
              helperText={touched.date_debut && errors.date_debut}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              disabled
              variant="filled"
              type="datetime-local"
              label="Date fin"
              onBlur={handleBlur}
              onChange={handleChange}
              value={moment(data.date_fin).format("YYYY-MM-DD[T]HH:mm")}
              name="date_fin"
              inputProps={{ min: values.date_debut}}
              error={!!touched.date_fin && !!errors.date_fin}
              helperText={touched.date_fin && errors.date_fin}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Suivant
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  )
}

export default RCA