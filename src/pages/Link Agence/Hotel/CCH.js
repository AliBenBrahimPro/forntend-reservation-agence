import { Alert, Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import { getnbrReservationhotel } from '../../../redux/reservationhotelSlice';
import { getnbrReservationTrans } from '../../../redux/reservationtransSlice';

function CCH() {
    let navigate = useNavigate();
    const {id}= useParams();
    const dispatch =useDispatch();
    const reservationhotel= useSelector(state=>state.reservationhotel)

    useEffect(() => {
     dispatch(getnbrReservationhotel(id))
    }, [dispatch])
    useEffect(() => {
     console.log(reservationhotel)
    }, [reservationhotel])
    
  return (
   <Box  m="20px">
  <Header title='Client' subtitle='Selectionner client'/>
  
  <Alert severity='info' >il rest {reservationhotel.data.nombre} client</Alert>
  { reservationhotel.data.nombre===0?navigate("/agence"):
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
  </Box>}
  </Box>
  )
}

export default CCH