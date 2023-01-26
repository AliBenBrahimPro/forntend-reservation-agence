import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik } from "formik";
import * as yup from 'yup';
import { TextField, useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
// const stepsed = ['Select campaign settings', 'Create an ad group', 'Create an ad',"4"];

export default function ReservationClient({number}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [stepsed, setstepseded] = React.useState([]);
useEffect(() => {
  for(const i=0 ;i<7;i++){
    stepsed.push("Client"+i+1)
  }
}, [])

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

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const handleFormSubmit = (values) => {
      console.log(values);
  };
  const initialValues = {
      full_name: "",
      date_naissance:"",
      e_mail: "",
      numero_telephone: "",
      montant_hotel: "",
      montant_bus: "",
      montant_evenement: "",
      reservationBusId: "",
      reservationEvenementId:""
  };
  const checkoutSchema = yup.object().shape({
      full_name:yup.string().required("Required"),
      date_naissance:yup.date().required("Required"),
      e_mail:yup.string().email("Invalid email!").required("Required"),
      numero_telephone:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
      montant_hotel:yup.number().required("Required"),
      montant_bus:yup.number().required("Required"),
      montant_evenement:yup.number().required("Required"),
      reservationEvenementId:yup.number().required("Required"),

  })
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper sx={{color:"yellow"}} color='yellow' activeStep={activeStep}>
        {stepsed.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index==2)) {
            labelProps.optional = (
              <Typography color="secondary" variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step sx={{color:"yellow"}} key={label} {...stepProps}>
              <StepLabel sx={{color:"yellow"}} {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === stepsed.length ? (
        <React.Fragment >
          <Typography  sx={{ mt: 2, mb: 1 }}>
            All stepsed completed - you&apos;re finished
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
            <Button
              color="secondary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="secondary" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button type='submit' color="secondary" onClick={handleNext}>
              {activeStep === stepsed.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
              </form>
            )}
          </Formik>
        </Box>
          
        </React.Fragment>
      )}
    </Box>
  );
}