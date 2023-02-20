import React, { useEffect, useState } from 'react'
import { Alert, Autocomplete, Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { insertProgramme } from '../../redux/programmeSlice';
import { fetchHotels } from '../../redux/hotelSlice';
import { fetchAvion } from '../../redux/avionSlice';
import { fetchEvent } from '../../redux/eventSlice';
import { fetchBus } from '../../redux/busSlice';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Fab from '@mui/material/Fab';
import axios from 'axios';
import { useTheme } from '@mui/system';
import { tokens } from "../../theme";

function ProgrammeForm() {
  const tokensUser=localStorage.getItem('tokens')
  const [isBus,setIsBus]=useState(1)
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const hotels = useSelector(state=>state.hotels)
    const event = useSelector(state=>state.event)
    const avion = useSelector(state=>state.avion)
    const bus = useSelector(state=>state.bus)
    useEffect(()=>{
        dispatch(fetchHotels())
        dispatch(fetchAvion(tokensUser))
        dispatch(fetchEvent())
        dispatch(fetchBus())
       
           },[dispatch])
       
           useEffect(()=>{
       
                },[hotels,event,hotels,bus,avion])

    const handleFormSubmit = (values,{resetForm}) => {
        console.log(values);
        const formData = new FormData();
        formData.append('image_programme',values.image_programme)
        formData.append('nom_programme',values.nom_programme)
        formData.append('point_depart',values.point_depart)
        formData.append('point_arrive',values.point_arrive)
      if(values.hotelId !=0 )formData.append('hotelId',values.hotelId) 
      if( values.busId !=0 )formData.append('busId',values.busId)
      if(values.evenementId !=0 ) formData.append('evenementId',values.evenementId)
      if( values.avionId != 0 ) formData.append('avionId',values.avionId) 
        formData.append('date_debut',values.date_debut)
        formData.append('date_fin',values.date_fin)
        const res= axios.post(`${process.env.REACT_APP_BASE_URL}/api/programme/addprogramme`,formData)
        .then((res)=>{ if(res.status===200) {Swal.fire(
          'Success',
          `${res.data.nom_programme} a ajouter avec succes`,
          'success'
        ) 
        resetForm({
          nom_programme: "",
          hotelId:0,
          busId:0,
          avionId:0,
          evenementId:0,
          date_debut: "",
          date_fin: "",
          image_programme:null
      })
      }else{ Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Quelque chose s'est mal passé!",
        })}})
         }
    const initialValues = {
        nom_programme: "",
        hotelId:0,
        busId:0,
        avionId:0,
        evenementId:0,
        date_debut: "",
        date_fin: "",
        image_programme:null,
        point_arrive:"",
        point_depart:""
    };
    const checkoutSchema = yup.object().shape({
        nom_programme:yup.string().required("Required"),
        // hotelId:yup.number(),
        // busId:yup.number(),
        // avionId:yup.number(),
        // evenementId:yup.number(),
        date_debut:yup.date().required("Required"),
        date_fin:yup.date().required("Required"),

    })
    const changeRadio = (e) => {
      setIsBus(e)

    }
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
          <Header title="Creer nouveau Programme" subtitle="Ajouter nouveau Programme" />
          {/* { hotels.error!==null ?  <Alert severity="error">{hotels.error}</Alert>
    : 
    
    hotels.status ==="loading"||bus.status ==="loading"||event.status ==="loading" ||avion.status ==="loading" ? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     style={{marginLeft: '50%'}} color="secondary" />
     </Box> */}
    {/* // :avion.getAllData.length===0  ?<Alert severity="error">il n'est pas des avion</Alert>:
    // bus.getAllData.length===0  ?<Alert severity="error">il n'est pas des bus</Alert>:
    // hotels.getAllData.length===0  ?<Alert severity="error">il n'est pas des hotels</Alert>:
    // event.getAllData.length===0  ?<Alert severity="error">il n'est pas des évenements</Alert>: */}
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue}) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                              <Typography variant='h4' color={colors.grey[200]}>Ajouter image</Typography>

             <Box  sx={{ gridColumn: "span 4" , display:'flex',justifyContent:'center',flexDirection: 'column',alignItems:'center'  }}>
             <input
              style={{display: "none" }}
              onBlur={handleBlur}
              onChange={e=>setFieldValue("image_programme",e.target.files[0])}
              name="image_programme"
              accept="image/*"
              id="contained-button-file"
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Fab component="span" >
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
            </Box>
            <Box  sx={{ gridColumn: "span 4" , display:'flex',justifyContent:'center',alignItems:'center'  }}>

            <FormControl sx={{ gridColumn: "span 4" , display:'flex',justifyContent:'space-between',flexDirection: 'column',alignItems:'center'  }}>
    
            <Typography variant='h4' color={colors.grey[200]}>Selectionner type de transport</Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e)=>{changeRadio(e.target.value);setFieldValue('busId',0);setFieldValue('avionId',0);}}
        defaultValue={isBus}
      >
        <FormControlLabel value={1} control={<Radio color='default' />} label="Bus" />
        <FormControlLabel value={0} control={<Radio color='default' />} label="Avion" />
      </RadioGroup>
    </FormControl>
    </Box>
