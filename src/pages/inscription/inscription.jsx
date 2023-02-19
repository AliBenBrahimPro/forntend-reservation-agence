import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom/dist";
import {insertUser} from "./../../redux/userSlice"
import { Formik } from "formik";
import * as yup from 'yup';
import { Visibility,VisibilityOff} from '@mui/icons-material'
import {InputAdornment,IconButton} from '@mui/material'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'

export default function Inscription() {
  const [valuess, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...valuess, showPassword: !valuess.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
    const theme = useTheme();
    const navigate =useNavigate();
    const dispatch =useDispatch();
  const handleSubmit = (event,{resetForm}) => {
      dispatch(insertUser(event)).then((data)=>{
        if(data.type==="user/insertUser/fulfilled" ){
         Swal.fire(
                   'Success',
                   `${data.payload.nom_agence} a ajouter avec succes`,
                   'success'
                 ) 

                 resetForm({
                  e_mail:"",
                  code_agence:"",
                  nom_agence:"",
                  numero_telephone:"",
                  adresse:"",
                  cp_agence:"",
                  password:"",
                  solde:0,
                  credit:0,
                  commition_hotel:0
                 }) 
                     
        }else{
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: "Quelque chose s'est mal passé!",
               })}
       })
    }
   
  const data={
    e_mail:"",
    code_agence:"",
    nom_agence:"",
    numero_telephone:"",
    adresse:"",
    cp_agence:"",
    password:"",
    solde:0,
    credit:0,
    commition_hotel:0
  }
  const checkoutSchema = yup.object().shape({
    e_mail:yup.string().email("Invalid email!").required("Required"),
    code_agence:yup.string().required("Required"),
    nom_agence:yup.string().required("Required"),
    numero_telephone:yup.number().required("Required"),
    adresse:yup.string().required("Required"),
    cp_agence:yup.number().required("Required"),
    password:yup.string().required("Required"),
  })
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{marginBottom:"100px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'inscrire
          </Typography>
          <Formik onSubmit={handleSubmit} initialValues={data} enableReinitialize={true} validationSchema={checkoutSchema}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit,}) => (
        <form onSubmit={handleSubmit}>
          <Box  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              value={values.e_mail}
              required
              fullWidth
              id="email"
              label="Adresse Email"
              name="e_mail"
              autoComplete="email"
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.e_mail && !!errors.e_mail}
              helperText={touched.e_mail && errors.e_mail}
              />
                  
            <TextField
                    margin="normal"
                    fullWidth
                    required
                    type="text"
                    label="Code Agence"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.code_agence}
                    name="code_agence"
                    error={!!touched.code_agence && !!errors.code_agence}
                    helperText={touched.code_agence && errors.code_agence}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    required
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
                    margin="normal"
                    fullWidth
                    required
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
                    margin="normal"
                    fullWidth
                    required
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
                    margin="normal"
                    fullWidth
                    required
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
              margin="normal"
              value={values.password}
              required
              fullWidth
              name="password"
              label="Mots de passe"
              type={valuess.showPassword ? 'text' : 'password'}
              id="password"
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="current-password"
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment:  <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {valuess.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                 </InputAdornment>
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>

            <Grid container >
              <Grid item xs>
                <Link href="/login" variant="body2">
                connexion
                </Link>
              </Grid>
            </Grid>
          </Box>
     </form>
     )}
      </Formik>
      </Box>
      </Container>
    </ThemeProvider>
  );
}