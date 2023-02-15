import React, { useEffect, useState } from 'react'
import { Alert, Autocomplete, Box, Button, CircularProgress, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header";
import { fetchClient, insertClient,getSingleClient } from '../../../redux/clientSlice';
import { getSingleChambre } from '../../../redux/chambreSlice';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { insertRCH } from '../../../redux/rchSlice';

const ReservationCH = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const navigate = useNavigate()
    const {id} = useParams();
    const chambre = useSelector(state=>state.chambre)
    const client = useSelector(state=>state.client)
    const {error} = useSelector(state=>state.client)
    const {status} = useSelector(state=>state.client)
    const {getAllData,data} = useSelector(state=>state.client)
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    useEffect(()=>{
        dispatch(fetchClient())
        dispatch(getSingleChambre(id))
           },[dispatch])
       
           useEffect(()=>{
                },[client,chambre])
console.log("id : ",data)
    const handleFormSubmit = (values) => {
        if(data.length===0){
            dispatch(insertClient(values)).then((data)=>{
                if(data.type==="client/insertClient/fulfilled" ){
                  
                 Swal.fire(
                           'Success',
                           `${data.payload.full_name} a ajouter avec succes`,
                           'success'
                         ) 
                         dispatch( insertRCH({reservationHotelId:id, montant_total:chambre.data.montant, clientId:data.payload.id})).then((datarch)=>{
                            if(datarch.type==="rch/insertRCH/fulfilled" ){
                                console.log(datarch)
                                Swal.fire(
                                    'Success',
                                    `le client a ajouter avec succes`,
                                    'success'
                                  ) 
                            }
                            else{
                                console.log(datarch)

                                Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Something went wrong!',
                                      }) 
                            }
                         })
                
                }else{
                     Swal.fire({
                         icon: 'error',
                         title: 'Oops...',
                         text: 'Something went wrong!',
                       })
                    }
                       
               })
        
               
        }else{
            dispatch( insertRCH({reservationHotelId:id, clientId:data.id,montant_total:chambre.data.montant})).then((datarch)=>{
                if(datarch.type==="rch/insertRCH/fulfilled" ){
                    console.log(datarch)
                    Swal.fire(
                        'Success',
                        `le client a ajouter avec succes`,
                        'success'
                      ) 

                }else{
                    Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                          }) 
                }
             })

        }
      
        
    };
    const initialValues = {
      full_name: "",
      date_naissance: "",
      e_mail: "",
      numero_telephone: "",
      cin: "",
      
  };

    const checkoutSchema = yup.object().shape({
        full_name:yup.string().required("Required"),
        date_naissance:yup.date().required("Required"),
        e_mail:yup.string().email("Invalid email!").required("Required"),
        numero_telephone:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
        cin:yup.number().required("Required"),
        
        

    })

    return (
        <Box m="20px">
          <Header title="CREATE USER" subtitle="Create a New User Profile" />
          { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading" ? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} enableReinitialize={true} validationSchema={checkoutSchema}>
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
{client.getAllData.length===0? <Alert sx={{ gridColumn: "span 4" }} severity="error">pas de client disponible</Alert>:<Autocomplete
  disablePortal
  id="combo-box-demo"
  options={getAllData.map(e=>e.cin)}
  onChange={(event, newValue) => {
    getAllData.map(e=>e.cin===newValue?dispatch(getSingleClient(e.id)):null)
  }}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} variant='filled' label="Client" />}
/>}
                    
                            <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="CIN"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={data.cin}
                    name="cin"
                    error={!!touched.cin && !!errors.cin}
                    helperText={touched.cin && errors.cin}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom et prénom"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={data.full_name}
                    name="full_name"
                    error={!!touched.full_name && !!errors.full_name}
                    helperText={touched.full_name && errors.full_name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="E-mail"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={data.e_mail}
                    name="e_mail"
                    error={!!touched.e_mail && !!errors.e_mail}
                    helperText={touched.e_mail && errors.e_mail}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Date de naissance"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.date_naissance}
                    name="date_naissance"
                    error={!!touched.date_naissance && !!errors.date_naissance}
                    helperText={touched.date_naissance && errors.date_naissance}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="numero du télephone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={data.numero_telephone}
                    name="numero_telephone"
                    error={!!touched.numero_telephone && !!errors.numero_telephone}
                    helperText={touched.numero_telephone && errors.numero_telephone}
                    sx={{ gridColumn: "span 4" }}
                  />
        
          
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Créer nouveau client
                  </Button>
                </Box>
              </form>
            )}
          </Formik>}
        </Box>
      );
}

export default ReservationCH