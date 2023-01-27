import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik } from "formik";
import * as yup from 'yup';
import { TextField, useMediaQuery,Alert,CircularProgress } from "@mui/material";
import Header from "../../components/Header";
import { useParams } from 'react-router-dom';
import {  fetchReservationBus } from '../../redux/reservationbusSlice';
import {  insertClient } from '../../redux/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad',"4"];

export default function ReservationClient() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [test, setTest] = React.useState([]);
  const [nbr, setNbr] = React.useState();
  const [prixBus, setPrixBus] = React.useState();
  const dispatch =useDispatch();
  const {id} = useParams();
  const {data} = useSelector(state=>state.reservationbus)
  const reservationbus = useSelector(state=>state.reservationbus)
  const {error} = useSelector(state=>state.reservationbus)
  const {status} = useSelector(state=>state.reservationbus)
  console.log("data",data)


        useEffect(()=>{
            dispatch(fetchReservationBus())
           
           
           
               },[dispatch])
           
               useEffect(()=>{
           
                console.log('reservationbus : ', reservationbus)
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
                    },[reservationbus])

console.log(test)
  const isStepOptional = (step) => {
    return step ;
  };

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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const handleFormSubmit = (values) => {
      console.log(values);
      
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
      date_naissance:yup.date().required("Required"),
      e_mail:yup.string().email("Invalid email!").required("Required"),
      numero_telephone:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
      montant_hotel:yup.number().required("Required"),
      montant_bus:yup.number().required("Required"),
      montant_evenement:yup.number().required("Required"),
    //   reservationEvenementId:yup.number().required("Required"),

  })
  return (
    <Box>

    { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading"? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :reservationbus.data.length===0? "there is no data found":
    <Box sx={{ width: '100%' }}>
        
      {test.length===0? "no data found": <Stepper sx={{color:"yellow"}} color='yellow' activeStep={activeStep}>
        {test.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
  
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step sx={{color:"yellow"}} key={label} {...stepProps}>
              <StepLabel sx={{color:"yellow"}} {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>}
      {activeStep === steps.length ? (
        <React.Fragment >
          <Typography  sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box  sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button color="secondary" onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
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
                    sx={{ gridColumn: "span 4" }}
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
                    label="Montant hotel"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.montant_hotel}
                    name="montant_hotel"
                    error={!!touched.montant_hotel && !!errors.montant_hotel}
                    helperText={touched.montant_hotel && errors.montant_hotel}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
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
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Montant evenement"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.montant_evenement}
                    name="montant_evenement"
                    error={!!touched.montant_evenement && !!errors.montant_evenement}
                    helperText={touched.montant_evenement && errors.montant_evenement}
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
          
        </React.Fragment>
      )}
    </Box>}
    </Box>
  );
}