<FormControl sx={{ gridColumn: "span 2" }} fullWidth>
  <InputLabel id="demo-simple-select-label">Bus</InputLabel>
  <Select
    disabled={isBus==0}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    variant="filled"
    value={values.busId}
    name='busId'
    label="Bus"
    onChange={handleChange}
    error={!!touched.busId && !!errors.busId}
    helperText={touched.busId && errors.busId}
  >
  {bus.getAllData.map(e=><MenuItem value={e.id}>{e.matricule}</MenuItem>)  }
   
  </Select>
</FormControl>
<FormControl sx={{ gridColumn: "span 2" }} fullWidth>
  <InputLabel id="demo-simple-select-label">Avion</InputLabel>
  <Select
  disabled={isBus==1}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    variant="filled"
    value={values.avionId}
    label="Avion"
    name='avionId'
    onChange={handleChange}
  >
  {avion.getAllData.map(e=><MenuItem value={e.id}>{e.nom_avion}</MenuItem>)  }

  </Select>
</FormControl>
<FormControl sx={{ gridColumn: "span 4" }} fullWidth>
  <InputLabel id="demo-simple-select-label">Hotels</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    variant="filled"
    value={values.hotelId}
    label="Hotels"
    name='hotelId'
    onChange={handleChange}
    error={!!touched.hotelId && !!errors.hotelId}
    helperText={touched.hotelId && errors.hotelId}
  >
  {hotels.getAllData.map(e=><MenuItem value={e.id}>{e.nom_hotel}</MenuItem>)  }

  </Select>
</FormControl>


                   <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom programme"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nom_programme}
                    name="nom_programme"
                    error={!!touched.nom_programme && !!errors.nom_programme}
                    helperText={touched.nom_programme && errors.nom_programme}
                    sx={{ gridColumn: "span 4" }}
                  />
               
               <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="point de départ"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.point_depart}
                    name="point_depart"
                    error={!!touched.point_depart && !!errors.point_depart}
                    helperText={touched.point_depart && errors.point_depart}
                    sx={{ gridColumn: "span 4" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="point d'arrivée"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.point_arrive}
                    name="point_arrive"
                    error={!!touched.point_arrive && !!errors.point_arrive}
                    helperText={touched.point_arrive && errors.point_arrive}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="datetime-local"
                    label="Date début"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.date_debut}
                    name="date_debut"
                    error={!!touched.date_debut && !!errors.date_debut}
                    helperText={touched.date_debut && errors.date_debut}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="datetime-local"
                    label="Date fin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.date_fin}
                    name="date_fin"
                    inputProps={{ min: values.date_debut}}
                    error={!!touched.date_fin && !!errors.date_fin}
                    helperText={touched.date_fin && errors.date_fin}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Ajouter nouveau programme
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          {/* } */}
        </Box>
      );
}

export default ProgrammeForm