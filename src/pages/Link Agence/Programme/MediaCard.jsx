import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Rating, useTheme } from '@mui/material';
import { tokens } from "../../../theme";
import { json, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBus } from '../../../redux/busSlice'
import { getSingleHotels } from '../../../redux/hotelSlice'
import { getSingleEvent } from '../../../redux/eventSlice'

export default function MediaCardProg({PLACE,title,busid,hotelId,evenementId,sub2,sub3,description,btn,onebtn,twobtn,image,id}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const cardcolor=colors.primary[400];
  let navigate = useNavigate();
  const bus = useSelector(state=>state.bus)
  const event = useSelector(state=>state.event)
  const hotels = useSelector(state=>state.hotels)
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(getSingleBus(busid))
    dispatch(getSingleEvent(evenementId))
    dispatch(getSingleHotels(hotelId))
    
   
   
       },[dispatch])
   
       React.useEffect(()=>{
   console.log("event",event.data)
   console.log("idhotel",hotelId)
            },[bus,hotels,event])
  return (
    <Card  sx={{ backgroundColor:cardcolor }}>
      <CardMedia
     component="img"
     src={image}
     sx={{height:200}}  
        
        
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
        {title}
        </Typography>
       
        <Typography gutterBottom variant="h4" component="div">
        {PLACE}
        </Typography>
       {/* <Rating defaultValue={4}></Rating> */}
      
      
       
        <Typography variant="h5" color="secondary">
    Départ
        </Typography>
        <Typography variant="h5" >
          {sub2}
        </Typography>
        <Typography variant="h5" color="secondary">
    Arrive
        </Typography>
        <Typography variant="h5" >
          {sub3}
        </Typography>
      </CardContent>
      <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
        <Box display='flex' flexDirection='column' >  
        <Typography variant="overline"  >
        {onebtn} 
        </Typography> 
        <Typography variant="h4"  >
         {bus.data.prix_place+hotels.data.prix_demi_pension+event.data.prix_evenement} DT
        </Typography>
        </Box>
    
        <Button onClick={(e)=>navigate(`/agence/formprogagence/${id}`)} variant='outlined' color='secondary'>{btn}</Button>
      </CardActions>
    </Card>
  );
}