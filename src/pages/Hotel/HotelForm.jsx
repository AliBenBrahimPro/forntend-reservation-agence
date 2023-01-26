import React,{useState} from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery,useTheme } from "@mui/material";
import Header from "../../components/Header";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import {useDropzone} from 'react-dropzone';
import './hotelForm.css'
import Fab from '@mui/material/Fab';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { tokens } from "../../theme";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { insertHotels } from '../../redux/hotelSlice';
import Dropzone from "react-dropzone";
import axios from 'axios';

const Hotelform = () => {
const dispatch =useDispatch();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const [climatisation,setClimatisation]=useState(false);
const [restaurant,setrestaurant]=useState(false);
const [centreAffaires,setcentreAffaires]=useState(false);
const [piscine,setpiscine]=useState(false);
const [television,settelevision]=useState(false);
const [boutiqueCadeaux,setboutiqueCadeaux]=useState(false);
const [change,setchange]=useState(false);
const [bar,setbar]=useState(false);
const [plage,setplage]=useState(false);
const [cafe,setcafe]=useState(false);
const [ascenseur,setascenseur]=useState(false);
const [tennis,settennis]=useState(false);
const [animauxAutorises,setanimauxAutorises]=useState(false);
const [image,setImage]=useState();
    const handleFormSubmit =async (values) => {
  
      const service={
        "climatisation":climatisation,
        "restaurant":restaurant,
        "centreAffaires":centreAffaires,
        "piscine":piscine,
        "television":television,
        "boutiqueCadeaux":boutiqueCadeaux,
        "change":change,
        "bar":bar,
        "plage":plage,
        "cafe":cafe,
        "ascenseur":ascenseur,
        "tennis":tennis,
        "animauxAutorises":animauxAutorises
      }
      values.services_equipements= service

      // const formData = new FormData();
      // for(const key of Object.keys(image)){
      //   formData.append('image_hotel',image[key])
      // }
      // formData.append('nom_hotel',values.nom_hotel)
      // formData.append('numero_telephone',values.numero_telephone)
      // formData.append('e_mail',values.e_mail)
      // formData.append('adresse',values.adresse)
      // formData.append('nb_etoile',values.nb_etoile)
      // formData.append('prix_chambre_double',values.prix_chambre_double)

      // formData.append('prix_chambre_single',values.prix_chambre_single)
      // formData.append('prix_chambre_triple',values.prix_chambre_triple)
      // formData.append('prix_chambre_quadruple',values.prix_chambre_quadruple)
      // formData.append('prix_demi_pension',values.prix_demi_pension)
      // formData.append('prix_pension_complete',values.prix_pension_complete)
      // formData.append('prix_all_inclusive',values.prix_all_inclusive)
      // formData.append('commision',values.commision)
      // formData.append('services_equipements',values.services_equipements)
      // formData.append('date_debut',values.date_debut)
      // formData.append('date_fin',values.date_fin)
    
    console.log(service)
    console.log(values)
// const x=formData
// console.log(x)
    // await axios.post(`${process.env.REACT_APP_BASE_URL}/api/hotel/addhotel`,formData)
      
              dispatch(insertHotels(values)).then((data)=>{
                console.log("problem",data)
               if(data.type==="hotels/insertHotels/fulfilled" ){
                Swal.fire(
                          'Success',
                          `${data.payload.nom_hotel} a ajouter avec succes`,
                          'success'
                        ) 
               }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      })}
              })


    };
 console.log(image);
    const [selectedImages, setSelectedImages] = React.useState([]);
    const onSelectFile = (event) => {


      // const formData = new FormData();
      // formData.append('image_hotel',selectedFiles[key])
      const selectedFiles = event.target.files;
      // for(const key of Object.keys(selectedFiles)){
      //   formData.append('image_hotel',selectedFiles[key])
      //   outputImage.push(selectedFiles[key])
        
      // }
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
        services_equipements:[],
        date_debut:"",
        date_fin:"",
    };
    const checkoutSchema = yup.object().shape({
     
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
      setSelectedImages(selectedImages.filter((e) => e !== image));
      URL.revokeObjectURL(image);
    }


    return (
        <Box m="20px">
          <Header title="Ajouter hotel" subtitle="Créer nouveau hotel" />
    
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
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
      <label>
     
        <input
          type="file"
          name="image_hotel"
          onChange={(e)=>setImage(e.target.files)}
           multiple       
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
<div className="images">
        {selectedImages &&
          selectedImages.map((image) => {
            return (
              <div key={image} className="image">
                <img src={image} height="200" alt="upload" />
                <button onClick={deleteHandler}>
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
                    value={values.date_debut}
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
                    
                    value={values.date_fin}
                    inputProps={{ min: values.date_debut}}
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
      <FormControlLabel  control={<Checkbox  
                    onChange={(e)=>setClimatisation(e.target.checked)}
                     name="services_equipements" color='default' />} label="Climatisation" />
      <FormControlLabel control={<Checkbox 
                     onChange={(e)=>setrestaurant(e.target.checked)}
                     name="services_equipements"  color='default' />} label="Restaurant" />
      <FormControlLabel control={<Checkbox 
                     onChange={(e)=>setcentreAffaires(e.target.checked)}
                     name="services_equipements"  color='default' />} label="Centre d'affaires" />
      <FormControlLabel control={<Checkbox 
                   onChange={(e)=>setpiscine(e.target.checked)}
                    name="services_equipements"  color='default' />} label="Piscine" />
      <FormControlLabel control={<Checkbox 
                     onChange={(e)=>settelevision(e.target.checked)}
                     name="services_equipements"  color='default' />} label="Télévision" />
      <FormControlLabel control={<Checkbox 
                   onChange={(e)=>setboutiqueCadeaux(e.target.checked)}
                    name="services_equipements"  color='default' />} label="Boutique de cadeaux" />
      <FormControlLabel control={<Checkbox 
                   onChange={(e)=>setchange(e.target.checked)}
                     name="services_equipements"  color='default' />} label="Change" />
      <FormControlLabel control={<Checkbox 
                    onChange={(e)=>setbar(e.target.checked)}
                     name="services_equipements"  color='default' />} label="Bar" />
      <FormControlLabel control={<Checkbox 
                    onChange={(e)=>setplage(e.target.checked)}
                     name="services_equipements"   color='default' />} label="Plage" />
      <FormControlLabel control={<Checkbox 
                    onChange={(e)=>setcafe(e.target.checked)}
                     name="services_equipements"  color='default' />} label="Café" />
      <FormControlLabel control={<Checkbox 
                    onChange={(e)=>setascenseur(e.target.checked)}
                     name="services_equipements"  color='default' />} label="Ascenseur" />
      <FormControlLabel control={<Checkbox 
                    onChange={(e)=>settennis(e.target.checked)}
                      name="services_equipements"  color='default' />} label="Tennis" />
      <FormControlLabel control={<Checkbox 
                    onChange={(e)=>setanimauxAutorises(e.target.checked)}
                    name="services_equipements"  color='default' />} label="Animaux autorisés" />
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
          </Formik>
        </Box>
      );
}

export default Hotelform