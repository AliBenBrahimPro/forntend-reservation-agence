import { Box } from '@mui/material'
import React from 'react'
import RCB from './RCB'

function RCT() {
  return (
    <Box>
   {transport==="1" ?<Box sx={{ gridColumn: "span 4"}}><RCB/> </Box>:""}
  {transport==="2" ?  <Box sx={{ gridColumn: "span 4"}}><RCB/></Box>:""}


                </Box>
  )
}

export default RCT