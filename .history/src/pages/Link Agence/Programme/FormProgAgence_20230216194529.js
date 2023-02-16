import React, { useState } from 'react'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate, useParams } from 'react-router-dom';
import Chambre from '../chambre/Chambre';
import ReservationBus from '../Bus/ReservationBus';
import ReservationAvion from '../Avion/ReservationAvion';
import RCH from './RCH';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProgramme } from '../../../redux/programmeSlice';
const FormProgAgence = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const {data,status} = useSelector(state=>state.programme)
    const {id}=useParams()
useEffect(() => {
dispatch(getSingleProgramme(id))
}, [])

    const handleFormSubmit = (values) => {
        console.log(values);

    };



    return (
        <Box m="20px">
          <Header title="Formulaire du programme" subtitle="Remplir les coordonnées des chambres" />

    {status==="loading"?<CircularProgress/>: <RCH eventid={}={data.hotelId}  hotelsid={data.hotelId}  avionid={data.avionId} busid={data.busId}/>}

        </Box>
      );
}

export default FormProgAgence