import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, useMediaQuery } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../../components/Header'
import RCA from './RCA'
import RCB from './RCB'

function RCT() {
    const [transport,setTransport]= useState("1")
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const {a,b,n}=useParams()
  return (
    <Box m="20px"> 
    <Header title="Formulaire du programme" subtitle="Remplir les coordonnées des Transport" />
    <Box  display="grid"
    gap="30px"
    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
    sx={{
      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
    }}>
                   <Box sx={{ gridColumn: "span 4",display:'flex',justifyContent:'center' }}>
      <FormControl >
      <FormLabel color='primary' id="demo-row-radio-buttons-group-label">Type de transport</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={e=>setTransport(e.target.value)}
        defaultValue={1}
      >
        <FormControlLabel value="1" control={<Radio color='default' />} label="Bus" />
        <FormControlLabel value="2" control={<Radio color='default' />} label="Avion" />

      </RadioGroup>
    </FormControl>
    </Box>
   {transport==="1" ?<Box sx={{ gridColumn: "span 4"}}><RCB id={b} nbr={n}/> </Box>:""}
  {transport==="2" ?  <Box sx={{ gridColumn: "span 4"}}><RCA id={a}/></Box>:""}


                </Box>
                </Box>

  )
}

export default RCT