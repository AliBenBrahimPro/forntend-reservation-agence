import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { insertEvent } from '../../../redux/eventSlice';
function EventForm() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch =useDispatch();
  const handleFormSubmit = (values) => {
      console.log(values);
      dispatch(insertEvent(values)).then((data)=>{
        if(data.type==="event/insertEvent/fulfilled" ){
         Swal.fire(
                   'Success',
                   `${data.payload.nom_evenement} a ajouter avec succes`,
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
    nom_evenement: "",
    description: "",
    nb_place: "",
    nb_place_reserver: 0,
    prix_evenement: "",
    date_debut: "",
    date_fin:""
  };
  const checkoutSchema = yup.object().shape({
    nom_evenement:yup.string().required("Required"),
    description:yup.string().required("Required"),
    nb_place:yup.number().required("Required"),
    nb_place_reserver:yup.number().required("Required"),
    prix_evenement:yup.number().required("Required"),
    date_debut:yup.date().required("Required"),
    date_fin:yup.date().required("Required"),
  })

  return (
    <Box m="20px">
    <Header title="CREER EVENEMENT" subtitle="Creer nouveau evenement" />

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
              label="Nom evenement"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nom_evenement}
              name="nom_evenement"
              error={!!touched.nom_evenement && !!errors.nom_evenement}
              helperText={touched.nom_evenement && errors.nom_evenement}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Déscription"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={!!touched.description && !!errors.description}
              helperText={touched.description && errors.description}
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
              label="Nombre de place reserver"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nb_place_reserver}
              name="nb_place_reserver"
              error={!!touched.nb_place_reserver && !!errors.nb_place_reserver}
              helperText={touched.nb_place_reserver && errors.nb_place_reserver}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Prix évenement"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.prix_evenement}
              name="prix_evenement"
              error={!!touched.prix_evenement && !!errors.prix_evenement}
              helperText={touched.prix_evenement && errors.prix_evenement}
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
              Créer nouveau évenement
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  )
}

export default EventForm