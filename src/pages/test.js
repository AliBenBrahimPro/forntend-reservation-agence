import { Button, TextField, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';


function Test() {
  const [person,setPerson]=useState(5);
  const [formFields, setFormFields] = useState([
   
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields)
  }

  const addFields = () => {
    let object = {
      name: '',
      age: ''
    }

    setFormFields([...formFields, object])
    setPerson(person-1)
  }
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
    setPerson(person+1)
  }

  return (
    <Box className="App">
      <form onSubmit={submit}>
        <Typography>you have {person} personne left</Typography>
        {formFields.map((form, index) => {
          return (
            <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
                  }}
                >
              <TextField
                name='name'
                placeholder='Name'
                onChange={event => handleFormChange(event, index)}
                value={form.name}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                name='age'
                placeholder='Age'
                onChange={event => handleFormChange(event, index)}
                value={form.age}
                sx={{ gridColumn: "span 5" }}
              />
              <Button sx={{ gridColumn: "span 2" }} variant='contained' color='error' onClick={() => removeFields(index)}>Remove</Button>
            </Box>
          )
        })}
      </form>
     {person==0?'': <Button variant='contained' color='primary' onClick={addFields}>Add More..</Button>}
      <br />
      <Button variant='contained' color='success' onClick={submit}>Submit</Button>
    </Box>
  );
}

export default Test;