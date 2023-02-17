import React, { useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Alert, Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Typography } from '@mui/material';
import Header from '../../../components/Header';
import { getSingleHotels } from '../../../redux/hotelSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PricingTable from './PricingTable';
function HotelDetails() {
    const dispatch = useDispatch();
    const {id}= useParams();
    let navigate = useNavigate();

    const hotels = useSelector(state=>state.hotels)
    const {error} = useSelector(state=>state.hotels)
    const {status} = useSelector(state=>state.hotels)
    const {data} = useSelector(state=>state.hotels)
    console.log(data)
    useEffect(() => {
    dispatch(getSingleHotels(id))
    }, [])
    console.log("hoteldata",data)
  return (
<Box>
{ error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading"? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :data.length===0?<Alert severity="error">there is no data found</Alert> :
    <Box m="20px"  >
        <Header title={data.nom_hotel} subtitle={data.adresse}/>
        <div className='main-slide'>
          <Box style={{display:'flex',justifyContent:'center'}} >
    <Carousel  width={"50%"} autoPlay axis="horizontal" infiniteLoop  >
    { data.image_hotel.map(e=><div>
        <img  src={`${process.env.REACT_APP_BASE_URL}/${e}`} />
    </div>) 
    }
    
</Carousel>
</Box>  
</div>
<PricingTable item11={data.prix_demi_pension*2} item31={(data.prix_demi_pension*(1-data.porcentage_chambre_triple/100))*3} item21={data.prix_demi_pension+data.frais_chambre_single}
   item41={(data.prix_demi_pension*(1-data.porcentage_chambre_quadruple/100))*4} item12={data.prix_pension_complete*2} item22={data.prix_pension_complete+data.frais_chambre_single}
   item32={(data.prix_pension_complete*(1-data.porcentage_chambre_triple/100))*3} item42={(data.prix_pension_complete*(1-data.porcentage_chambre_quadruple/100))*4} 
   item13={data.prix_all_inclusive_soft*2} item23={data.prix_all_inclusive_soft+data.frais_chambre_single} item33={(data.prix_all_inclusive_soft*(1-data.porcentage_chambre_triple/100))*3}
   item43={(data.prix_all_inclusive_soft*(1-data.porcentage_chambre_quadruple/100))*4}  item14={data.prix_all_inclusive*2} item24={data.prix_all_inclusive+data.frais_chambre_single} 
   item34={(data.prix_all_inclusive*(1-data.porcentage_chambre_triple/100))*3} item44={(data.prix_all_inclusive*(1-data.porcentage_chambre_quadruple/100))*4}/>

<Typography marginBottom={5} variant="h3"fontWeight="bold">Services & équipements :</Typography>

<Box sx={{ gridColumn: "span 4",justifyContent:'center' }} >
                  
                  <FormGroup  row sx={{display: "grid",justifyContent:'center',
  gridTemplateColumns: "repeat(auto-fill, 186px)", gridGap: "10px"}} >
      <FormControlLabel  control={<Checkbox disabled readOnly defaultChecked={data.services_equipements.climatisation}
                     name="services_equipements"  color='default' />} label="Climatisation" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements"disabled readOnly defaultChecked={data.services_equipements.restaurant}  color='default' />} label="Restaurant" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements"disabled readOnly defaultChecked={data.services_equipements.centreAffaires}  color='default' />} label="Centre d'affaires" />
      <FormControlLabel control={<Checkbox 
                    name="services_equipements"disabled readOnly defaultChecked={data.services_equipements.piscine}  color='default' />} label="Piscine" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements"disabled readOnly defaultChecked={data.services_equipements.television} color='default' />} label="Télévision" />
      <FormControlLabel control={<Checkbox 
                    name="services_equipements"disabled readOnly defaultChecked={data.services_equipements.boutiqueCadeaux} color='default' />} label="Boutique de cadeaux" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements"disabled  readOnly defaultChecked={data.services_equipements.change} color='default' />} label="Change" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements"disabled readOnly defaultChecked={data.services_equipements.bar}  color='default' />} label="Bar" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements"disabled readOnly defaultChecked={data.services_equipements.plage}  color='default' />} label="Plage" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements"disabled readOnly defaultChecked={data.services_equipements.cafe} color='default' />} label="Café" />
      <FormControlLabel control={<Checkbox 
                   
                     name="services_equipements"disabled readOnly defaultChecked={data.services_equipements.ascenseur} color='default' />} label="Ascenseur" />
      <FormControlLabel control={<Checkbox 
                   
                      name="services_equipements" disabled readOnly defaultChecked={data.services_equipements.tennis}  color='default' />} label="Tennis" />
      <FormControlLabel  control={<Checkbox 
                    
                    name="services_equipements" disabled readOnly defaultChecked={data.services_equipements.animauxAutorises}  color='default' />} label="Animaux autorisés" />
    </FormGroup>
    </Box>
    <Box display="flex" justifyContent="end" mt="20px">
                  <Button onClick={(e)=>navigate(`/agence/chambre/${id}`)} type="submit" color="secondary" variant="contained">
                    Réserver
                  </Button>
                </Box>

</Box>}

</Box>
)
}

export default HotelDetails