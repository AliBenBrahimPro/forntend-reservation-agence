import { Alert, CircularProgress, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/Header'
import { fetchAvion } from '../../../redux/avionSlice'
import MediaCard from './MediaCard'
import avionimg from "../../../assets/avion.jpg";
import moment from 'moment'

function AllAvion() {

        const avion = useSelector(state=>state.avion)
      const {error} = useSelector(state=>state.avion)
      const {status} = useSelector(state=>state.avion)
      const {getAllData} = useSelector(state=>state.avion)
      let navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
   dispatch(fetchAvion())
  
      },[dispatch])
  
      useEffect(()=>{
  
       console.log('hotel : ', avion)
           },[avion])
    
  return (
    <Box m="20px">
        <Header title='Tous les Avion' subtitle='Voir toutes les offres des Avion'/>
        { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading" ? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :avion.getAllData.length===0? <Alert severity="error">pas de avion disponible</Alert>:
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                getAllData.map(e=>
                {
                return (<Grid  item xs={12} sm={4} md={4}>
                    <MediaCard id={e.id} image={avionimg} title={`${e.point_depart} à ${e.point_arrive}`} sub3={`${moment(e.date_debut).format('YYYY-MM-DD')} à ${moment(e.date_debut).format('hh:mm')}`}   sub2={`${moment(e.date_fin).format('YYYY-MM-DD')} à ${moment(e.date_fin).format('hh:mm')}`} subtile={`  ${e.nb_place-e.nb_place_reserver}`} onebtn='à partir de' twobtn={e.prix_place_simple} btn='Réserver' description={e.nom_avion}/>
                    </Grid>)})
            }
            

            
        </Grid>}
    </Box>
  )
}

export default AllAvion