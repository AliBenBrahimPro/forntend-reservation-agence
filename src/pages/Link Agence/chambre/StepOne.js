import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, InputLabel, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery,MenuItem,Select } from "@mui/material";
import Header from "../../../components/Header";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleHotels } from '../../../redux/hotelSlice';
import { insertChambre } from '../../../redux/chambreSlice';
import { insertReservationhotel } from '../../../redux/reservationhotelSlice';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import { getSingleUser } from '../../../redux/userSlice';
import { setClient, setFilter, setNext } from '../../../redux/globalSlice';

const StepOne = () => {
  const iduser = localStorage.getItem('id');
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const {id}= useParams();
    let navigate = useNavigate();
    const commision=localStorage.getItem("commision_hotel")
    const [price,setPrice]=useState()
    const [chambres,setChambre]=useState(2)
    const [enfant,setEnfant]=useState(0)
    const [nbr,setNbr]=useState(2)
    const [pensions,setPensions]=useState(1)
    const [person1,setPerson1]=useState()
    const [person2,setPerson2]=useState()
    const [person3,setPerson3]=useState()
    const [person4,setPerson4]=useState()
    const [logement,setLogement]=useState("Demi pension")
    const [type,setType]=useState(2)
    const {data} = useSelector(state=>state.hotels)
    const hotels = useSelector(state=>state.hotels)
    const chambre = useSelector(state=>state.chambre)
    const nextStep = useSelector((state) => state.productFilter.next);

    useEffect(()=>{
        dispatch(getSingleHotels(id))
            },[])
            useEffect(() => {
              setPrice(((data.prix_demi_pension * parseFloat(nbr))*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision??0)/100)))

            }, [hotels])
            // console.log("data",data.nom_hotel)
            
   
               console.log("person 1 : ",person1)
               console.log("person 2 : ",person2)
               console.log("person 3 : ",person3)
               console.log("person 4 : ",person4)
               const test =[person1,person2,person3,person4];
               const noEmptyValues =   test.filter((value) => value != null);
               console.log("test : ",noEmptyValues)

    const handleFormSubmit = (values) => {

values.type_personne=noEmptyValues;
dispatch(setClient(noEmptyValues)) 
values.type_logmenet=logement
       dispatch(setNext(nextStep+1)) 
        let date1= new Date(values.date_fin);
       let date2 = new Date(values.date_debut)
       let time_diff = date1.getTime() - date2.getTime();
       const days_Diff = time_diff / (1000 * 3600 * 24);

        values.montant=price*days_Diff;
        values.type=type
        values.nb_place=nbr
     
        const data2={
          nb_place:nbr,
          monatnt_total:price*days_Diff,
          date_debut:values.date_debut,
          date_fin:values.date_fin,
          hotelId:values.hotelId,
          userId:parseInt(iduser),
          nb_nuit:days_Diff,
        }
       let  nom_1nce=localStorage.getItem('nom_1nce')
       let e_mail_1nce=localStorage.getItem('email_1nce')
       console.log(values)
       let x= dispatch(insertReservationhotel(data2)).then(secc=>{
        // console.log(secc)

        if(secc.type==="reservationhotel/insertReservationhotel/fulfilled" ){
          dispatch(getSingleUser(localStorage.getItem('id')))
         
          dispatch(insertChambre(values)).then(async(sec)=>{
            const email={
              email:e_mail_1nce,
              nom_1nce:nom_1nce,
              nb_chambre:1,
              nb_client:nbr,
              date_debut:moment(values.date_debut).format('DD/MM/YYYY'),
              date_fin:moment(values.date_fin).format('DD/MM/YYYY'),
              type:type,
              enfant_gratuit:enfant,
              nb_nuit:days_Diff,
          }
          const email_1nce={
            email:e_mail_1nce,
            nom_1nce:nom_1nce,
             nom_hotel:data.nom_hotel,
             date_debut:moment(values.date_debut).format('DD/MM/YYYY'),
             date_fin:moment(values.date_fin).format('DD/MM/YYYY'),
        }
            if(sec.type==="chambre/insertChambre/fulfilled" ){
              dispatch(getSingleUser(localStorage.getItem('id')))

              Swal.fire(
              'Success',
              `${sec.payload.type} a ajouter avec succes`,
              'success'
            ) 
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/mail/sendmail`,email)
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/mail/sendmail1nce`,email_1nce)
            navigate(`/1nce/cch/${sec.payload.id}`)
          }
           

            else{
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Quelque chose s'est mal passé!",
                })}
          })
         }else{
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Quelque chose s'est mal passé!",
                })}
      })
    };
    const initialValues = {
          type: "",
          nb_place:"",
          date_debut:data.date_debut,
          date_fin:data.date_fin,
          montant:"",
          hotelId:data.id,
          type_logmenet:"",
          bebe:1,
          type_personne:""
          

    };
    const checkoutSchema = yup.object().shape({
  
       


    })

 
    return (
        <Box m="20px">
          <Header title="Selecter chambres" subtitle="Selectionner chambres " />
          
        {hotels.status === "loading" ? <CircularProgress /> :
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema} >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit,}) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                    <FormControl  sx={{ gridColumn: "span 4" }}>
      <p>Chambres</p>
      <RadioGroup
       sx={{ gridColumn: "span 4" }}
        row
        onChange={e=>{setChambre(e.target.value); 
            setPerson1(null);setPerson2(null);setPerson3(null);setPerson4(null)
          let prix=0;
          if(parseInt(pensions)==1)
          { 
            if(parseInt(e.target.value)===1)
             { 
              prix=parseFloat(data.prix_demi_pension)+parseFloat(data.frais_chambre_single)
              setPrice(((prix*1)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
             }else if(parseInt(e.target.value)===2)
            { console.log("2") 
              prix=parseFloat(data.prix_demi_pension)
              setPrice(((prix*2)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
            }else if(parseInt(e.target.value)===3)
             { console.log("3") 
              prix=parseFloat(data.prix_demi_pension)*(1-(data.porcent1_chambre_triple/100))
              setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
             }
             else if(parseInt(e.target.value)===4){
              console.log("4") 
              prix=parseFloat(data.prix_demi_pension)*(1-(data.porcent1_chambre_quadruple/100))
              setPrice(((prix*4)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
             }
          }else if(parseInt(pensions)===2)
          {
            if(parseInt(e.target.value)===1)
            {
             prix=parseFloat(data.prix_pension_complete)+parseFloat(data.frais_chambre_single)
             setPrice(((prix*1)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
            }else if(parseInt(e.target.value)===2)
           {
             prix=parseFloat(data.prix_pension_complete)
             setPrice(((prix*2)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
           }else if(parseInt(e.target.value)===3)
            {
             prix=parseFloat(data.prix_pension_complete)*(1-(data.porcent1_chambre_triple/100))
             setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
            }
            else if(parseInt(e.target.value)===4){
             prix=parseFloat(data.prix_pension_complete)*(1-(data.porcent1_chambre_quadruple/100))
             setPrice(((prix*4)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
            }
          }else if(parseInt(pensions)==3)
          {
            if(parseInt(e.target.value)===1)
            {
             prix=parseFloat(data.prix_all_inclusive_soft)+parseFloat(data.frais_chambre_single)
             setPrice(((prix*1)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
            }else if(parseInt(e.target.value)===2)
           {
             prix=parseFloat(data.prix_all_inclusive_soft)
             setPrice(((prix*2)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
           }else if(parseInt(e.target.value)===3)
            {
             prix=parseFloat(data.prix_all_inclusive_soft)*(1-(data.porcent1_chambre_triple/100))
             setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
            }
            else if(parseInt(e.target.value)===4){
             prix=parseFloat(data.prix_all_inclusive_soft)*(1-(data.porcent1_chambre_quadruple/100))
             setPrice(((prix*4)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
            }
          }else if(parseInt(pensions)===4)
          {
            if(parseInt(e.target.value)===1)
            {
             prix=parseFloat(data.prix_all_inclusive)+parseFloat(data.frais_chambre_single)
             setPrice(((prix*1)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
            }else if(parseInt(e.target.value)===2)
           {
             prix=parseFloat(data.prix_all_inclusive)
             setPrice(((prix*2)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
           }else if(parseInt(e.target.value)===3)
            {
             prix=parseFloat(data.prix_all_inclusive)*(1-(data.porcent1_chambre_triple/100))
             setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
            }
            else if(parseInt(e.target.value)===4){
             prix=parseFloat(data.prix_all_inclusive)*(1-(data.porcent1_chambre_quadruple/100))
             setPrice(((prix*4)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
            }
          }
            
          }}
        defaultValue={2}
      >
        <FormControlLabel onClick={e=>{setType(2); setNbr(2);dispatch(setFilter(2))}} value={2} control={<Radio  color='default' />} label="Chambre Double" />
        <FormControlLabel onClick={e=>{setType(1);setNbr(1);dispatch(setFilter(1))}} value={1} control={<Radio color='default'/>} label="Chambre Single" />
        <FormControlLabel onClick={e=>{setType(3);setNbr(3);dispatch(setFilter(3))}} value={3} control={<Radio color='default'/>} label="Chambre Triple" />
        <FormControlLabel onClick={e=>{setType(4);setNbr(4);dispatch(setFilter(4))}} value={4} control={<Radio color='default'/>} label="Chambre Quadruple" />
      </RadioGroup>
    </FormControl>
    {nbr===1? 
    <FormControl sx={{ gridColumn: "span 2" }} fullWidth>
  <InputLabel id="demo-simple-select-label">Persone 1</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Persone 1"
    value={person1}
    onChange={e=>setPerson1(e.target.value)}
    variant='filled'
    error={!!touched.personOne && !!errors.personOne}
    helperText={touched.personOne && errors.personOne}
    sx={{ gridColumn: "span 4" }}
  >
    <MenuItem value={"Adulte"}>Adulte</MenuItem>
    <MenuItem value={"Enfant"}>Enfant</MenuItem>

  </Select>
</FormControl>:nbr===2?<Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
<FormControl sx={{ gridColumn: "span 4" }} fullWidth>
  <InputLabel id="demo-simple-select-label">Persone 1</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={person1}
    error={!!touched.personOne && !!errors.personOne}
    helperText={touched.personOne && errors.personOne}
   
    label="Persone"
    onChange={e=>setPerson1(e.target.value)}
    variant='filled'
  >
   <MenuItem value={"Adulte"}>Adulte</MenuItem>
    <MenuItem value={"Enfant"}>Enfant</MenuItem>
  </Select>
</FormControl>
<FormControl sx={{ gridColumn: "span 4" }}fullWidth>
  <InputLabel id="demo-simple-select-label">Persone 2</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    error={!!touched.personTwo && !!errors.personTwo}
    helperText={touched.personTwo && errors.personTwo}
    value={person2}
    label="Persone"
    onChange={e=>setPerson2(e.target.value)}
    variant='filled'
  >
 <MenuItem value={"Adulte"}>Adulte</MenuItem>
    <MenuItem value={"Enfant"}>Enfant</MenuItem>
  </Select>
</FormControl></Box>:nbr===3?
<Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
    <FormControl sx={{ gridColumn: "span 4" }}fullWidth>
  <InputLabel id="demo-simple-select-label">Persone 1</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={person1}
    error={!!touched.personOne && !!errors.personOne}
    helperText={touched.personOne && errors.personOne}
    sx={{ gridColumn: "span 4" }}
    label="Persone"
    onChange={e=>setPerson1(e.target.value)}
    variant='filled'
  >
<MenuItem value={"Adulte"}>Adulte</MenuItem>
    <MenuItem value={"Enfant"}>Enfant</MenuItem>
  </Select>
</FormControl><FormControl sx={{ gridColumn: "span 4" }}fullWidth>
  <InputLabel id="demo-simple-select-label">Persone 2</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={person2}
    error={!!touched.personTwo && !!errors.personTwo}
    helperText={touched.personTwo && errors.personTwo}
    sx={{ gridColumn: "span 4" }}
    label="Persone"
    onChange={e=>setPerson2(e.target.value)}
    variant='filled'
  >
<MenuItem value={"Adulte"}>Adulte</MenuItem>
    <MenuItem value={"Enfant"}>Enfant</MenuItem>
  </Select>
</FormControl>
<FormControl sx={{ gridColumn: "span 4" }} fullWidth>
  <InputLabel id="demo-simple-select-label">Persone 3</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={person3}
    error={!!touched.personThree && !!errors.personThree}
    helperText={touched.personThree && errors.personThree}
    sx={{ gridColumn: "span 4" }}
    label="Persone"
    onChange={e=>setPerson3(e.target.value)}
    variant='filled'
  >
<MenuItem value={"Adulte"}>Adulte</MenuItem>
    <MenuItem value={"Enfant"}>Enfant</MenuItem>
  </Select>
</FormControl></Box>:nbr===4?<Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                ><FormControl sx={{ gridColumn: "span 4" }}fullWidth>
  <InputLabel id="demo-simple-select-label">Persone 1</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={person1}
    error={!!touched.personOne && !!errors.personOne}
    helperText={touched.personOne && errors.personOne}
    sx={{ gridColumn: "span 4" }}
    label="Persone"
    onChange={e=>setPerson1(e.target.value)}
    variant='filled'
  >
    <MenuItem value={"Adulte"}>Adulte</MenuItem>
    <MenuItem value={"Enfant"}>Enfant</MenuItem>
  </Select>
</FormControl><FormControl sx={{ gridColumn: "span 4" }} fullWidth>
  <InputLabel id="demo-simple-select-label">Persone 2</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={person2}
    error={!!touched.personTwo && !!errors.personTwo}
    helperText={touched.personTwo && errors.personTwo}
    sx={{ gridColumn: "span 4" }}
    label="Persone"
    onChange={e=>setPerson2(e.target.value)}
    variant='filled'
  >
<MenuItem value={"Adulte"}>Adulte</MenuItem>
    <MenuItem value={"Enfant"}>Enfant</MenuItem>
  </Select>
</FormControl><FormControl sx={{ gridColumn: "span 4" }} fullWidth>
  <InputLabel id="demo-simple-select-label">Persone 3</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={person3}
    error={!!touched.personThree && !!errors.personThree}
    helperText={touched.personThree && errors.personThree}
    sx={{ gridColumn: "span 4" }}
    label="Persone"
    onChange={e=>setPerson3(e.target.value)}
    variant='filled'
  >
 <MenuItem value={"Adulte"}>Adulte</MenuItem>
    <MenuItem value={"Enfant"}>Enfant</MenuItem>
  </Select>
</FormControl><FormControl sx={{ gridColumn: "span 4" }} fullWidth>
  <InputLabel id="demo-simple-select-label">Persone 4</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={person4}
    error={!!touched.personFour && !!errors.personFour}
    helperText={touched.personFour && errors.personFour}
    sx={{ gridColumn: "span 4" }}
    label="Persone"
    onChange={e=>setPerson4(e.target.value)}
    variant='filled'
  >
<MenuItem value={"Adulte"}>Adulte</MenuItem>
    <MenuItem value={"Enfant"}>Enfant</MenuItem>
  </Select>
</FormControl></Box>:""}
    <FormControl  sx={{ gridColumn: "span 4" }}>
      <p>Pensions</p>
      <RadioGroup
       sx={{ gridColumn: "span 4" }}
        row
        name="prix_pension"
        onChange={e=>{setPensions(e.target.value); 
          let prix=0;
            if(parseInt(e.target.value)==1)
            {  console.log("1") 
              if(parseInt(chambres)===1)
               {
                prix=parseFloat(data.prix_demi_pension)+parseFloat(data.frais_chambre_single)
                setPrice(((prix*1)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
               }else if(parseInt(chambres)===2)
              {   console.log("22") 
                prix=parseFloat(data.prix_demi_pension)
                setPrice(((prix*2)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
              }else if(parseInt(chambres)===3)
               {
                prix=parseFloat(data.prix_demi_pension)*(1-(data.porcent1_chambre_triple/100))
                setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
               }
               else if(parseInt(chambres)===4){
                prix=parseFloat(data.prix_demi_pension)*(1-(data.porcent1_chambre_quadruple/100))
                setPrice(((prix*4)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
               }
            }else if(parseInt(e.target.value)===2)
            {console.log("2",chambres) 
              if(parseInt(chambres)===1)
              {
               prix=parseFloat(data.prix_pension_complete)+parseFloat(data.frais_chambre_single)
               setPrice(((prix*1)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
              }else if(parseInt(chambres)===2)
             {  console.log("22") 
               prix=parseFloat(data.prix_pension_complete)
              //  console.log(prix)
               setPrice(((prix*2)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
             }else if(parseInt(chambres)===3)
              {
               prix=parseFloat(data.prix_pension_complete)*(1-(data.porcent1_chambre_triple/100))
               setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
              }
              else if(parseInt(chambres)===4){

               prix=parseFloat(data.prix_pension_complete)*(1-(data.porcent1_chambre_quadruple/100))
               setPrice(((prix*4)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
              }
            }else if(parseInt(e.target.value)===3)
            {console.log("3") 
              if(parseInt(chambres)===1)
              {
               prix=parseFloat(data.prix_all_inclusive_soft)+parseFloat(data.frais_chambre_single)
               setPrice(((prix*1)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
              }else if(parseInt(chambres)===2)
             { console.log("22") 
               prix=parseFloat(data.prix_all_inclusive_soft)
               setPrice(((prix*2)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
             }else if(parseInt(chambres)===3)
              {
               prix=parseFloat(data.prix_all_inclusive_soft)*(1-(data.porcent1_chambre_triple/100))
               setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
              }
              else if(parseInt(chambres)===4){
               prix=parseFloat(data.prix_all_inclusive_soft)*(1-(data.porcent1_chambre_quadruple/100))
               setPrice(((prix*4)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
              }
            }else if(parseInt(e.target.value)===4)
            {  console.log("4") 
            
              if(parseInt(chambres)===1)
              {
               prix=parseFloat(data.prix_all_inclusive)+parseFloat(data.frais_chambre_single)
               setPrice(((prix*1)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
              }else if(parseInt(chambres)===2)
             { console.log("22") 
               prix=parseFloat(data.prix_all_inclusive)
               setPrice(((prix*2)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
             }else if(parseInt(chambres)===3)
              {
               prix=parseFloat(data.prix_all_inclusive)*(1-(data.porcent1_chambre_triple/100))
               setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
              }
              else if(parseInt(chambres)===4){
           
               prix=parseFloat(data.prix_all_inclusive)*(1-(data.porcent1_chambre_quadruple/100))
               setPrice(((prix*4)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
              }
            }
            // const prix=parseFloat( e.target.value)+ parseFloat(chambres??data.prix_demi_pension) 
            // setPrice(prix* parseFloat(nbr))
          }}
        defaultValue={1}
      >
         <FormControlLabel value={1}  control={<Radio  color='default' />} label="Demi Pension " />
        <FormControlLabel value={2} control={<Radio  color='default'/>} label="Pension Complète" />
        <FormControlLabel value={3} control={<Radio color='default'/>} label="All Inclusive Soft" />
        <FormControlLabel value={4} control={<Radio color='default'/>} label="All Inclusive" />
      </RadioGroup>
     { parseInt(data.enfant_gratuit )=== 1 ?
     <>
     <p>Enfant gratuit -2ans</p>
     <RadioGroup
       sx={{ gridColumn: "span 4" }}
       row
       name="prix_pension"
       onChange={e=>setEnfant(e.target.value)}
        defaultValue={0}>
        <FormControlLabel  control={<Radio  color='default' />} label="Avec un bébé -2ans "  />
        <FormControlLabel value={0} control={<Radio  color='default' />} label="n'est pas un bébé -2ans "  />
      </RadioGroup></>:null}
      <FormLabel id="demo-row-radio-buttons-group-label"> Bebe gratuit -5ans</FormLabel>
            <RadioGroup
                row
                onChange={handleChange}
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue={values.bebe}
                name="bebe">
                <FormControlLabel value={1}   control={<Radio color='default' />} label="Avec un bébé -5ans " />
                <FormControlLabel value={0} control={<Radio color='default' />} label="n'est pas un bébé -5ans" />
                </RadioGroup>
     
    </FormControl>
    <Box display='flex' justifyContent='center' >

</Box>
                  <TextField
                    fullWidth
                    disabled
                    variant="filled"
                    type="text"
                    label="prix_total"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={price}
                    name="prix_total"
                    error={!!touched.prix_total && !!errors.prix_total}
                    helperText={touched.prix_total && errors.prix_total}
                    sx={{ gridColumn: "span 4" }}
                  />
       <TextField
       disabled
              fullWidth
              variant="filled"
              type="date"
              label="Date début"
              onChange={handleChange}
              value={moment(values.date_debut).format("YYYY-MM-DD")}
              name="date_debut"
              error={!!touched.date_debut && !!errors.date_debut}
              helperText={touched.date_debut && errors.date_debut}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              disabled
              variant="filled"
              type="date"
              label="Date fin"
              onBlur={handleBlur}
              onChange={handleChange}
              value={moment(values.date_fin).format("YYYY-MM-DD")}
              name="date_fin"
              inputProps={{ min: values.date_debut}}
              error={!!touched.date_fin && !!errors.date_fin}
              helperText={touched.date_fin && errors.date_fin}
              sx={{ gridColumn: "span 4" }}
            />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button  type="submit" color="secondary" variant="contained">
                    Suivant
                  </Button>
                </Box>
              </form>
            )}
          </Formik>}
        </Box>
      );
}

export default StepOne