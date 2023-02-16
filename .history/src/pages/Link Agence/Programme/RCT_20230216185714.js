import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { FormControl } from 'react-bootstrap'
import RCA from './RCA'
import RCB from './RCB'

function RCT() {
    const [transport,setTransport]= useState("1")
    const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
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
   {transport==="1" ?<Box sx={{ gridColumn: "span 4"}}><RCB/> </Box>:""}
  {transport==="2" ?  <Box sx={{ gridColumn: "span 4"}}><RCA/></Box>:""}


                </Box>
  )
}

export default RCT