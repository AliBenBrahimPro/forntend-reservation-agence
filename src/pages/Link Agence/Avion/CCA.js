import { Alert, Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import { getnbrReservationTrans } from '../../../redux/reservationtransSlice';

function CCA() {
    let navigate = useNavigate();
    const {id}= useParams();
    const dispatch =useDispatch();
    const reservationtrans= useSelector(state=>state.reservationtrans)

    useEffect(() => {
     dispatch(getnbrReservationTrans(id))
    }, [dispatch])
    useEffect(() => {
     console.log(reservationtrans.data.nombre)
    }, [reservationtrans])
    
  return (
   <Box  m="20px">
  <Header title='Client' subtitle='Selectionner client'/>
  
  <Alert severity='info' >il rest {reservationtrans.data.nombre} client</Alert>
  { reservationtrans.data.nombre===0?navigate("/agence"):
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: '50vh',
    }}
  >
    <Button  sx={{marginRight:'150px',width:'150px'}} color='secondary' onClick={e=>navigate(`/agence/fca/${id}`)}  variant="contained">Nouveau client</Button>
    <Button sx={{width:'150px'}}color='secondary' onClick={e=>navigate(`/agence/eca/${id}`)}  variant="contained">Exist client</Button>
  </Box>}
  </Box>
  )
}

export default CCA