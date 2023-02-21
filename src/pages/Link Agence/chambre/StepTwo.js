import { TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function StepTwo() {
    const client = useSelector((state) => state.productFilter.client);
    const dispatch = useDispatch() 
    console.log("client : ",client)
  return (
    <div>
        {<TextField id="outlined-basic" label="Outlined" variant="outlined" />}
    </div>
  )
}

export default StepTwo