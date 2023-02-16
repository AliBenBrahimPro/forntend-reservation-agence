import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import { useState } from 'react'
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
   {transport==="1" ?<Box sx={{ gridColumn: "span 4"}}><RCB/> </Box>:""}
  {transport==="2" ?  <Box sx={{ gridColumn: "span 4"}}><RCA/></Box>:""}


                </Box>
  )
}

export default RCT