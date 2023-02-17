import React,{useEffect} from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch ,useSelector} from 'react-redux';
import Swal from 'sweetalert2'
import { editUser,getSingleUser } from '../../redux/userSlice';
import { useParams } from 'react-router-dom';
import moment from 'moment'

function EditUser() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch =useDispatch();
  const {id} = useParams();
  const {data} = useSelector(state=>state.user)
  const user = useSelector(state=>state.user)
  useEffect(()=>{
    dispatch(getSingleUser(id))
        },[])  
  const handleFormSubmit = (values) => {
      console.log(values);
      dispatch(editUser(values)).then((data)=>{
        console.log("data",data)
        if(data.type==="user/editUser/fulfilled" ){
         Swal.fire(
                   'Success',
                   `${data.payload.nom_agence} a ete modifie avec succes`,
                   'success'
                 ) 
        }else{
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: "Quelque chose s'est mal passé!",
               })}
       })
  };

  const checkoutSchema = yup.object().shape({
    code_agence:yup.string().required("Required"),
    nom_agence:yup.string().required("Required"),
    e_mail:yup.string().email("Invalid email!").required("Required"),
    numero_telephone:yup.number().required("Required"),
    adresse:yup.string().required("Required"),
    password:yup.string().required("Required"),
    cp_agence:yup.number().required("Required"),
    solde:yup.number().required("Required"),
    credit:yup.number().required("Required"),
    commition_hotel:yup.number().required("Required"),
  })
  return (
    <Box m="20px">
    <Header title="Creer nouveau BUS" subtitle="Ajouter nouveau BUS" />

    <Formik onSubmit={handleFormSubmit} initialValues={data} enableReinitialize={true} validationSchema={checkoutSchema}>
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
                    label="Code Agence"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.code_agence}
                    name="code_agence"
                    error={!!touched.code_agence && !!errors.code_agence}
                    helperText={touched.code_agence && errors.code_agence}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom Agence"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nom_agence}
                    name="nom_agence"
                    error={!!touched.nom_agence && !!errors.nom_agence}
                    helperText={touched.nom_agence && errors.nom_agence}
                    sx={{ gridColumn: "span 2" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Adresse mail"
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
                    type="nulber"
                    label="numéro de téléphone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.numero_telephone}
                    name="numero_telephone"
                    error={!!touched.numero_telephone && !!errors.numero_telephone}
                    helperText={touched.numero_telephone && errors.numero_telephone}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Adresse"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.adresse}
                    name="adresse"
                    error={!!touched.adresse && !!errors.adresse}
                    helperText={touched.adresse && errors.adresse}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Code postal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cp_agence}
                    name="cp_agence"
                    error={!!touched.cp_agence && !!errors.cp_agence}
                    helperText={touched.cp_agence && errors.cp_agence}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Solde "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.solde}
                    name="solde"
                    error={!!touched.solde && !!errors.solde}
                    helperText={touched.solde && errors.solde}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Credit"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.credit}
                    name="credit"
                    error={!!touched.credit && !!errors.credit}
                    helperText={touched.credit && errors.credit}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Commition sur hotel"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.commition_hotel}
                    name="commition_hotel"
                    error={!!touched.commition_hotel && !!errors.commition_hotel}
                    helperText={touched.commition_hotel && errors.commition_hotel}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                  Modifier Agence
                  </Button>
                </Box>
        </form>
      )}
    </Formik>
  </Box>
  )
}

export default EditUser