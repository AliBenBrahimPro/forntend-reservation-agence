import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function ChooseClient() {
    let navigate = useNavigate();
    const {id} = useParams()
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: '80vh',
    }}
  >
    <Button  sx={{margin:'50px',width:'150px'}} color='secondary' onClick={e=>navigate(`/agence/newclienthotel/${id}`)}  variant="contained">Nauveau client</Button>
    <Button sx={{margin:'50px',width:'150px'}}color='secondary' onClick={e=>navigate('/agence/existclient')}  variant="contained">Exist client</Button>
  </Box>
  )
}

export default ChooseClient