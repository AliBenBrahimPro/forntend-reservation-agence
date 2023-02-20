import React,{useEffect, useState} from 'react'
import { Box, Button, FormControl, FormLabel, Radio, RadioGroup,Alert,CircularProgress, TextField } from '@mui/material'
import { Formik,Field ,useFormik} from "formik";
import * as yup from 'yup';
import { useMediaQuery,useTheme } from "@mui/material";
import Header from "../../components/Header";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import { useParams,useNavigate  } from 'react-router-dom';
import './hotelForm.css'
import Fab from '@mui/material/Fab';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { tokens } from "../../theme";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch ,useSelector} from 'react-redux';
import {editHotels, getSingleHotels} from '../../redux/hotelSlice';
import moment from 'moment'
import axios from 'axios';

function EditHotel() {
const navigate = useNavigate();
const dispatch =useDispatch();
const {id} = useParams();
const {data} = useSelector(state=>state.hotels)
const hotels = useSelector(state=>state.hotels)
const [climatisation,setClimatisation]=useState(data?.services_equipements?.climatisation);
const [restaurant,setrestaurant]=useState(data?.services_equipements?.restaurant);
const [centreAffaires,setcentreAffaires]=useState(data?.services_equipements?.centreAffaires);
const [piscine,setpiscine]=useState(data?.services_equipements?.piscine);
const [television,settelevision]=useState(data?.services_equipements?.television);
const [boutiqueCadeaux,setboutiqueCadeaux]=useState(data?.services_equipements?.boutiqueCadeaux);
const [change,setchange]=useState(data?.services_equipements?.change);
const [bar,setbar]=useState(data?.services_equipements?.bar);
const [plage,setplage]=useState(data?.services_equipements?.plage);
const [cafe,setcafe]=useState(data?.services_equipements?.cafe);
const [ascenseur,setascenseur]=useState(data?.services_equipements?.ascenseur);
const [tennis,settennis]=useState(data?.services_equipements?.tennis);
const [animauxAutorises,setanimauxAutorises]=useState(data?.services_equipements?.animauxAutorises);
const [image,setImage]=useState([]);

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    useEffect(()=>{
dispatch(getSingleHotels(id))
    },[dispatch])
    useEffect(()=>{
      setTimeout(() => {
           
      }, 1000);
          },[hotels])

        console.log(data)
          const handleFormSubmit =async (values,{resetForm}) => {
  console.log("test",values.services_equipements)
            const service={
              climatisation:climatisation,
              restaurant:restaurant,
              centreAffaires:centreAffaires,
              piscine:piscine,
              television:television,
              boutiqueCadeaux:boutiqueCadeaux,
              change:change,
              bar:bar,
              plage:plage,
              cafe:cafe,
              ascenseur:ascenseur,
              tennis:tennis,
              animauxAutorises:animauxAutorises
            }
console.log("service",service)
            //  values.services_equipements=service
      
            const formData = new FormData();
          console.log(values)
            // formData.append('image_hotel',data.image_hotel)
            // formData.append('nom_hotel',values.nom_hotel)
            // formData.append('numero_telephone',values.numero_telephone)
            // formData.append('e_mail',values.e_mail)
            // formData.append('adresse',values.adresse)
            // formData.append('nb_etoile',values.nb_etoile)
            // formData.append('prix_chambre_double',values.prix_chambre_double)
            // formData.append('frais_chambre_single',values.frais_chambre_single)
            // formData.append('porcentage_chambre_triple',values.porcentage_chambre_triple)
            // formData.append('porcentage_chambre_quadruple',values.porcentage_chambre_quadruple)
            // formData.append('prix_demi_pension',values.prix_demi_pension)
            // formData.append('prix_pension_complete',values.prix_pension_complete)
            // formData.append('prix_all_inclusive',values.prix_all_inclusive)
            // formData.append('prix_all_inclusive_soft',values.prix_all_inclusive_soft)
            // formData.append('capacite',values.capacite)
            // formData.append('commision',values.commision)
            // formData.append('services_equipements',JSON.stringify(service))
            // formData.append('date_debut',values.date_debut)
            // formData.append('date_fin',values.date_fin)
            // formData.append('type_promotion',values.type_promotion)
            // formData.append('capacite_chambre_single',values.capacite_chambre_single)
            // formData.append('capacite_chambre_triple',values.capacite_chambre_triple)
            // formData.append('capacite_chambre_double',values.capacite_chambre_double)
            // formData.append('capacite_chambre_quadriple',values.capacite_chambre_quadriple)
            // formData.append('prix_petit_dejeuner',values.prix_petit_dejeuner)
            // formData.append('bebe_gratuit',values.bebe_gratuit)
            // formData.append('reduction_enfant',values.reduction_enfant)
            // formData.append('date_debut_promotion',values.date_debut_promotion)
            // formData.append('date_fin_promotion',values.date_fin_promotion)
          
      // const x=formData
      // console.log(x)
      const data={
          nom_hotel: values.nom_hotel,
          e_mail: values.e_mail,
          numero_telephone: values.numero_telephone,
          adresse: values.adresse,
          nb_etoile: values.nb_etoile,
          capacite: values.capacite,
          capacite_chambre_single: values.capacite_chambre_single,
          capacite_chambre_double: values.capacite_chambre_double,
          capacite_chambre_triple: values.capacite_chambre_triple,
          capacite_chambre_quadriple: values.capacite_chambre_quadriple,
          nb_place_reserver: values.nb_place_reserver,
          porcentage_chambre_triple: values.porcentage_chambre_triple,
          porcentage_chambre_quadruple: values.porcentage_chambre_quadruple,
          frais_chambre_single: values.frais_chambre_single,
          prix_demi_pension: values.prix_demi_pension,
          prix_pension_complete: values.prix_pension_complete,
          prix_all_inclusive: values.prix_all_inclusive,
          prix_all_inclusive_soft: values.prix_all_inclusive_soft,
          prix_petit_dejeuner: values.prix_petit_dejeuner,
          type_promotion: values.type_promotion,
          bebe_gratuit: values.bebe_gratuit,
          reduction_enfant: values.reduction_enfant,
          commision: values.commision,
          date_debut:values.date_debut ,
          date_fin: values.date_fin,
          date_debut_promotion: values.date_debut_promotion,
          date_fin_promotion: values.date_fin_promotion,
          services_equipements:service,
          nb_place_reserver_single: values.nb_place_reserver_single,
          nb_place_reserver_double: values.nb_place_reserver_double,
          nb_place_reserver_triple: values.nb_place_reserver_triple,
          nb_place_reserver_quadriple: values.nb_place_reserver_quadriple
  }

      // values.services_equipements=JSON.stringify(service)
        const res =  await axios.put(`${process.env.REACT_APP_BASE_URL}/api/hotel/updatehotel/${id}`,data)
                     if(res.status===200 ){
                      Swal.fire(
                                'Success',
                                `${res.data.nom_hotel} a modifier avec succes`,
                                'success'
                              ) 
                       navigate(`/admin/listhotel`)
      
                     }else{
                          Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text:"Quelque chose s'est mal passé!",
                            })}
                    
      
      
          };
  
    const [selectedImages, setSelectedImages] = React.useState([]);

    const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);
  
      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });
  
      setSelectedImages((previousImages) => previousImages.concat(imagesArray));
      
      console.log(selectedImages)
      // FOR BUG IN CHROME
      event.target.value = "";
    };

    const checkoutSchema = yup.object().shape({
     
      nom_hotel:yup.string().required("Required"),
      adresse:yup.string().required("Required"),
      e_mail:yup.string().email("Invalid email!").required("Required"),
      numero_telephone:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
      nb_etoile:yup.number().required("Required"),
      // prix_chambre_double:yup.number().required("Required"),
      frais_chambre_single:yup.number().required("Required"),
      porcentage_chambre_triple:yup.number().required("Required"),
      porcentage_chambre_quadruple:yup.number().required("Required"),
      prix_demi_pension:yup.number().required("Required"),
      prix_pension_complete:yup.number().required("Required"),
      prix_all_inclusive:yup.number().required("Required"),
      commision:yup.number().required("Required"),
      prix_all_inclusive_soft:yup.number().required("Required"),
      capacite:yup.number().required("Required"),
  // enfant_gratuit:yup.number().required("Required"),
      // services_equipements:yup.bool(),
      date_debut:yup.date().required("Required"),
      date_fin:yup.date().required("Required"),
  })
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    function deleteHandler(image) {
      URL.revokeObjectURL(image);
    }
    const {error} = useSelector(state=>state.hotels)
    const {status} = useSelector(state=>state.hotels)

  return (
    <Box m="20px">
    <Header title="Modifier hotel" subtitle="édit les information du hotel" />
{hotels.status ==="loading"?<CircularProgress/>:
    <Formik onSubmit={handleFormSubmit} initialValues={data} validationSchema={checkoutSchema}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue}) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
   

    


      
      <Box  sx={{ gridColumn: "span 4" ,display:'flex',justifyContent:'center',flexDirection: 'column',alignItems:'center'  }}>
            <Typography variant='h4' color={colors.grey[200]}>Infos géneral</Typography>
    
      </Box>
            <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Nom Hotel"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nom_hotel}
              name="nom_hotel"
              error={!!touched.nom_hotel && !!errors.nom_hotel}
              helpertext={touched.nom_hotel && errors.nom_hotel}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.e_mail}
              name="e_mail"
              error={!!touched.e_mail && !!errors.e_mail}
              helpertext={touched.e_mail && errors.e_mail}
              sx={{ gridColumn: "span 2" }}
            />
              <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Numero téléphone"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.numero_telephone}
              name="numero_telephone"
              error={!!touched.numero_telephone && !!errors.numero_telephone}
              helpertext={touched.numero_telephone && errors.numero_telephone}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Adresse"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.adresse}
              name="adresse"
              error={!!touched.adresse && !!errors.adresse}
              helpertext={touched.adresse && errors.adresse}
              sx={{ gridColumn: "span 2" }}
            />
              <Box  sx={{ gridColumn: "span 4" ,display:'flex',justifyContent:'center',flexDirection: 'column',alignItems:'center'  }}>
            <Typography variant='h4' color={colors.grey[200]}>Nombre des étoiles</Typography>
    
      </Box>
            
            <Box sx={{ gridColumn: "span 4", display:'flex',justifyContent:"center" }} >
                 

