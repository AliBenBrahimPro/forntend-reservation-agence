import { Alert, CircularProgress, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/Header'
import { fetchEvent } from '../../../redux/eventSlice'
import MediaCard from './MediaCard'
import moment from 'moment'

function AllEvent() {

        const event = useSelector(state=>state.event)
      const {error} = useSelector(state=>state.event)
      const {status} = useSelector(state=>state.event)
      const {getAllData} = useSelector(state=>state.event)
      let navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
   dispatch(fetchEvent())
  
      },[dispatch])
  
      useEffect(()=>{
  
       console.log('hotel : ', event)
           },[event])
    
  return (
    <Box m="20px">
        <Header title='Tous les Event' subtitle='Voir toutes les offres des Event'/>
        { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading" ? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :event.getAllData.length===0? <Alert severity="error">pas de event disponible</Alert>:
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                getAllData.map(e=>
                {
                return (<Grid  item xs={12} sm={4} md={4}>
                    <MediaCard id={e.id} image={`${process.env.REACT_APP_BASE_URL}/${e.image_evenement}`} title={`${e.nom_evenement}`} sub3={`${moment(e.date_debut).format('YYYY-MM-DD')} à ${moment(e.date_debut).format('hh:mm')}`}   sub2={`${moment(e.date_fin).format('YYYY-MM-DD')} à ${moment(e.date_fin).format('hh:mm')}`} subtile={`  ${e.nb_place-e.nb_place_reserver}`} onebtn='à partir de' twobtn={e.prix_evenement} btn='Réserver' description={e.description}/>
                    </Grid>)})
            }
            

            
        </Grid>}
    </Box>
  )
}

export default AllEvent