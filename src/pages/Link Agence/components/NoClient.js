import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function NoClient() {
    let navigate = useNavigate();
    
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '80vh',
    }}
  >
    <Typography m={5} variant="h2" >
    Il n'est pas de reservation disponible    </Typography>
    <Button color='secondary' onClick={e=>navigate('/agence')}  variant="contained">Back Home</Button>
  </Box>
  )
}

export default NoClient