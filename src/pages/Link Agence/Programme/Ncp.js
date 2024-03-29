import React, { useEffect } from 'react'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header";
import { fetchClient, insertClient,getSingleClient } from '../../../redux/clientSlice';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { insertRCH } from '../../../redux/rchSlice';
import { insertResevationprogramme } from '../../../redux/reservationprogrammeSlice';
import { insertRCP } from '../../../redux/rcpSlice';
const Ncp = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const {id}=useParams();
    const chambre = useSelector(state=>state.chambre)
    const client = useSelector(state=>state.client)
    const {error} = useSelector(state=>state.client)
    const {status} = useSelector(state=>state.client)
    const {getAllData,data} = useSelector(state=>state.client)
    let navigate = useNavigate();
    useEffect(()=>{
        dispatch(getSingleClient(id))
       
           },[dispatch])
       
           useEffect(()=>{
       console.log("client id :",data.id)
                },[client])
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const handleFormSubmit = (values) => {
        console.log(values);
 dispatch(insertRCP(
  {montant_total:localStorage.getItem('price'), clientId:data.id,reservationTarnsportId:localStorage.getItem('reservationTarnsportId'),reservationHotelId:localStorage.getItem('reservationHotelId'),programmeId:localStorage.getItem('programid'),reservationId:localStorage.getItem('reservationid')})).then((datarct)=>{
  if(datarct.type==="rcp/insertRCP/fulfilled" ){
      console.log(datarct)
      Swal.fire(
          'Success',
          `le client a ajouter avec succes`,
          'success'
        ) 
        navigate(`/agence/ccp`)
  }else{
      Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Quelque chose s'est mal passé!",
            }) 
  }
})
     
        
    };



    return (
        <Box m="20px">
          <Header title="CREATE USER" subtitle="Create a New User Profile" />
    
        { status==="loading"?<CircularProgress/>: <Formik onSubmit={handleFormSubmit} enableReinitialize={true} initialValues={data}>
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
                    label="CIN"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cin}
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
                    value={values.full_name}
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
                    value={values.e_mail}
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
                    value={moment(values.date_naissance).format("YYYY-MM-DD") }
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
                    value={values.numero_telephone}
                    name="numero_telephone"
                    error={!!touched.numero_telephone && !!errors.numero_telephone}
                    helperText={touched.numero_telephone && errors.numero_telephone}
                    sx={{ gridColumn: "span 4" }}
                  />
        
          
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                   Affeecter un client
                  </Button>
                </Box>
              </form>
            )}
          </Formik>}
        </Box>
      );
}

export default Ncp