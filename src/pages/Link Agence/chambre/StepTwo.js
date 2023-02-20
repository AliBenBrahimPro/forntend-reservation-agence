import React,{useState} from 'react'
import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery,useTheme } from "@mui/material";
import Header from "../../../components/Header";
import { useSelector } from 'react-redux';



const StepTwo = () => {
    const filter = useSelector((state) => state.productFilter.filter);
console.log(filter)
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const handleFormSubmit = (values) => {
        console.log(values);
    };
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        address1: "",
        address2: "",
    };
    const checkoutSchema = yup.object().shape({
        firstName:yup.string().required("Required"),
        lastName:yup.string().required("Required"),
        email:yup.string().email("Invalid email!").required("Required"),
        contact:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
        address1:yup.string().required("Required"),
        address2:yup.string().required("Required"),

    })
    return (
        <Box m="20px">
          <Header title="Client" subtitle="Créer nouveau hotel" />
    
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue}) => (
              <form onSubmit={handleSubmit}>
                <Box
                 
                >
                        {filter===1?<Box display="grid"
gap="30px"
gridTemplateColumns="repeat(4, minmax(0, 1fr))"
sx={{
  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
}}>
<TextField fullWidth sx={{ gridColumn: "span 2"  }} id="filled-basic" label="Nom" variant="filled" /><TextField fullWidth sx={{ gridColumn: "span 2"  }} id="filled-basic" label="Prenom" variant="filled" /></Box>:
filter=== 2 ? <Box  display="grid"
gap="30px"
gridTemplateColumns="repeat(4, minmax(0, 1fr))"
sx={{
  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
}}  >
<TextField fullWidth sx={{ gridColumn: "span 2"  }} id="filled-basic" label="Nom" variant="filled" /><TextField fullWidth sx={{ gridColumn: "span 2"  }} id="filled-basic" label="Prenom" variant="filled" />
<TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Nom" variant="filled" /><TextField fullWidth sx={{ gridColumn: "span 2"  }} id="filled-basic" label="Prenom" variant="filled" /></Box>:
filter===3?
<Box display="grid"
gap="30px"
gridTemplateColumns="repeat(4, minmax(0, 1fr))"
sx={{
  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
}}  >
<TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Nom" variant="filled" /><TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Prenom" variant="filled" />
<TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Nom" variant="filled" /><TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Prenom" variant="filled" />
<TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Nom" variant="filled" /><TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Prenom" variant="filled" />
</Box>:filter===4?
<Box display="grid"
gap="30px"
gridTemplateColumns="repeat(4, minmax(0, 1fr))"
sx={{
  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
}}>
<TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Nom" variant="filled" /><TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Prenom" variant="filled" />
<TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Nom" variant="filled" /><TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Prenom" variant="filled" />
<TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Nom" variant="filled" /><TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Prenom" variant="filled" />
<TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Nom" variant="filled" /><TextField fullWidth sx={{ gridColumn: "span 2"  }}id="filled-basic" label="Prenom" variant="filled" />
</Box>:""}

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

export default StepTwo