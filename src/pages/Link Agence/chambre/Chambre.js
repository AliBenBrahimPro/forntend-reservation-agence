import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleHotels } from '../../../redux/hotelSlice';
const Chambre = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const [price,setPrice]=useState()
    const [chambre,setChambre]=useState()
    const [pensions,setPensions]=useState()
    const {data} = useSelector(state=>state.hotels)
    const hotels = useSelector(state=>state.hotels)
    useEffect(()=>{
        dispatch(getSingleHotels(3))
        setPrice(data.prix_demi_pension)
            },[])
    const handleFormSubmit = (values) => {
        console.log(values);
    };
    const initialValues = {
        prix_total: "",
        prix_chambre:"",
        prix_pension:""

       
    };
    const checkoutSchema = yup.object().shape({
        prix_total:yup.number().required("Required"),
        

    })
 

    return (
        <Box m="20px">
          <Header title="Selecter chambres" subtitle="Selectionner chambres " />
          
          { hotels.status === "loading"?<CircularProgress/>: <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
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
                    <FormControl  sx={{ gridColumn: "span 4" }}>
      <FormLabel>Chambres</FormLabel>
      <RadioGroup
       sx={{ gridColumn: "span 4" }}
        row
        name="prix_chambre"
        onChange={e=>{setChambre(e.target.value);
            const prix=parseFloat( e.target.value)+ parseFloat(pensions) 
            setPrice(prix)}}
        defaultValue={data.prix_demi_pension}
      >
        <FormControlLabel  value={data.prix_demi_pension} control={<Radio  color='default' />} label="Chambre Double" />
        <FormControlLabel value={data.prix_demi_pension*(1+(data.frais_chambre_single/100))} control={<Radio color='default'/>} label="Chambre Single" />
        <FormControlLabel value={data.prix_demi_pension*(1-(data.porcentage_chambre_triple/100))} control={<Radio color='default'/>} label="Chambre Triple" />
        <FormControlLabel value={data.prix_demi_pension*(1-(data.porcentage_chambre_quadruple/100))} control={<Radio color='default'/>} label="Chambre Quadruple" />
      </RadioGroup>
    </FormControl>
    <FormControl  sx={{ gridColumn: "span 4" }}>
      <FormLabel  >Pensions</FormLabel>
      <RadioGroup
       sx={{ gridColumn: "span 4" }}
        row
        name="prix_pension"
        onChange={e=>{setPensions(e.target.value);
            const prix=parseFloat( e.target.value)+ parseFloat(chambre) 
            setPrice(prix)}}
        defaultValue={0}
      >
         <FormControlLabel  value={0} control={<Radio  color='default' />} label="Demi Pension" />
        <FormControlLabel value={data.prix_pension_complete} control={<Radio  color='default'/>} label="Pension Complète" />
        <FormControlLabel value={data.prix_all_inclusive_soft} control={<Radio color='default'/>} label="All Inclusive Soft" />
        <FormControlLabel value={data.prix_all_inclusive} control={<Radio color='default'/>} label="All Inclusive" />
      </RadioGroup>
    </FormControl>
                
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="prix_total"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={price}
                    name="prix_total"
                    error={!!touched.prix_total && !!errors.prix_total}
                    helperText={touched.prix_total && errors.prix_total}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Create New User
                  </Button>
                </Box>
              </form>
            )}
          </Formik>}
        </Box>
      );
}

export default Chambre