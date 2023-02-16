import { Box } from '@mui/material'
import React from 'react'
import RCA from './RCA'
import RCB from './RCB'

function RCT() {
    const [transport,setTransport]= useState("1")

  return (
    <Box>
   {transport==="1" ?<Box sx={{ gridColumn: "span 4"}}><RCB/> </Box>:""}
  {transport==="2" ?  <Box sx={{ gridColumn: "span 4"}}><RCA/></Box>:""}


                </Box>
  )
}

export default RCT