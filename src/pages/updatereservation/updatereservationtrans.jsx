import React,{useEffect} from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch ,useSelector} from 'react-redux';
import Swal from 'sweetalert2'
import moment from 'moment'
import { getSingleBus,editBus } from '../../redux/busSlice';
import { json, useNavigate, useParams } from 'react-router-dom';
import { editReservationTrans ,getSingleReservationTrans} from '../../redux/reservationtransSlice';

import axios from 'axios';
function UpdateReservationBus() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const reservationtransport = useSelector(state=>state.reservationtrans)
    const dispatch =useDispatch();
    const {id} = useParams();
    const {data} = useSelector(state=>state.bus)
    const {getonereservation} = useSelector(state=>state.reservationtrans)
    const {nb_place}= useSelector(state=>state.bus.data)
    let navigate = useNavigate();
console.log("test",getonereservation,id)
    useEffect(()=>{
      dispatch(getSingleReservationTrans(id)).then(secc=>{
        dispatch(getSingleBus(secc.payload[0].id_transport))})
          },[dispatch])  
          console.log("test",getonereservation,id,data)
    const handleFormSubmit = (values) => {
         console.log(values);
         values.monatnt_total=data.prix_place*values.nb_place
        dispatch(editReservationTrans(values)).then((data)=>{
          
            if(data.type==="reservationtrans/editReservationTrans/fulfilled" ){
             
             Swal.fire(
                       'Success',
                       `réservation a modiffier  avec succes`,
                       'success'
                     ) 
                   
            }else{
              console.log(data)
                 Swal.fire({
                     icon: 'error',
                     title: data.response,
                     text: "Quelque chose s'est mal passé!",
                   })}
           })
    };
  

    const checkoutSchema = yup.object().shape({
        // nb_place_res:yup.number().required("Required"),
        // nb_place_reserver:yup.number().required("Required"),
        // monatnt_total:yup.number().required("Required"),
        // date_debut:yup.string().required("Required"),
        // date_fin:yup.string().required("Required"),

    })
   let initialdata={
      id:getonereservation[0]?.id,
      nb_place:getonereservation[0]?.nb_place,
      monatnt_total:getonereservation[0]?.monatnt_total,
      type:"bus",
      date_debut:data?.date_debut,
      date_fin:data?.date_fin,
      id_transport:data?.id,
      userId:localStorage.getItem('id'),
    }
    console.log("data",initialdata)
  return (
    <Box m="20px">
    <Header title="Réservation Bus" subtitle="Réservation des places sur le bus" />

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
              
              variant="filled"
              type="text"
              label="Nombre de place à reserver"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nb_place}
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
              value={data.prix_place}
              name="prix_place"
             disabled
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Monatnt total"
              disabled
              
              value={data.prix_place*values.nb_place}
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
              Modefier
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  )
}

export default UpdateReservationBus