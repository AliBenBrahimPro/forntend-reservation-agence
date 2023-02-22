import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system';
import { Typography } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header";
function StepTwo() {
    const client = useSelector((state) => state.productFilter.client);
    const dispatch = useDispatch() 
    console.log("client : ",client)
    const [inputList, setinputList]= useState([{firstName:'', lastName:'', date_de_naissance: ''}]);

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const handleFormSubmit = (values) => {
        console.log(inputList);
    };
    const initialValues = {
        firstName: "",
        lastName: "",
        date_de_naissance: "",
       
    };
    const checkoutSchema = yup.object().shape({
        

    })
    const handleinputchange=(e, index)=>{
        const {name, value}= e.target;
        const list= [...inputList];
        list[index][name]= value;
        setinputList(list);
    
      }
  return (
    <Box m="20px">
    <Header title="Remplir client" subtitle="Ajouter client" />

    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit,}) => (
        <form onSubmit={handleSubmit}>
          <Box  >
        {client.map((e,i)=> 
         <Box  >
            <p style={{marginTop:'20px'}}>{e}</p> 
            <TextField sx={{marginRight:'20px'}} name='firstName'  onChange={ e=>handleinputchange(e,i)}  label="Nom" variant="filled" /> 
            <TextField sx={{marginRight:'20px'}} name='lastName'  onChange={ e=>handleinputchange(e,i)} label="Prenom"  variant="filled" />
            <TextField   type="date" label="Date de naissance"  name='date_de_naissance'  onChange={ e=>handleinputchange(e,i)}  variant="filled" /></Box>
            ) }
        </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button  type="submit" color="secondary" variant="contained">
                    Suivant
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
  )
}

export default StepTwo