import React, { useEffect } from 'react'
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { editProgramme } from '../../redux/programmeSlice';
import { fetchHotels } from '../../redux/hotelSlice';
import { fetchAvion } from '../../redux/avionSlice';
import { fetchEvent } from '../../redux/eventSlice';
import {  getSingleProgramme} from '../../redux/programmeSlice';
import { fetchBus } from '../../redux/busSlice';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

function EditProgramme() {
  const navigate = useNavigate();
  const tokens=localStorage.getItem('tokens')
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const hotels = useSelector(state=>state.hotels)
    const event = useSelector(state=>state.event)
    const avion = useSelector(state=>state.avion)
    const programme = useSelector(state=>state.programme)
    const {data} = useSelector(state=>state.programme)

    const bus = useSelector(state=>state.bus)
    const {id} = useParams();

    useEffect(()=>{
        dispatch( getSingleProgramme(id))
        dispatch(fetchHotels())
        dispatch(fetchAvion(tokens))
        dispatch(fetchEvent())
        dispatch(fetchBus())
       
           },[dispatch])
       
           useEffect(()=>{
       
                },[hotels,event,hotels,bus,avion,programme])
                console.log("i am herre",data)

    const handleFormSubmit = (values) => {
        console.log(values);
       
        dispatch(editProgramme(values)).then((data)=>{
          if(data.type==="programme/editProgramme/fulfilled" ){
           Swal.fire(
                     'Success',
                     `${data.payload.nom_programme} a ajouter avec succes`,
                     'success'
                   ) 
                   navigate("/admin/ListProgramme")
          }else{
               Swal.fire({
                   icon: 'error',
                   title: 'Oops...',
                   text: "Quelque chose s'est mal passé!",
                 })}
         })
    };

    const checkoutSchema = yup.object().shape({
        nom_programme:yup.string().required("Required"),
        hotelId:yup.number().required("Required"),
        busId:yup.number().required("Required"),
        avionId:yup.number().required("Required"),
        evenementId:yup.number().required("Required"),
        date_debut:yup.date().required("Required"),
        date_fin:yup.date().required("Required"),

    })
    return (
        <Box m="20px">
          <Header title="Creer nouveau programme" subtitle="Ajouter nouveau programme" />
    
          <Formik onSubmit={handleFormSubmit} initialValues={data} enableReinitialize={true} validationSchema={checkoutSchema}>
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
<FormControl sx={{ gridColumn: "span 2" }} fullWidth>
  <InputLabel id="demo-simple-select-label">Bus</InputLabel>
  <Select
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
  {bus.data.map(e=><MenuItem value={e.id}>{e.matricule}</MenuItem>)  }
   
  </Select>
</FormControl>
<FormControl sx={{ gridColumn: "span 2" }} fullWidth>
  <InputLabel id="demo-simple-select-label">Avion</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    variant="filled"
    value={values.avionId}
    label="Avion"
    name='avionId'
    onChange={handleChange}
    error={!!touched.avionId && !!errors.avionId}
    helperText={touched.avionId && errors.avionId}
  >
  {avion.data.map(e=><MenuItem value={e.id}>{e.nom_avion}</MenuItem>)  }

  </Select>
</FormControl>
<FormControl sx={{ gridColumn: "span 2" }} fullWidth>
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
  {hotels.data.map(e=><MenuItem value={e.id}>{e.nom_hotel}</MenuItem>)  }

  </Select>
</FormControl>
<FormControl sx={{ gridColumn: "span 2" }} fullWidth>
  <InputLabel id="demo-simple-select-label">Evenement</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.evenementId}
    variant="filled"
    label="Evenement"
    name='evenementId'
    onChange={handleChange}
    error={!!touched.evenementId && !!errors.evenementId}
    helperText={touched.evenementId && errors.evenementId}
    
  >
  {event.data.map(e=><MenuItem value={e.id}>{e.nom_evenement}</MenuItem>)  }
   
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
              type="datetime-local"
              label="Date début"
              onBlur={handleBlur}
              onChange={handleChange}
              value={moment(values.date_debut).format("YYYY-MM-DD[T]HH:mm:ss")}
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
              value={moment(values.date_fin).format("YYYY-MM-DD[T]HH:mm:ss")}
              name="date_fin"
              inputProps={{ min: values.date_debut}}
              error={!!touched.date_fin && !!errors.date_fin}
              helperText={touched.date_fin && errors.date_fin}
              sx={{ gridColumn: "span 4" }}
            />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                  Modifier programme
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      );
}

export default EditProgramme