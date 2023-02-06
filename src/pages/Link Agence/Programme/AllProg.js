import { Alert, CircularProgress, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/Header'
import { fetchProgramme } from '../../../redux/programmeSlice'
import { getSingleBus } from '../../../redux/busSlice'
import { getSingleHotels } from '../../../redux/hotelSlice'
import { getSingleEvent } from '../../../redux/eventSlice'
import MediaCard from './MediaCard'
import moment from 'moment'
import tozeur from "../../../assets/tozeur.jpg";

function AllProg() {

        const programme = useSelector(state=>state.programme)
        
      const {error} = useSelector(state=>state.programme)
      const {status} = useSelector(state=>state.programme)
      const {getAllData} = useSelector(state=>state.programme)
      let navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
   dispatch(fetchProgramme())
  
  
      },[dispatch])
  
      useEffect(()=>{
       console.log('Programme : ', programme)
           },[programme])
    
  return (
    <Box m="20px">
        <Header title='Tous les Programme' subtitle='Voir toutes les offres des Programme'/>
        { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading" ? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :programme.getAllData.length===0? <Alert severity="error">pas de Programme disponible</Alert>:
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                getAllData.map(e=>
                { 
                return (<Grid  item xs={12} sm={4} md={4}>
                    <MediaCard busid={e.busId} evenementId={e.evenementId} hotelId={e.hotelId} id={e.id} sub3={`${moment(e.date_fin).format('YYYY-MM-DD')} à ${moment(e.date_fin).format('hh:mm')}`} sub2={`${moment(e.date_debut).format('YYYY-MM-DD')} à ${moment(e.date_debut).format('hh:mm')}`}  image={tozeur} title={`${e.nom_programme}`} subtile={`  ${e.capacite}`} onebtn='à partir de' twobtn={e.prix_demi_pension} btn='Réserver' description={e.desc}/>
                    </Grid>)})
            }
            

            
        </Grid>}
    </Box>
  )
}

export default AllProg