import React from 'react';
import TextField from '@mui/material/TextField';
import './hotel.css';
import {Button,FormHelperText,FormControl} from '@mui/material';
import Swal from 'sweetalert2'
import axios from 'axios';

const Hotel = () => {
    const [formValue, setformValue] = React.useState({
      
        nom_hotel: "",
        e_mail:"",
        adresse:"",
        nb_etoile:"",
        prix_chambre_double:"",
        prix_chambre_single:"",
        prix_chambre_triple:"",
        prix_demi_pension:"",
        prix_pension_complete:"",
        prix_all_inclusive:"",
        commision:"",
        date_debut:"",
        date_fin:"",

      
  
    });
  
      const handleSubmit = async() => {

        
        const response= await axios.post(`${process.env.REACT_APP_BASE_URL}/api/hotel/addhotel`,formValue)
     
    console.log(response)
        if(response.data.success===true)
        {
          Swal.fire(
            'Success',
            response.data.message,
            'success'
          )
        
          }
         else{
            console.log(response.data.validation_error)
          }
    }
    const handleChange = (event) => {
     
      setformValue({
        ...formValue,
        [event.target.name]: event.target.value
      });
     
      
    }
  

  return (
    <div className="App__form">
      <h1> Ajouter hotel </h1>
      <FormControl >
      <FormControl>
        <TextField 
          id="outlined-basic" 
          name="nom_hotel" 
          label="Nom Hotel" 
          variant="outlined" 
          value={formValue.nom_hotel}
          fullWidth 
          onChange={handleChange}
       
        />
        </FormControl>
        <FormControl>

           <TextField 
          id="outlined-basic" 
          name="e_mail" 
          label="Email" 
          value={formValue.e_mail}
          variant="outlined" 
          fullWidth 
          onChange={handleChange}

        />
         </FormControl>
         <FormControl>
        <TextField 
          id="outlined-basic" 
          name="adresse" 
          label="Adresse" 
          value={formValue.adresse}
          variant="outlined" 
          fullWidth 
          onChange={handleChange}
        
        />
        </FormControl>
        <FormControl>
        <TextField 
          id="outlined-basic"
          label="Nombre des étoiles"
          variant="outlined"
          value={formValue.nb_etoile}
          fullWidth
          onChange={handleChange}
          name="nb_etoile"
     
        />
        </FormControl>
        <FormControl>
        <TextField
          id="outlined-basic"
          label="Prix chambre double"
          value={formValue.prix_chambre_double}
          variant="outlined"
          fullWidth
          onChange={handleChange}
          name="prix_chambre_double"
      
        />
        
        </FormControl>
                <TextField
          id="outlined-basic"
          label="Prix chambre single"
          variant="outlined"
          value={formValue.prix_chambre_single}
          fullWidth
          onChange={handleChange}
          name="prix_chambre_single"
      
        />
              <TextField
          id="outlined-basic"
          label="Prix chambre triple"
          variant="outlined"
          value={formValue.prix_chambre_triple}
          onChange={handleChange}
          fullWidth
          name="prix_chambre_triple"
  
        />
         <TextField
          id="outlined-basic"
          label="Prix demi pension"
          variant="outlined"
          value={formValue.prix_demi_pension}
          fullWidth
          onChange={handleChange}
          name="prix_demi_pension"
      
        />
         <TextField
          id="outlined-basic"
          label="Prix pension complete"
          variant="outlined"
          value={formValue.prix_pension_complete}
          fullWidth
          onChange={handleChange}
          name="prix_pension_complete"
      
        />
         <TextField
          id="outlined-basic"
          label="Prix all inclusive"
          variant="outlined"
          fullWidth
          value={formValue.prix_all_inclusive}
          onChange={handleChange}
          name="prix_all_inclusive"
      
        />
         <TextField
          id="outlined-basic"
          label="Commision"
          variant="outlined"
          fullWidth
          value={formValue.commision}

          onChange={handleChange}
          name="commision"
       
        />
    <TextField
        id="datedebut"
        label="Date debut "
        type="date"
        value={formValue.date_debut}

        onChange={handleChange}
        fullWidth
        name='date_debut'
        InputLabelProps={{
          shrink: true,
        }}
      />
         <TextField
        id="datefin"
        label="Date fin "
        type="date"
        onChange={handleChange}
        value={formValue.date_fin}
        fullWidth
        name='date_fin'
        InputLabelProps={{
          shrink: true,
        }}
      />
</FormControl>

        <div className="clearfix"></div>

        <div className="clearfix"></div>
        <Button color="primary" onClick={handleSubmit} variant="contained">

        Créer nouveau hotel
          </Button>
    </div>
  )
}
export default Hotel