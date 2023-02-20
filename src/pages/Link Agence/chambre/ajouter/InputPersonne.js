import React, { useEffect, useState } from 'react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
export default function InputPersonne(props) {

    
    const [nomPersonne, setPerosnne] = useState("")
    

    const handleChange = (e) => {
      setPerosnne(e.target.value);
    };
    
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label"> Personne {props.num }</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={nomPersonne}
            onChange={e=>handleChange(e)}
            label="Adulte"
            variant='filled'
            >
            <MenuItem value="Adulte">Adulte</MenuItem>
            <MenuItem value="Enfant">Enfant</MenuItem>
            </Select>
        </FormControl>
  )
}
