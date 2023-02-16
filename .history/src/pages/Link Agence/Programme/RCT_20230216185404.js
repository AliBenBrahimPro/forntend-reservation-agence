import React from 'react'

function RCT() {
  return (
    </Box>
   {transport==="1" ?<Box sx={{ gridColumn: "span 4"}}><ReservationBus/> </Box>:""}
  {transport==="2" ?  <Box sx={{ gridColumn: "span 4"}}><ReservationAvion/></Box>:""}


                </Box>
  )
}

export default RCT