import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';

function Ccp() {
    let navigate = useNavigate();
    const {id}= useParams();
    
  return (
    <Box  m="20px">
  <Header title='Client' subtitle='Selectionner client'/>

    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: '50vh',
    }}
  >
    <Button  sx={{marginRight:'150px',width:'150px'}} color='secondary' onClick={e=>navigate(`/agence/ncp/${id}`)}  variant="contained">Nouveau client</Button>
    <Button sx={{width:'150px'}}color='secondary' onClick={e=>navigate(`/agence/ecp`)}  variant="contained">Exist client</Button>
  </Box>
  </Box>
  )
}

export default Ccp