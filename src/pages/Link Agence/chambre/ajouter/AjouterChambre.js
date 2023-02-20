import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Header from "../../../../components/Header"
import InputPersonne from './InputPersonne';
import AffecterClient from './AffecterClient';

export default function AjouterChambre() {

    const [typeChambre,setTypeChambre]=useState(1)
    const [nomTypeChambre,setnomTypeChambre]=useState("")
    const [personne,setPersonne]=useState([])
    const [listpersonne,setListPersonne]=useState([])
    
    
    const test = (e) => {
        var x = e
        if (x === 1) {
            setnomTypeChambre("Chambre single");
            setTypeChambre(1);
            setPersonne([
                <InputPersonne key={1} num={1} />
            ]);
            setListPersonne(["Adult"])
        }
        if (x === 2) {
            setnomTypeChambre("Chambre double");
            setTypeChambre(2);
            setPersonne([
                <InputPersonne key={1} num={1} />,
                <InputPersonne key={2} num={2} />
            ]);
            setListPersonne(["Adult","Enfant"])
        }
        if (x === 3) {
            setnomTypeChambre("Chambre triple");
            setTypeChambre(3);
            setPersonne([
                <InputPersonne key={1} num={1} />,
                <InputPersonne key={2} num={2} />,
                <InputPersonne key={3} num={3} />
            ]);
            setListPersonne(["Adult","Enfant","Adult"])
        }
        if (x === 4) {
            setnomTypeChambre("Chambre quadruple");
            setTypeChambre(4);
            setPersonne([
                <InputPersonne key={1} num={1} />,
                <InputPersonne key={2} num={2} />,
                <InputPersonne key={3} num={3} />,
                <InputPersonne key={4} num={4} />
            ]);
            setListPersonne(["Adult","Enfant","Adult","Enfant"])
            
        }
        
        
        
        
        

            
    }
    
    return (
        <div>

        <Box m="20px">
            <Header title="Ajouter chambre" subtitle="Ajouter chambre" />
            
            <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Type chambre</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group">
                <FormControlLabel value={1} onClick={e =>test(1)}  control={<Radio color='default' />} label="Chambre single" />
                <FormControlLabel value={2} onClick={e=>test(2)}  control={<Radio color='default'/>} label="Chambre double" />
                <FormControlLabel value={3} onClick={e=>test(3)}  control={<Radio color='default'/>} label="Chambre triple" />
                <FormControlLabel value={4} onClick={e=>test(4)}  control={<Radio color='default'/>} label="Chambre quadruple" />
                </RadioGroup>
                {
                personne.map(e => e)
            }
                
                <FormLabel id="demo-row-radio-buttons-group-label">Type logement</FormLabel>
                <RadioGroup sx={{ gridColumn: "span 4" }} row name="prix_pension"  >
                    <FormControlLabel  value={1} control={<Radio  color='default' />} label="Petit déjeuner" />
                    <FormControlLabel  value={2} control={<Radio  color='default' />} label="Demi Pension " />
                    <FormControlLabel value={3} control={<Radio  color='default'/>} label="Pension Complète" />
                    <FormControlLabel value={4} control={<Radio color='default'/>} label="All Inclusive Soft" />
                    <FormControlLabel value={5} control={<Radio color='default'/>} label="All Inclusive" />   
                </RadioGroup>
                <FormLabel id="demo-row-radio-buttons-group-label"> Bebe gratuit -5ans</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group">
                <FormControlLabel value={1}   control={<Radio />} label="Avec un bébé -5ans " />
                <FormControlLabel value={0} control={<Radio />} label="n'est pas un bébé -5ans" />
                </RadioGroup>
            </FormControl>
            <br/>
          
            
            
            {/* <Box display="flex" justifyContent="start" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Prix automatique
                  </Button>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    affecter client
                  </Button>
            </Box> */}
            

        </Box>
        
            <hr />
            <AffecterClient title={nomTypeChambre} listeInput={listpersonne} />
            </div>
  )
}
