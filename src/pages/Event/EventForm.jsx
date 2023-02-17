import React,{useState} from 'react'
import { Box, Button, TextField } from '@mui/material'
import Fab from '@mui/material/Fab';

import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { insertEvent } from '../../redux/eventSlice';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';

function EventForm() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch =useDispatch();
  const handleFormSubmit = (values,{resetForm}) => {
      console.log(values);
      const formData = new FormData();
         formData.append('image_evenement',values.image_evenement)
         formData.append('nom_evenement',values.nom_evenement)
         formData.append('numero_telephone',values.numero_telephone)
         formData.append('description',values.description)
         formData.append('nb_place',values.nb_place)
         formData.append('nb_place_reserver',values.nb_place_reserver)
         formData.append('prix_evenement',values.prix_evenement)
         formData.append('date_debut',values.date_debut)
         formData.append('date_fin',values.date_fin)
const res= axios.post(`${process.env.REACT_APP_BASE_URL}/api/evenement/addevenement`,formData)
.then((res)=> { if(res.status===200)
  { Swal.fire(
  'Success',
  `${res.data.nom_evenement} a ajouter avec succes`,
  'success'
)
resetForm( {
  image_evenement:"",
  nom_evenement: "",
  description: "",
  nb_place: "",
  nb_place_reserver: 0,
  prix_evenement: "",
  date_debut: "",
  date_fin:""
})
}else {Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text:"Quelque chose s'est mal passé!",
})}})


  };
  const initialValues = {
    image_evenement:"",
    nom_evenement: "",
    description: "",
    nb_place: "",
    nb_place_reserver: 0,
    prix_evenement: "",
    date_debut: "",
    date_fin:""
  };
  const checkoutSchema = yup.object().shape({
    image_evenement:yup.mixed().required("Required"),
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
      {({ values, errors, touched,setFieldValue, handleBlur, handleChange, handleSubmit,}) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
             <Box  sx={{ gridColumn: "span 4" , display:'flex',justifyContent:'center',flexDirection: 'column',alignItems:'center'  }}>
             <input
              style={{display: "none" }}
              onBlur={handleBlur}
              onChange={e=>setFieldValue("image_evenement",e.target.files[0])}
              name="image_evenement"
              accept="image/*"
              id="contained-button-file"
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Fab component="span" >
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
            </Box>
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