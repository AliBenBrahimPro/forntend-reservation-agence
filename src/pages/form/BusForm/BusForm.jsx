import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { insertBus } from '../../../redux/busSlice';

function BusForm() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(insertBus(values)).then((data)=>{
          if(data.type==="bus/insertBus/fulfilled" ){
           Swal.fire(
                     'Success',
                     `${data.payload.matricule} a ajouter avec succes`,
                     'success'
                   ) 
          }else{
               Swal.fire({
                   icon: 'error',
                   title: 'Oops...',
                   text: 'Something went wrong!',
                 })}
         })
    };
    const initialValues = {
      matricule: "",
      reference: "",
      nb_place: "",
      prix_place: "",
      date_debut: "",
      date_fin: "",
    };
    const checkoutSchema = yup.object().shape({
        matricule:yup.string().required("Required"),
        reference:yup.string().required("Required"),
        nb_place:yup.number().required("Required"),
        prix_place:yup.number().required("Required"),
        date_debut:yup.date().required("Required"),
        date_fin:yup.date().required("Required"),

    })
    return (
        <Box m="20px">
          <Header title="Creer nouveau BUS" subtitle="Ajouter nouveau BUS" />
    
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
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
                    label="Matricule"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.matricule}
                    name="matricule"
                    error={!!touched.matricule && !!errors.matricule}
                    helperText={touched.matricule && errors.matricule}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Reference"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.reference}
                    name="reference"
                    error={!!touched.reference && !!errors.reference}
                    helperText={touched.reference && errors.reference}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Nombre de place"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nb_place}
                    name="nb_place"
                    error={!!touched.nb_place && !!errors.nb_place}
                    helperText={touched.nb_place && errors.nb_place}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Prix de place"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.prix_place}
                    name="prix_place"
                    error={!!touched.prix_place && !!errors.prix_place}
                    helperText={touched.prix_place && errors.prix_place}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="datetime-local"
                    label="Date début"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.date_debut}
                    name="date_debut"
                    error={!!touched.date_debut && !!errors.date_debut}
                    helperText={touched.date_debut && errors.date_debut}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="datetime-local"
                    label="Date fin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.date_fin}
                    name="date_fin"
                    inputProps={{ min: values.date_debut}}
                    error={!!touched.date_fin && !!errors.date_fin}
                    helperText={touched.date_fin && errors.date_fin}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Ajouter nouveau bus
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      );
}

export default BusForm