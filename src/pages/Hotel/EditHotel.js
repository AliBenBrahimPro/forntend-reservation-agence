import React,{useEffect} from 'react'
import { Box, Button, TextField,Alert,CircularProgress } from '@mui/material'
import { Formik,Field ,useFormik} from "formik";
import * as yup from 'yup';
import { useMediaQuery,useTheme } from "@mui/material";
import Header from "../../components/Header";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';
import './hotelForm.css'
import Fab from '@mui/material/Fab';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { tokens } from "../../theme";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch ,useSelector} from 'react-redux';
import {getSingleHotels} from '../../redux/hotelSlice';
import moment from 'moment'
import axios from 'axios';
function EditHotel() {
    const dispatch =useDispatch();
    const {id} = useParams();
     const {data} = useSelector(state=>state.hotels)
     const hotels = useSelector(state=>state.hotels)
console.log("selector",data)
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    useEffect(()=>{
dispatch(getSingleHotels(id))
    },[])

    const handleFormSubmit =async (values) => {
      values.image_hotel= selectedImages;
      const response=  axios.put(`${process.env.REACT_APP_BASE_URL}/api/hotel/updatehotel/${id}`,values)
      if(response.status ===200)
      {
          Swal.fire(
              'Success',
              "Hotel a ete modifie avec succes",
              'success'
            ) 
      }else{
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
      }
        // const response= await axios.post(`${process.env.REACT_APP_BASE_URL}/api/hotel/addhotel`,values)
        // if(response.status ===200)
        // {
        //     Swal.fire(
        //         'Success',
        //         "Hotel a ajouter avec succes",
        //         'success'
        //       ) 
        // }else{
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: 'Something went wrong!',
        //       })
        // }

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
    const initialValues = {
        image_hotel:[],
        nom_hotel: "",
        e_mail:"",
        numero_telephone:"",
        adresse:"",
        nb_etoile:0,
        prix_chambre_double:"",
        prix_chambre_single:"",
        prix_chambre_triple:"",
        prix_chambre_quadruple:"",
        prix_demi_pension:"",
        prix_pension_complete:"",
        prix_all_inclusive:"",
        commision:"",
        services_equipements:{
            "climatisation":false,
            "restaurant":false,
            "centreAffaires":false,
            "piscine":false,
            "television":false,
            "boutiqueCadeaux":false,
            "change":false,
            "bar":false,
            "plage":false,
            "cafe":false,
            "ascenseur":false,
            "tennis":false,
            "animauxAutorises":false,},
        date_debut:"",
        date_fin:"",
    };
    const checkoutSchema = yup.object().shape({
        // image_hotel: yup.mixed().required('File is required'),
        nom_hotel:yup.string().required("Required"),
        adresse:yup.string().required("Required"),
        e_mail:yup.string().email("Invalid email!").required("Required"),
        numero_telephone:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
        nb_etoile:yup.number().required("Required"),
        prix_chambre_double:yup.number().required("Required"),
        prix_chambre_single:yup.number().required("Required"),
        prix_chambre_triple:yup.number().required("Required"),
        prix_chambre_quadruple:yup.number().required("Required"),
        prix_demi_pension:yup.number().required("Required"),
        prix_pension_complete:yup.number().required("Required"),
        prix_all_inclusive:yup.number().required("Required"),
        commision:yup.number().required("Required"),
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
        { error!==null ?  <Alert severity="error">{error}</Alert>
       : 
       
       status ==="loading" || data.length>1 ? <Box style={{position: 'relative'}}>
       <CircularProgress size={40}
        left={-20}
        top={10}
        
        style={{marginLeft: '50%'}} color="secondary" /></Box>
       :hotels.data.length===0 ?  "there is no data found":
       <Box> 
          <Header title="Ajouter hotel" subtitle="Créer nouveau hotel" />
    
          <Formik  onSubmit={handleFormSubmit} initialValues={data} enableReinitialize={true} >
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
                  <Typography variant='h4' color={colors.grey[200]}>Ajouter des photos</Typography>
          
            </Box>
                  
                  <Box  sx={{ gridColumn: "span 4" , display:'flex',justifyContent:'center',flexDirection: 'column',alignItems:'center'  }}>
             <input
              style={{display: "none" }}
              onBlur={handleBlur}
              onChange={onSelectFile}
              name="image_hotel"
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Fab component="span" >
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
            </Box>
      
<Box sx={{ gridColumn: "span 4" }}>
<div  className="images">
        {data.image_hotel &&
          data.image_hotel.map((image, index) => {
            return (
              <div key={image} className="image">
                <img src={image} height="200" alt="upload" />
                <button onClick={() =>setFieldValue(data.image_hotel.filter((e) => e !== image)) }>
                  delete image
                </button>
                
              </div>
            );
          })}
      </div>
      </Box>
           
            
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
                    type="text"
                    label="Prix chambre single"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.prix_chambre_single}
                    name="prix_chambre_single"
                    error={!!touched.prix_chambre_single && !!errors.prix_chambre_single}
                    helpertext={touched.prix_chambre_single && errors.prix_chambre_single}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullwidth
                    variant="filled"
                    type="text"
                    label="Prix chambre double"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.prix_chambre_double}
                    name="prix_chambre_double"
                    error={!!touched.prix_chambre_double && !!errors.prix_chambre_double}
                    helpertext={touched.prix_chambre_double && errors.prix_chambre_double}
                    sx={{ gridColumn: "span 2" }}
                  />
               
                  <TextField
                    fullwidth
                    variant="filled"
                    type="text"
                    label="Prix chambre triple"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.prix_chambre_triple}
                    name="prix_chambre_triple"
                    error={!!touched.prix_chambre_triple && !!errors.prix_chambre_triple}
                    helpertext={touched.prix_chambre_triple && errors.prix_chambre_triple}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullwidth
                    variant="filled"
                    type="text"
                    label="Prix chambre quadruple"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.prix_chambre_quadruple}
                    name="prix_chambre_quadruple"
                    error={!!touched.prix_chambre_quadruple && !!errors.prix_chambre_quadruple}
                    helpertext={touched.prix_chambre_quadruple && errors.prix_chambre_quadruple}
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
                    label="Prix all inclusive"
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
                    label="Commision"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.commision}
                    name="commision"
                    error={!!touched.commision && !!errors.commision}
                    helpertext={touched.commision && errors.commision}
                    sx={{ gridColumn: "span 2" }}
                  />
                          <TextField
                    fullwidth
                    variant="filled"
                    type="date"
                    label="Date debut"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={moment(values.date_debut).format("YYYY-MM-DD")}
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
                    value={moment(values.date_fin).format("YYYY-MM-DD")}
                    inputProps={{ min: values.date_debut }}
                    name="date_fin"
                    error={!!touched.date_fin && !!errors.date_fin}
                    helpertext={touched.date_fin && errors.date_fin}
                    sx={{ gridColumn: "span 2" }}
                  />
                   <Box margin={1} sx={{ gridColumn: "span 4" ,display:'flex',justifyContent:'center',flexDirection: 'column',alignItems:'center'  }}>
                  <Typography variant='h4' color={colors.grey[200]}>Services & équipements</Typography>
          
            </Box>
            <Box                     sx={{ gridColumn: "span 4",justifyContent:'center' }}
 >
                  
            <FormGroup  row sx={{display: "grid",justifyContent:'center',
  gridTemplateColumns: "repeat(auto-fill, 186px)", gridGap: "10px"}} >
      <FormControlLabel  control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                    defaultChecked={values.services_equipements } name="services_equipements" color='default' />} label="Climatisation" />
      <FormControlLabel control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                             defaultChecked={values.services_equipements} name="services_equipements"  color='default' />} label="Restaurant" />
      <FormControlLabel control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                          defaultChecked={values.services_equipements} name="services_equipements"  color='default' />} label="Centre d'affaires" />
      <FormControlLabel control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                            defaultChecked={values.services_equipements} name="services_equipements"  color='default' />} label="Piscine" />
      <FormControlLabel control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                       defaultChecked={values.services_equipements} name="services_equipements"  color='default' />} label="Télévision" />
      <FormControlLabel control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                        defaultChecked={values.services_equipements} name="services_equipements"  color='default' />} label="Boutique de cadeaux" />
      <FormControlLabel control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                       defaultChecked={values.services_equipements} name="services_equipements"  color='default' />} label="Change" />
      <FormControlLabel control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                         defaultChecked={values.services_equipements} name="services_equipements"  color='default' />} label="Bar" />
      <FormControlLabel control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                        defaultChecked={values.services_equipements} name="services_equipements"   color='default' />} label="Plage" />
      <FormControlLabel control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                         defaultChecked={values.services_equipements} name="services_equipements"  color='default' />} label="Café" />
      <FormControlLabel control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                          defaultChecked={values.services_equipements} name="services_equipements"  color='default' />} label="Ascenseur" />
      <FormControlLabel control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                         defaultChecked={values.services_equipements}  name="services_equipements"  color='default' />} label="Tennis" />
      <FormControlLabel control={<Checkbox onBlur={handleBlur}
                    onChange={handleChange}
                       defaultChecked={values.services_equipements} name="services_equipements"  color='default' />} label="Animaux autorisés" />
    </FormGroup>
    </Box>
          
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Modifier hotel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          </Box>}
        </Box>
  )
}

export default EditHotel