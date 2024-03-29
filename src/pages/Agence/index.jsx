import React from 'react';
import TextField from '@mui/material/TextField';
import './agence.css';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  FormGroup,
  Checkbox,
} from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const Agence = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => navigate('/home');
  console.log(errors);
let navigate =useNavigate()
  return (
    <div className="App__form">
      <h1> Material UI with React Hook Form - Validation with Error Messages </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          id="outlined-basic" 
          name="firstName" 
          label="First Name" 
          variant="outlined" 
          fullWidth 
          {...register("firstName", { required: "First Name is required." })}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
        />
        <TextField 
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          fullWidth
          name="lastName"
          {...register("lastName", { required: "Last Name is required." })}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
        />
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          fullWidth
          name="email"
          {...register("email", { required: "E-mail Address is required." })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
{/* Radio button */}
        <FormControl error={Boolean(errors.gender)} >
          <FormLabel component="legend"> Choose Your Gender </FormLabel>
          <RadioGroup row aria-label="gender" name="gender">
            <FormControlLabel 
              value="female" 
              control={
                <Radio {...register("gender", { required: "Choose your gender" })} />
              } 
              label="Female"
             />
            <FormControlLabel 
              value="male" 
              control={
                <Radio {...register("gender", { required: "Choose your gender" })} />
              } 
              label="Male" 
              />
            <FormControlLabel 
              value="other" 
              control={
                <Radio {...register("gender", { required: "Choose your gender" })} />
              } 
              label="Other" 
            />
            
          </RadioGroup>
          <FormHelperText style={{color:'#d32f2f'}}>{errors.gender?.message}</FormHelperText>
        </FormControl>
        <div className="clearfix"></div>
{/* Check box */}
        <FormGroup 
          error={Boolean(errors.tnc)}
          style={{ display: "block", marginTop: "17px" }}
        >
          <FormControlLabel 
            control={
              <Checkbox  name="tnc" {...register("tnc", { required: "please aggre our terms and condtions" })} />
            } 
            label="I aggree all terms and conditions" 
          />
        </FormGroup>
        <FormHelperText style={{color:'#d32f2f'}}>{errors.tnc?.message}</FormHelperText>
        <div className="clearfix"></div>
        <Button variant="contained" color="primary" type="submit" className="btns">
            create new account
          </Button>
      </form>
    </div>
  )
}
export default Agence