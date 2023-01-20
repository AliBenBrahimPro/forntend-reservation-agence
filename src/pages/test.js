import React,{ useEffect} from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {fetchHotels} from '../redux/hotelSlice'
import { Formik } from 'formik';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function VirtualizedList() {
  const handleFormSubmit =async (values) => {
  console.log(values.services_equipements)


  };
const initialValues = {
  image_hotel:[],
  nom_hotel: "",
  e_mail:"",
  numero_telephone:"",
  adresse:"",
  nb_etoile:0,
  prix_chambre_double:"",
  prix_chambre_single:"",
  prix_chambre_triple:"",
  prix_chambre_quadruple:"",
  prix_demi_pension:"",
  prix_pension_complete:"",
  prix_all_inclusive:"",
  commision:"",
  services_equipements:
   {"climatisation":false,
    "restaurant":false,
    "centreAffaires":false,
    "piscine":false,
    "television":false,
    "boutiqueCadeaux":false,
    "change":false,
    "bar":false,
    "plage":false,
    "cafe":false,
    "ascenseur":false,
    "tennis":false,
    "animauxAutorises":false,}


  ,
  date_debut:"",
  date_fin:"",
  
};
  return (
   
    <Box
      sx={{ height:'100%', width: '100%', display:'flex',justifyContent:'center', alignContent:'center',alignItems:'center'}}
    > 
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
    {({ values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue}) => (
      <form onSubmit={handleSubmit}>
       <FormGroup  row sx={{display: "grid",justifyContent:'center',
  gridTemplateColumns: "repeat(auto-fill, 186px)", gridGap: "10px"}} >
      <FormControlLabel  control={<Checkbox  
                    onChange={(e)=>setFieldValue("services_equipements.climatisation",e.target.checked)}
                    value={values.services_equipements.climatisation} name="services_equipements.climatisation" color='default' />} label="Climatisation" />
      <FormControlLabel control={<Checkbox 
                     onChange={(e)=>setFieldValue("services_equipements.restaurant",e.target.checked)}
                    value={values.services_equipements.restaurant} name="services_equipements"  color='default' />} label="Restaurant" />
      <FormControlLabel control={<Checkbox 
                     onChange={(e)=>setFieldValue("services_equipements.centreAffaires",e.target.checked)}
                    value={values.services_equipements.centreAffaires} name="services_equipements"  color='default' />} label="Centre d'affaires" />
      <FormControlLabel control={<Checkbox 
                   onChange={(e)=>setFieldValue("services_equipements.piscine",e.target.checked)}
                    value={values.services_equipements.piscine} name="services_equipements"  color='default' />} label="Piscine" />
      <FormControlLabel control={<Checkbox 
                     onChange={(e)=>setFieldValue("services_equipements.television",e.target.checked)}
                    value={values.services_equipements.television} name="services_equipements"  color='default' />} label="Télévision" />
      <FormControlLabel control={<Checkbox 
                   onChange={(e)=>setFieldValue("services_equipements.boutiqueCadeaux",e.target.checked)}
                    value={values.services_equipements.boutiqueCadeaux} name="services_equipements"  color='default' />} label="Boutique de cadeaux" />
      <FormControlLabel control={<Checkbox 
                   onChange={(e)=>setFieldValue("services_equipements.change",e.target.checked)}
                    value={values.services_equipements.change} name="services_equipements"  color='default' />} label="Change" />
      <FormControlLabel control={<Checkbox 
                    onChange={(e)=>setFieldValue("services_equipements.bar",e.target.checked)}
                    value={values.services_equipements.bar} name="services_equipements"  color='default' />} label="Bar" />
      <FormControlLabel control={<Checkbox 
                    onChange={(e)=>setFieldValue("services_equipements.plage",e.target.checked)}
                    value={values.services_equipements.plage} name="services_equipements"   color='default' />} label="Plage" />
      <FormControlLabel control={<Checkbox 
                    onChange={(e)=>setFieldValue("services_equipements.cafe",e.target.checked)}
                    value={values.services_equipements.cafe} name="services_equipements"  color='default' />} label="Café" />
      <FormControlLabel control={<Checkbox 
                    onChange={(e)=>setFieldValue("services_equipements.ascenseur",e.target.checked)}
                    value={values.services_equipements.ascenseur} name="services_equipements"  color='default' />} label="Ascenseur" />
      <FormControlLabel control={<Checkbox 
                    onChange={(e)=>setFieldValue("services_equipements.tennis",e.target.checked)}
                    value={values.services_equipements.tennis}  name="services_equipements"  color='default' />} label="Tennis" />
      <FormControlLabel control={<Checkbox 
                    onChange={(e)=>setFieldValue("services_equipements.animauxAutorises",e.target.checked)}
                    value={values.services_equipements.animauxAutorises} name="services_equipements"  color='default' />} label="Animaux autorisés" />
    </FormGroup>
    <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Créer nauveau hotel
                  </Button>
                </Box>

      </form>
    )}
    </Formik>
    </Box>
  );
}