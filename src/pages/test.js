import React, { useEffect, useState } from 'react'
import { Alert, Autocomplete, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../components/Header";
import { fetchClient, insertClient,getSingleClient } from '../redux/clientSlice';
import { getSingleReservationTrans } from '../redux/reservationtransSlice';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { insertRCT } from '../redux/rctSlice';

const ClientBus = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();

    const {id} = useParams();
    const reservationtrans = useSelector(state=>state.reservationtrans)
    const [fullName,setFullName]=useState()
    const [email,setEmail]=useState()
    const [numTel,setNumTel]=useState()
    const [cIN,setCin]=useState()
    const [dateNaissance,setDateNaissance]=useState()
    const client = useSelector(state=>state.client)
    const {error} = useSelector(state=>state.client)
    const {status} = useSelector(state=>state.client)
    const {getAllData,data} = useSelector(state=>state.client)
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    useEffect(()=>{
        dispatch(fetchClient())
        dispatch(getSingleReservationTrans(id))
           },[dispatch])
       
           useEffect(()=>{
                },[client,reservationtrans])
console.log("id : ",id)
    const handleFormSubmit = (values) => {
      console.log(values)
        // if(data.length===0){
        //     dispatch(insertClient(values)).then((data)=>{
        //         if(data.type==="client/insertClient/fulfilled" ){
                  
        //          Swal.fire(
        //                    'Success',
        //                    `${data.payload.full_name} a ajouter avec succes`,
        //                    'success'
        //                  ) 
        //                  dispatch( insertRCT({reservationTarnsportId:id, clientId:data.payload.id})).then((datarct)=>{
        //                     if(datarct.type==="rct/insertRCT/fulfilled" ){
        //                         Swal.fire(
        //                             'Success',
        //                             `le client a ajouter avec succes`,
        //                             'success'
        //                           ) 

        //                     }
        //                     else{
        //                         console.log(datarct)

        //                         Swal.fire({
        //                                 icon: 'error',
        //                                 title: 'Oops...',
        //                                 text: 'Something went wrong!',
        //                               }) 
        //                     }
        //                  })
                
        //         }else{
        //              Swal.fire({
        //                  icon: 'error',
        //                  title: 'Oops...',
        //                  text: 'Something went wrong!',
        //                })
        //             }
                       
        //        })
        
               
        // }else{
        //     dispatch( insertRCT({reservationTarnsportId:id, clientId:data.id})).then((datarct)=>{
        //         if(datarct.type==="rct/insertRCT/fulfilled" ){
        //             console.log(datarct)
        //             Swal.fire(
        //                 'Success',
        //                 `le client a ajouter avec succes`,
        //                 'success'
        //               ) 

        //         }else{
        //             Swal.fire({
        //                     icon: 'error',
        //                     title: 'Oops...',
        //                     text: 'Something went wrong!',
        //                   }) 
        //         }
        //      })

        // }
      
        
    };
    const initialValues = {
      full_name: "",
      date_naissance: "",
      e_mail: "",
      numero_telephone: "",
      cin: "",
      
  };

    const checkoutSchema = yup.object().shape({
        // full_name:yup.string().required("Required"),
        // date_naissance:yup.date().required("Required"),
        // e_mail:yup.string().email("Invalid email!").required("Required"),
        // numero_telephone:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
        // cin:yup.number().required("Required"),
        
        

    });
   const handleClick = (e) => {
console.log(e.target.value)    }

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
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues}  validationSchema={checkoutSchema}>
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
{client.getAllData.length===0? <Alert sx={{ gridColumn: "span 4" }} severity="error">pas de client disponible</Alert>:
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Cin</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    onChange={e=>dispatch(getSingleClient(e.target.value))}
  >
  { getAllData.map(e=> <MenuItem value={e.id}>{e.cin}</MenuItem>)}
  
  </Select>
</FormControl>}
               
            
        
          
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

export default ClientBus