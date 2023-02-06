import { Alert, CircularProgress, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/Header'
import { fetchHotels } from '../../../redux/hotelSlice'
import MediaCard from './MediaCard'
import hotelimg from "../../../assets/hotel.jpg";
import moment from 'moment'

function AllHotel() {

        const hotels = useSelector(state=>state.hotels)
      const {error} = useSelector(state=>state.hotels)
      const {status} = useSelector(state=>state.hotels)
      const {getAllData} = useSelector(state=>state.hotels)
      let navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
   dispatch(fetchHotels())
  
      },[dispatch])
  
      useEffect(()=>{
  
       console.log('hotel : ', hotels)
           },[hotels])
    
  return (
    <Box m="20px">
        <Header title='Tous les hotel' subtitle='Voir toutes les offres des hotel'/>
        { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading" ? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :hotels.getAllData.length===0? <Alert severity="error">pas de hotel disponible</Alert>:
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                getAllData.map(e=>
                {console.log(`${process.env.REACT_APP_BASE_URL}/${e.image_hotel[0]}`)
                return (<Grid  item xs={12} sm={4} md={4}>
                    <MediaCard stars={e.nb_etoile} id={e.id} sub3={`${moment(e.date_fin).format('YYYY-MM-DD')} à ${moment(e.date_fin).format('hh:mm')}`} sub2={`${moment(e.date_debut).format('YYYY-MM-DD')} à ${moment(e.date_debut).format('hh:mm')}`}  image={`${process.env.REACT_APP_BASE_URL}/${e.image_hotel[0]}`} title={`${e.nom_hotel}`} subtile={`  ${e.capacite}`} onebtn='à partir de' twobtn={e.prix_demi_pension} btn='Réserver' description={e.desc}/>
                    </Grid>)})
            }
            

            
        </Grid>}
    </Box>
  )
}

export default AllHotel