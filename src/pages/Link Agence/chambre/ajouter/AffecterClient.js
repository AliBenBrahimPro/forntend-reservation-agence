import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Header from "../../../../components/Header"

export default function AffecterClient(props) {

    const [listpersonne,setListPersonne]=useState([])

  return (
      <Box m="20px">
          <Header title={props.title} subtitle={props.title} />
          {
              props.listeInput.map((e, index) => {
                  <span>{e}</span>
                  
              })
              
          }

    </Box>
  )
}
