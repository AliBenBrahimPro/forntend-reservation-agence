import { Alert, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {fetchClient,deleteClient} from '../../../redux/clientSlice'

function ECH() {
    const client = useSelector(state=>state.client)
    const {error} = useSelector(state=>state.client)
    const {status} = useSelector(state=>state.client)
    const {getAllData,data} = useSelector(state=>state.client)
    const [idc,setIdc]=useState()
    const {id}=useParams()
    const dispatch =useDispatch();
    let navigate = useNavigate();
    useEffect(()=>{
        dispatch(fetchClient())
       
           },[dispatch])
       
           useEffect(()=>{
       
                },[client])

  return (
    <Box>
{ status==="loading"?<CircularProgress />:<Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '80vh',
      
    }}
  >
    {client.getAllData.length===0? <Alert sx={{ gridColumn: "span 4" }} severity="error">pas de client disponible</Alert>:
    <FormControl  sx={{ width: "300px",margin:'50px' }} fullWidth>
      <InputLabel id="demo-simple-select-label">Cin</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Cin"
        onChange={e=>setIdc(e.target.value)}
        variant='filled'
      >
      { getAllData.map(e=> <MenuItem value={e.id}>{e.cin}</MenuItem>)}
      
      </Select>
    </FormControl>}
    <Button  variant='contained' color='secondary' onClick={e=>navigate(`/agence/nch/${idc}/${id}`)}>Suivant</Button>
    </Box>}
   
    </Box>
  )
}

export default ECH