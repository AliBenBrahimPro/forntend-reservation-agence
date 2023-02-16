import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';
import Chambre from '../chambre/Chambre';
import ReservationBus from '../Bus/ReservationBus';
import ReservationAvion from '../Avion/ReservationAvion';
const FormProgAgence = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const navigate =useNavigate()
    const [transport,setTransport]= useState("1")
    const handleFormSubmit = (values) => {
        console.log(values);

        navigate(`/agence/ccp/${1}`)
    };
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        address1: "",
        address2: "",
    };
    const checkoutSchema = yup.object().shape({
      

    })


    return (
        <Box m="20px">
        
    
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
                    <Box sx={{ gridColumn: "span 4",display:'flex',justifyContent:'center' }}>
      <FormControl >
      <FormLabel color='primary' id="demo-row-radio-buttons-group-label">Type de transport</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={e=>setTransport(e.target.value)}
        defaultValue={1}
      >
        <FormControlLabel value="1" control={<Radio color='default' />} label="Bus" />
        <FormControlLabel value="2" control={<Radio color='default' />} label="Avion" />

      </RadioGroup>
    </FormControl>
    </Box>
   {transport==="1" ?<Box sx={{ gridColumn: "span 4"}}><ReservationBus/> </Box>:""}
  {transport==="2" ?  <Box sx={{ gridColumn: "span 4"}}><ReservationAvion/></Box>:""}


                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Create New User
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      );
}

export default FormProgAgence