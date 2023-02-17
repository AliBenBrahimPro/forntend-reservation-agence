import { Alert, Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import { getnbrReservationTrans } from '../../../redux/reservationtransSlice';

function CCH() {
    let navigate = useNavigate();
    const {id}= useParams();
    const dispatch =useDispatch();
    const reservationtrans= useSelector(state=>state.reservationtrans)


    
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
    <Button  sx={{marginRight:'150px',width:'150px'}} color='secondary' onClick={e=>navigate(`/agence/fch/${id}`)}  variant="contained">Nouveau client</Button>
    <Button sx={{width:'150px'}}color='secondary' onClick={e=>navigate(`/agence/ech/${id}`)}  variant="contained">Exist client</Button>
  </Box>
  </Box>
  )
}

export default CCH