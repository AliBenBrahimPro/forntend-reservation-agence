import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik } from "formik";
import * as yup from 'yup';
import { TextField, useMediaQuery,Alert,CircularProgress, Autocomplete } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate, useParams } from 'react-router-dom';
import {  fetchReservationBus } from '../../../redux/reservationbusSlice';
import {  insertClient,fetchClient,getSinglebymailClient } from '../../../redux/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad',"4"];

export default function ReservationClient() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [test, setTest] = React.useState([]);
  const [nbr, setNbr] = React.useState();
  const [prixBus, setPrixBus] = React.useState();
  const [mail, setMail] = React.useState();
  const dispatch =useDispatch();
  const {id} = useParams();
  const {data} = useSelector(state=>state.reservationbus)
  const reservationbus = useSelector(state=>state.reservationbus)
  const client = useSelector(state=>state.client)
  const {error} = useSelector(state=>state.reservationbus)
  const {status} = useSelector(state=>state.reservationbus)
  
  let navigate = useNavigate();

  useEffect(()=>{
    dispatch(fetchClient())
   
       },[dispatch])
   
       useEffect(()=>{
   
        
            },[client])
  useEffect(()=>{
dispatch(fetchReservationBus())

 },[dispatch])
           
               useEffect(()=>{
                           const test2 =[];
               data.map(e=>e.id==id?setNbr(e.nb_place):setNbr(null));
               data.map(e=>e.id==id?setPrixBus(e.monatnt_total):setPrixBus(null));
                if(nbr != null){
                    for(let i= 0;i<nbr;i++){
                        test2.push(`client ${i+1}`);
                        console.log(test2)
                            }
                         setTest(test2)
                }
                    },[reservationbus,client])


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

 
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const handleFormSubmit = (values) => {      
      dispatch(insertClient(values)).then((data)=>{
        if(data.type==="client/insertClient/fulfilled" ){
         Swal.fire(
                   'Success',
                   `${data.payload.full_name} a ajouter avec succes`,
                   'success'
                 ) 
                 values.full_name="";
                 values.date_naissance=""
                 values.e_mail= ""
                 values.numero_telephone="";
                 handleNext()
        }else{
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: 'Something went wrong!',
               })}
       })
  };
  const initialValues = {
      full_name: "",
      date_naissance:"",
      cin:"",
      e_mail: "",
      numero_telephone: "",
      montant_hotel: 0,
      montant_bus: prixBus/nbr,
      montant_evenement: 0,
      reservationBusId: id,
      reservationEvenementId:null
  };
  const checkoutSchema = yup.object().shape({
      full_name:yup.string().required("Required"),
      cin:yup.string().required("Required"),
      date_naissance:yup.date().required("Required"),
      e_mail:yup.string().email("Invalid email!").required("Required"),
      numero_telephone:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
      montant_hotel:yup.number().required("Required"),
      montant_bus:yup.number().required("Required"),
      montant_evenement:yup.number().required("Required"),
    //   reservationEvenementId:yup.number().required("Required"),

  })
  console.log('i am here',client)
  
  return (

           <Box m="20px">
          <Header title="Ajouter nouveau client" subtitle="Remplir les coordonnés du client" />
    
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
                <Autocomplete
                 fullWidth
                 disablePortal
                 id="combo-box-demo"
                 options={client.data.map(e=>e.e_mail)}
                 sx={{ width: 300 , gridColumn: "span 4"}}
                 renderInput={(params) => <TextField   {...params} label="Email" />}
                 />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom complet"
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
                    label="CIN"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cin}
                    name="cin"
                    error={!!touched.cin && !!errors.cin}
                    helperText={touched.cin && errors.cin}
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
                    type="text"
                    label="Numero telephone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.numero_telephone}
                    name="numero_telephone"
                    error={!!touched.numero_telephone && !!errors.email}
                    helperText={touched.numero_telephone && errors.numero_telephone}
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
                    disabled
                    variant="filled"
                    type="text"
                    label="Montant bus"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.montant_bus}
                    name="montant_bus"
                    error={!!touched.montant_bus && !!errors.montant_bus}
                    helperText={touched.montant_bus && errors.montant_bus}
                    sx={{ gridColumn: "span 4" }}
                  />
           
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          
            <Box sx={{ flex: '1 1 auto' }} />
          

            <Button type='submit' color="secondary" >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
              </form>
            )}
          </Formik>
        </Box>

  );
}