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

export default function MediaCard({title,subtile,sub2,sub3,description,btn,onebtn,twobtn,image,id}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const cardcolor=colors.primary[400];
  let navigate = useNavigate();

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
        <Typography variant="h4" color="text.secondary">
     {description}
        </Typography>
        <Typography  style={{display: 'inline-block'}} variant="h5" color="text.secondary">
          Place disponible : 
        </Typography>
        <Typography p={1}  variant="h5" style={{display: 'inline-block'}}>{subtile}</Typography>
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
         {twobtn} DT
        </Typography>
        </Box>
    
        <Button onClick={(e)=>navigate(`/agence/reservationevenement/${id}`)} variant='outlined' color='secondary'>{btn}</Button>
      </CardActions>
    </Card>
  );
}