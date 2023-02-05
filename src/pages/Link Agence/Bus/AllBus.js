import { Alert, CircularProgress, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/Header'
import { fetchBus } from '../../../redux/busSlice'
import MediaCard from './MediaCard'
import busimg from "../../../assets/bus.jpg";
import moment from 'moment'

function AllBus() {

        const bus = useSelector(state=>state.bus)
      const {error} = useSelector(state=>state.bus)
      const {status} = useSelector(state=>state.bus)
      const {getAllData} = useSelector(state=>state.bus)
      let navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
   dispatch(fetchBus())
  
      },[dispatch])
  
      useEffect(()=>{
  
       console.log('bus : ', bus)
           },[bus])
    
  return (
    <Box m="20px">
        <Header title='Tous les bus' subtitle='Voir toutes les offres des bus'/>
        { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading" ? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :bus.getAllData.length===0? <Alert severity="error">pas de bus disponible</Alert>:
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                getAllData.map(e=>
                <Grid  item xs={12} sm={4} md={4}>
                    <MediaCard id={e.id} sub3={`${moment(e.date_fin).format('YYYY-MM-DD')} à ${moment(e.date_fin).format('hh:mm')}`} sub2={`${moment(e.date_debut).format('YYYY-MM-DD')} à ${moment(e.date_debut).format('hh:mm')}`}  title={`${e.point_depart} à ${e.point_arrive}`} image={busimg} subtile={`  ${e.nb_place-e.nb_place_reserver}`} onebtn='à partir de' twobtn={e.prix_place} btn='Réserver' description={e.desc}/>
                    </Grid>)
            }
            

            
        </Grid>}
    </Box>
  )
}

export default AllBus