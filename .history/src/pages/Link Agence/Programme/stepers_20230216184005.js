import { Box, useTheme } from '@mui/material';
import { Button, message, Steps, theme } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { tokens } from '../../../theme';
import Chambre from '../chambre/Chambre';
import ReservationEvnt from '../Evenement/ReservationEvnt';
import FormProgAgence from './FormProgAgence';
import './steps.css'
const ProgChambre = () => {


  return (  <Box m="20px">
  <Header title="Selecter chambres" subtitle="Selectionner chambres " />
  
  { hotels.status === "loading"?<CircularProgress/>: <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
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
      prix=parseFloat(data.prix_demi_pension)*(1-(data.porcentage_chambre_triple/100))
      setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
     }
     else if(parseInt(e.target.value)===4){
      console.log("4") 
      prix=parseFloat(data.prix_demi_pension)*(1-(data.porcentage_chambre_quadruple/100))
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
     prix=parseFloat(data.prix_pension_complete)*(1-(data.porcentage_chambre_triple/100))
     setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
    }
    else if(parseInt(e.target.value)===4){
     prix=parseFloat(data.prix_pension_complete)*(1-(data.porcentage_chambre_quadruple/100))
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
     prix=parseFloat(data.prix_all_inclusive_soft)*(1-(data.porcentage_chambre_triple/100))
     setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
    }
    else if(parseInt(e.target.value)===4){
     prix=parseFloat(data.prix_all_inclusive_soft)*(1-(data.porcentage_chambre_quadruple/100))
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
     prix=parseFloat(data.prix_all_inclusive)*(1-(data.porcentage_chambre_triple/100))
     setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
    }
    else if(parseInt(e.target.value)===4){
     prix=parseFloat(data.prix_all_inclusive)*(1-(data.porcentage_chambre_quadruple/100))
     setPrice(((prix*4)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
    }
  }
    // setPrice(prix* parseFloat(nbr))
  }}
defaultValue={2}
>
<FormControlLabel onClick={e=>{setType("Chambre Double"); setNbr(2)}} value={2} control={<Radio  color='default' />} label="Chambre Double" />
<FormControlLabel onClick={e=>{setType("Chambre Single");setNbr(1)}}value={1} control={<Radio color='default'/>} label="Chambre Single" />
<FormControlLabel onClick={e=>{setType("Chambre Triple");setNbr(3)}} value={3} control={<Radio color='default'/>} label="Chambre Triple" />
<FormControlLabel onClick={e=>{setType("Chambre Quadruple");setNbr(4)}} value={4} control={<Radio color='default'/>} label="Chambre Quadruple" />
</RadioGroup>
</FormControl>
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
        setPrice(((prix*2)(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
      }else if(parseInt(chambres)===3)
       {
        prix=parseFloat(data.prix_demi_pension)*(1-(data.porcentage_chambre_triple/100))
        setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
       }
       else if(parseInt(chambres)===4){
        prix=parseFloat(data.prix_demi_pension)*(1-(data.porcentage_chambre_quadruple/100))
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
       prix=parseFloat(data.prix_pension_complete)*(1-(data.porcentage_chambre_triple/100))
       setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
      }
      else if(parseInt(chambres)===4){

       prix=parseFloat(data.prix_pension_complete)*(1-(data.porcentage_chambre_quadruple/100))
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
       prix=parseFloat(data.prix_all_inclusive_soft)*(1-(data.porcentage_chambre_triple/100))
       setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
      }
      else if(parseInt(chambres)===4){
       prix=parseFloat(data.prix_all_inclusive_soft)*(1-(data.porcentage_chambre_quadruple/100))
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
       prix=parseFloat(data.prix_all_inclusive)*(1-(data.porcentage_chambre_triple/100))
       setPrice(((prix*3)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
      }
      else if(parseInt(chambres)===4){
   
       prix=parseFloat(data.prix_all_inclusive)*(1-(data.porcentage_chambre_quadruple/100))
       setPrice(((prix*4)*(1-(parseFloat(data.commision)/100)))*(1-(parseFloat(commision)/100)))
      }
    }
    // const prix=parseFloat( e.target.value)+ parseFloat(chambres??data.prix_demi_pension) 
    // setPrice(prix* parseFloat(nbr))
  }}
defaultValue={1}
>
 <FormControlLabel  value={1} control={<Radio  color='default' />} label="Demi Pension " />
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
<FormControlLabel value={1} control={<Radio  color='default' />} label="Avec un bébé -2ans "  />
<FormControlLabel value={0} control={<Radio  color='default' />} label="n'est pas un bébé -2ans "  />
</RadioGroup></>:null}
</FormControl>
        
          <TextField
            fullWidth
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
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Réserver
          </Button>
        </Box>
      </form>
    )}
  </Formik>}
</Box>);
};


const steps = [
  {
    title: 'Resrvation Hotel',
    content:<Chambre/>
  },
  {
    title: 'Reservation Transport',
    content: <FormProgAgence/>,
  },
  {
    title: 'Reservation Evenement',
    content: <ReservationEvnt/>,
    
  },
];
const Stepers = () => {
  useEffect(() => {
 
  }, [])
  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <Box  m="20px">
      <Steps  current={current} items={items} />
      <div>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={(e) =>{ next(); console.log(steps[current+1].title)}}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </Box>
  );
};
export default Stepers;