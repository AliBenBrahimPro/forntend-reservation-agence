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
import { login } from '../../redux/userSlice';
import { Formik } from "formik";
import * as yup from 'yup';
import { Visibility,VisibilityOff} from '@mui/icons-material'
import {InputAdornment,IconButton} from '@mui/material'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'

export default function Login() {
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
  const handleSubmit = (event) => {
    dispatch(login(event)).then((data)=>{
    if(data.type==="user/loginuser/fulfilled" ){
      localStorage.setItem("id",data.payload.id)
      localStorage.setItem("code_agence",data.payload.code_agence)
      localStorage.setItem("nom_agence",data.payload.nom_agence)
      localStorage.setItem("email_agence",data.payload.e_mail)
      Swal.fire(
        'Success',
        `${data.payload.nom_agence} à connecté avec succes`,
        'success'
      ) 
      navigate("/agence/dashboard")
     }else{
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })}})
    }
   
  const data={
    e_mail:"",
    password:""
  }
  const checkoutSchema = yup.object().shape({
    e_mail:yup.string().email("Invalid email!").required("Required"),
    password:yup.string().required("Required"),
  })
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Sign in
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
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