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
    const [nomPrenom,setNomPrenom]=useState([])
    const [numeroPassport,setNumeroPassport]=useState([])
    const [numero,setNumero]=useState([])
    const isNonMobile = useMediaQuery("(min-width:600px)");


    const handleChangeNomPrenom  = index => e => {
        const newArr = nomPrenom;
        newArr[index]=e.target.value
        setNomPrenom(newArr)
     }

    const handleChangeNumero = index => e => {
        const newArr = numeroPassport;
        newArr[index]=e.target.value
        setNumeroPassport(newArr)
     }
    const handleChangeNumeroP = index => e => {
        const newArr = numero;
        newArr[index]=e.target.value
        setNumero(newArr)
     }

    const clickfct = () => {
        nomPrenom.map(e=>console.log("nomPrenom : "+e))
        numero.map(e=>console.log("numero : "+e))
        numeroPassport.map(e=>console.log("numeroPassport : "+e))
    }
    const handleSubmit = () => {}
  return (
      <Box m="20px">
          <Header title={props.title} subtitle={props.title} />
              <form onSubmit={handleSubmit}>
                          {
                              props.listeInput.map((e,index) => {
                                  return(<>
                                      <span>{e} </span>
                                  <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                                    sx={{
                                      "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                                    }}
                                        >
                                      <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Nom prenom"
                                            value={nomPrenom[index]}
                                            onChange={handleChangeNomPrenom(index)}
                                              name="nom_prenom"
                                              required
                                            sx={{ gridColumn: "span 1" }}
                                      />
                                      <TextField
                                            fullWidth
                                            variant="filled"
                                            type="number"
                                            label="numero"
                                            onChange={handleChangeNumero(index)}
                                            value={numero[index]}
                                            name="numero"
                                            sx={{ gridColumn: "span 1" }}
                                      />
                                      <TextField
                                            fullWidth
                                            variant="filled"
                                            type="number"
                                            label="numero passport"
                                            onChange={handleChangeNumeroP(index)}
                                            value={numeroPassport[index]}
                                              name="numero_passport"
                                              required
                                            sx={{ gridColumn: "span 1" }}
                                      />
                      </Box>
                                    </>)
                                  
                              })
                      }
                  </form>
                      
                      <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained" onClick={()=>clickfct()}>
                    affecter client
                  </Button>
                </Box>
                
              


    </Box>
  )
}
