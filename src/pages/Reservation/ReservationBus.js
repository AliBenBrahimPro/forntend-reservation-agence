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
import { useParams } from 'react-router-dom';
import { insertReservationBus } from '../../redux/reservationbusSlice';
import axios from 'axios';
function ReservationBus() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const {id} = useParams();
    const {data} = useSelector(state=>state.bus)
    const {nb_place}= useSelector(state=>state.bus.data)
    useEffect(()=>{
      dispatch(getSingleBus(id))
          },[])  
    const handleFormSubmit = (values) => {
        console.log(values);

        const formData = new FormData();
           formData.append('id',1)
           formData.append('nb_place',values.nb_place)
           formData.append('monatnt_total',500)
           formData.append('date_debut',values.date_debut)
           formData.append('date_fin',values.date_fin)
           const res= axios.post(`${process.env.REACT_APP_BASE_URL}/api/reservation_bus/addreservationbus`,formData);
console.log(res)
        // dispatch(insertReservationBus(values)).then((data)=>{
        //     if(data.type==="reservationbus/insertReservationBus/fulfilled" ){
        //      Swal.fire(
        //                'Success',
        //                `${data.payload.matricule} a ajouter avec succes`,
        //                'success'
        //              ) 
        //     }else{
        //          Swal.fire({
        //              icon: 'error',
        //              title: 'Oops...',
        //              text: 'Something went wrong!',
        //            })}
        //    })
    };
  

    const checkoutSchema = yup.object().shape({
        // nb_place_res:yup.number().required("Required"),
        // nb_place_reserver:yup.number().required("Required"),
        // monatnt_total:yup.number().required("Required"),
        // date_debut:yup.string().required("Required"),
        // date_fin:yup.string().required("Required"),

    })
  return (
    <Box m="20px">
    <Header title="Reservervation Bus" subtitle="Reservervation des places sur le bus" />

    <Formik onSubmit={handleFormSubmit} initialValues={data} enableReinitialize={true} validationSchema={checkoutSchema}>
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
              value={values.nb_place_res}
              name="nb_place"
              error={!!touched.nb_place_res && !!errors.nb_place_res}
              helperText={touched.nb_place_res && errors.nb_place_res}
              sx={{ gridColumn: "span 2" }}
            />
             <TextField
              fullWidth
              disabled
              variant="filled"
              type="text"
              label="Nombre de place disponible"
              value={nb_place}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Prix unitaire"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.prix_place}
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
              
              value={values.prix_place*values.nb_place}
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
              value={moment(values.date_debut).format("YYYY-MM-DD[T]HH:mm")}
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
              value={moment(values.date_fin).format("YYYY-MM-DD[T]HH:mm")}
              name="date_fin"
              inputProps={{ min: values.date_debut}}
              error={!!touched.date_fin && !!errors.date_fin}
              helperText={touched.date_fin && errors.date_fin}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Réserver
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  )
}

export default ReservationBus