<Rating
fullwidth
name="nb_etoile"
value={values.nb_etoile}
size="large"
onBlur={handleBlur}
onChange={handleChange}
error={!!touched.nb_etoile && !!errors.nb_etoile}
              helpertext={touched.nb_etoile && errors.nb_etoile}
             
/>
</Box>
 <Box margin={3} 
        sx={{ 
          gridColumn: "span 4",
          display:'flex',
          justifyContent:'center',
          flexDirection: 'column',
          alignItems:'center'  }}>
            <Typography variant='h4' color={colors.grey[200]}>Dates & Tarifs</Typography>
    
          </Box>
          
            <TextField
              fullwidth
              variant="filled"
              type="date"
              label="Date debut"
              onBlur={handleBlur}
              onChange={handleChange}
              value={moment(values.date_debut).format('YYYY-MM-DD') }
              name="date_debut"
              error={!!touched.date_debut && !!errors.date_debut}
              helpertext={touched.date_debut && errors.date_debut}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullwidth
              variant="filled"
              type="date"
              label="Date fin"
              onBlur={handleBlur}
              onChange={handleChange}
              
              value={moment(values.date_fin).format('YYYY-MM-DD')}
              inputProps={{ min: values.date_debut}}
              name="date_fin"
              error={!!touched.date_fin && !!errors.date_fin}
              helpertext={touched.date_fin && errors.date_fin}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Supplément chambre single"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.frais_chambre_single}
              name="frais_chambre_single"
              error={!!touched.frais_chambre_single && !!errors.frais_chambre_single}
              helpertext={touched.frais_chambre_single && errors.frais_chambre_single}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Réduction 3éme lit en (%)"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.porcentage_chambre_triple}
              name="porcentage_chambre_triple"
              error={!!touched.porcentage_chambre_triple && !!errors.porcentage_chambre_triple}
              helpertext={touched.porcentage_chambre_triple && errors.porcentage_chambre_triple}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Réduction 4éme lit en (%)"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.porcentage_chambre_quadruple}
              name="porcentage_chambre_quadruple"
              error={!!touched.porcentage_chambre_quadruple && !!errors.porcentage_chambre_quadruple}
              helpertext={touched.porcentage_chambre_quadruple && errors.porcentage_chambre_quadruple}
              sx={{ gridColumn: "span 2" }}
            />
                  <TextField
              fullwidth
              variant="filled"
              type="number"
              label="Prix logement petit déjeuner"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.prix_petit_dejeuner}
              name="prix_petit_dejeuner"
              InputProps={{
                inputProps: { min: 0 }
              }}
              error={!!touched.prix_petit_dejeuner && !!errors.prix_petit_dejeuner}
              helpertext={touched.prix_petit_dejeuner && errors.prix_petit_dejeuner}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Prix demi pension"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.prix_demi_pension}
              name="prix_demi_pension"
              error={!!touched.prix_demi_pension && !!errors.prix_demi_pension}
              helpertext={touched.prix_demi_pension && errors.prix_demi_pension}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Prix pension complete"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.prix_pension_complete}
              name="prix_pension_complete"
              error={!!touched.prix_pension_complete && !!errors.prix_pension_complete}
              helpertext={touched.prix_pension_complete && errors.prix_pension_complete}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Prix logement all inclusive"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.prix_all_inclusive}
              name="prix_all_inclusive"
              error={!!touched.prix_all_inclusive && !!errors.prix_all_inclusive}
              helpertext={touched.prix_all_inclusive && errors.prix_all_inclusive}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Prix logement all inclusive soft"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.prix_all_inclusive_soft}
              name="prix_all_inclusive_soft"
              error={!!touched.prix_all_inclusive_soft && !!errors.prix_all_inclusive_soft}
              helpertext={touched.prix_all_inclusive_soft && errors.prix_all_inclusive_soft}
              sx={{ gridColumn: "span 2" }}
            />
      
           
          
          

          <TextField
              fullwidth
              variant="filled"
              type="number"
              label="Capacité chambre single"
              onBlur={handleBlur}
              onChange={handleChange}
              InputProps={{
                inputProps: { min: 0 }
              }}
              value={values.capacite_chambre_single==null?0:values.capacite_chambre_single}
              name="capacite_chambre_single"
              error={!!touched.capacite_chambre_single && !!errors.capacite_chambre_single}
              helpertext={touched.capacite_chambre_single && errors.capacite_chambre_single}
              sx={{ gridColumn: "span 1" }}
          />
          <TextField
              fullwidth
              variant="filled"
              type="number"
              label="Capacité chambre double"
              onBlur={handleBlur}
              onChange={handleChange}
              InputProps={{
                inputProps: { min: 0 }
              }}
              value={values.capacite_chambre_double??0}
              name="capacite_chambre_double"
              error={!!touched.capacite_chambre_double && !!errors.capacite_chambre_double}
              helpertext={touched.capacite_chambre_double && errors.capacite_chambre_double}
              sx={{ gridColumn: "span 1" }}
          />
          <TextField
              fullwidth
              variant="filled"
              type="number"
              label="Capacité chambre triple"
              onBlur={handleBlur}
              onChange={handleChange}
              InputProps={{
                inputProps: { min: 0 }
              }}
              value={values.capacite_chambre_triple??0}
              name="capacite_chambre_triple"
              error={!!touched.capacite_chambre_triple && !!errors.capacite_chambre_triple}
              helpertext={touched.capacite_chambre_triple && errors.capacite_chambre_triple}
              sx={{ gridColumn: "span 1" }}
          />
          <TextField
              fullwidth
              variant="filled"
              type="number"
              
              label="Capacité chambre quadruple"
              onBlur={handleBlur}
              onChange={handleChange}
              InputProps={{
                inputProps: { min: 0 }
              }}
              value={values.capacite_chambre_quadriple??0}
              name="capacite_chambre_quadriple"
              error={!!touched.capacite_chambre_quadriple && !!errors.capacite_chambre_quadriple}
              helpertext={touched.capacite_chambre_quadriple && errors.capacite_chambre_quadriple}
              sx={{ gridColumn: "span 1" }}
          />
           <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Alotement"
              onBlur={handleBlur}
              onChange={handleChange}
              InputProps={{
                inputProps: { min: 0 }
              }}
              value={ parseInt(values.capacite_chambre_single==null ?0:values.capacite_chambre_single) +parseInt(values.capacite_chambre_double??0)+parseInt(values.capacite_chambre_triple??0)+parseInt(values.capacite_chambre_quadriple??0)}
              name="capacite"
              error={!!touched.capacite && !!errors.capacite}
              helpertext={touched.capacite && errors.capacite}
              sx={{ gridColumn: "span 4" }}
          />
                          <Box sx={{ display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center', gridColumn: "span 4" }}>

          <FormControl sx={{ display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center', gridColumn: "span 4" }}>
            <Typography marginBottom={4} variant='h4' color={colors.grey[200]}>Type de promotion</Typography>

            <RadioGroup
            row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={values.type_promotion}
              name="type_promotion"
              
              onChange={handleChange}
            >
              <FormControlLabel value={1} control={<Radio  color='default' />} label="Promotion en DT" />
              <FormControlLabel value={0} control={<Radio  color='default' />} label="Promotion en pourcentage (%)" />
            </RadioGroup>
          </FormControl>
          </Box>
          <TextField
              fullwidth
              variant="filled"
              type="text"
              label="Promotion"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.commision}
              name="commision"
              InputProps={{
                inputProps: { min: 0 }
              }}
              error={!!touched.commision && !!errors.commision}
              helpertext={touched.commision && errors.commision}
              sx={{ gridColumn: "span 4" }}
          />
          <TextField
              fullwidth
              variant="filled"
              type="date"
              label="Date debut promotion"
              onBlur={handleBlur}
              onChange={handleChange}
              value={moment(values.date_debut_promotion).format('YYYY-MM-DD')}
              name="date_debut_promotion"
              error={!!touched.date_debut_promotion && !!errors.date_debut_promotion}
              helpertext={touched.date_debut_promotion && errors.date_debut_promotion}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullwidth
              variant="filled"
              type="date"
              label="Date fin promotion"
              onBlur={handleBlur}
              onChange={handleChange}
              
              value={moment(values.date_fin_promotion).format('YYYY-MM-DD')}
              inputProps={{ min: values.date_debut_promotion}}
              name="date_fin_promotion"
              error={!!touched.date_fin_promotion && !!errors.date_fin_promotion}
              helpertext={touched.date_fin_promotion && errors.date_fin_promotion}
            sx={{ gridColumn: "span 2" }}
            
          />
          <TextField
              fullwidth
              variant="filled"
              type="number"
              InputProps={{
                inputProps: { min: 0 }
              }}
              label="Reduction enfant 5 ans et - 12ans en (%)"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.reduction_enfant}
              name="reduction_enfant"
              error={!!touched.reduction_enfant && !!errors.reduction_enfant}
              helpertext={touched.reduction_enfant && errors.reduction_enfant}
              sx={{ gridColumn: "span 4" }}
          />
          <Box sx={{ display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center', gridColumn: "span 4" }}>
             
 <FormControl sx={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center', gridColumn: "span 4" }}>
<Typography marginBottom={4} variant='h4' color={colors.grey[200]}>Enfant Gratuit -5 ans (bébé)</Typography>

<RadioGroup
row
aria-labelledby="demo-radio-buttons-group-label"
defaultValue={1}
name="bebe_gratuit"
onChange={handleChange}
value={values.bebe_gratuit}
>
<FormControlLabel value={1} control={<Radio  color='default' />} label="Oui" />
<FormControlLabel value={0} control={<Radio  color='default' />} label="Non" />
</RadioGroup>
</FormControl>
</Box>
             <Box margin={1} sx={{ gridColumn: "span 4" ,display:'flex',justifyContent:'center',flexDirection: 'column',alignItems:'center'  }}>
            <Typography variant='h4' color={colors.grey[200]}>Services & équipements</Typography>
    
      </Box>
      <Box sx={{ gridColumn: "span 4",justifyContent:'center' }} >
                  
                  <FormGroup  row sx={{display: "grid",justifyContent:'center',
  gridTemplateColumns: "repeat(auto-fill, 186px)", gridGap: "10px"}} >
      <FormControlLabel  control={<Checkbox  defaultChecked={data?.services_equipements?.climatisation }
                          onChange={(e)=>setClimatisation(e.target.checked)}

                     name="services_equipements"  color='default' />} label="Climatisation" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements" defaultChecked={data?.services_equipements?.restaurant}
                     onChange={(e)=>setrestaurant(e.target.checked)}
                     color='default' />} label="Restaurant" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements" defaultChecked={data?.services_equipements?.centreAffaires}   onChange={(e)=>setcentreAffaires(e.target.checked)}
                     color='default' />} label="Centre d'affaires" />
      <FormControlLabel control={<Checkbox 
                    name="services_equipements" defaultChecked={data?.services_equipements?.piscine}   onChange={(e)=>setpiscine(e.target.checked)}
                    color='default' />} label="Piscine" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements" onChange={(e)=>settelevision(e.target.checked)} defaultChecked={data?.services_equipements?.television} color='default' />} label="Télévision" />
      <FormControlLabel control={<Checkbox 
                    name="services_equipements" defaultChecked={data?.services_equipements?.boutiqueCadeaux} onChange={(e)=>setboutiqueCadeaux(e.target.checked)} color='default' />} label="Boutique de cadeaux" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements" defaultChecked={data?.services_equipements?.change} onChange={(e)=>setchange(e.target.checked)} color='default' />} label="Change" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements" defaultChecked={data?.services_equipements?.bar}onChange={(e)=>setbar(e.target.checked)}  color='default' />} label="Bar" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements" defaultChecked={data?.services_equipements?.plage} onChange={(e)=>setplage(e.target.checked)}  color='default' />} label="Plage" />
      <FormControlLabel control={<Checkbox 
                     name="services_equipements" defaultChecked={data?.services_equipements?.cafe} onChange={(e)=>setcafe(e.target.checked)} color='default' />} label="Café" />
      <FormControlLabel control={<Checkbox 
                   
                     name="services_equipements" defaultChecked={data?.services_equipements?.ascenseur} onChange={(e)=>setascenseur(e.target.checked)} color='default' />} label="Ascenseur" />
      <FormControlLabel control={<Checkbox 
                   
                      name="services_equipements"  defaultChecked={data?.services_equipements?.tennis} onChange={(e)=>settennis(e.target.checked)}  color='default' />} label="Tennis" />
      <FormControlLabel  control={<Checkbox 
                    
                    name="services_equipements"  defaultChecked={data?.services_equipements?.animauxAutorises} onChange={(e)=>setanimauxAutorises(e.target.checked)}  color='default' />} label="Animaux autorisés" />
    </FormGroup>
    </Box>
    
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Créer nauveau hotel
            </Button>
          </Box>
        </form>
      )}
    </Formik>}
  </Box>
  )
}

export default EditHotel