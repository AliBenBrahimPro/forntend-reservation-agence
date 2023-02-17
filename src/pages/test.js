import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";

export default function Test() {
  return (
    <MDBContainer className="py-5 text-center">
      <MDBTable
        responsive
        striped
        className="text-successtable-border border-light"
      >
        <MDBTableHead className="border-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">
              <strong>Demi pension</strong>
            </th>
            <th scope="col">
              <strong>Pension Complete</strong>
            </th>
            <th scope="col">
              <strong>All inclusive soft</strong>
            </th>
            <th scope="col">
              <strong>All inclusive</strong>
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <th scope="row">Chambre double</th>
            <td>700 MB</td>
            <td>1,5 GB</td>
            <td>50 GB</td>
            <td>up to 5T</td>
          </tr>
          <tr>
            <th scope="row">Chambre single</th>
            <td>
              <MDBIcon fas icon="check" />
            </td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
          </tr>
          <tr>
            <th scope="row">Chambre triple</th>
            <td>-</td>
            <td>Optional</td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
          </tr>
         
          <tr>
            <th  scope="row">Chambre quadruple</th>
            <td>-</td>
            <td>-</td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
            <td>
              <MDBIcon fas icon="check" />
            </td>
          </tr>


    const {id} = useParams();
    const reservationtrans = useSelector(state=>state.reservationtrans)
    const [fullName,setFullName]=useState()
    const [email,setEmail]=useState()
    const [numTel,setNumTel]=useState()
    const [cIN,setCin]=useState()
    const [dateNaissance,setDateNaissance]=useState()
    const client = useSelector(state=>state.client)
    const {error} = useSelector(state=>state.client)
    const {status} = useSelector(state=>state.client)
    const {getAllData,data} = useSelector(state=>state.client)
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    useEffect(()=>{
        dispatch(fetchClient())
        dispatch(getSingleReservationTrans(id))
           },[dispatch])
       
           useEffect(()=>{
                },[client,reservationtrans])
console.log("id : ",id)
    const handleFormSubmit = (values) => {
      console.log(values)
        // if(data.length===0){
        //     dispatch(insertClient(values)).then((data)=>{
        //         if(data.type==="client/insertClient/fulfilled" ){
                  
        //          Swal.fire(
        //                    'Success',
        //                    `${data.payload.full_name} a ajouter avec succes`,
        //                    'success'
        //                  ) 
        //                  dispatch( insertRCT({reservationTarnsportId:id, clientId:data.payload.id})).then((datarct)=>{
        //                     if(datarct.type==="rct/insertRCT/fulfilled" ){
        //                         Swal.fire(
        //                             'Success',
        //                             `le client a ajouter avec succes`,
        //                             'success'
        //                           ) 

        //                     }
        //                     else{
        //                         console.log(datarct)

        //                         Swal.fire({
        //                                 icon: 'error',
        //                                 title: 'Oops...',
        //                                 text: "Quelque chose s'est mal passé!",
        //                               }) 
        //                     }
        //                  })
                
        //         }else{
        //              Swal.fire({
        //                  icon: 'error',
        //                  title: 'Oops...',
        //                  text: "Quelque chose s'est mal passé!",
        //                })
        //             }
                       
        //        })
        
               
        // }else{
        //     dispatch( insertRCT({reservationTarnsportId:id, clientId:data.id})).then((datarct)=>{
        //         if(datarct.type==="rct/insertRCT/fulfilled" ){
        //             console.log(datarct)
        //             Swal.fire(
        //                 'Success',
        //                 `le client a ajouter avec succes`,
        //                 'success'
        //               ) 

        //         }else{
        //             Swal.fire({
        //                     icon: 'error',
        //                     title: 'Oops...',
        //                     text: "Quelque chose s'est mal passé!",
        //                   }) 
        //         }
        //      })

        // }
      
        
    };
    const initialValues = {
      full_name: "",
      date_naissance: "",
      e_mail: "",
      numero_telephone: "",
      cin: "",
      
  };

    const checkoutSchema = yup.object().shape({
        // full_name:yup.string().required("Required"),
        // date_naissance:yup.date().required("Required"),
        // e_mail:yup.string().email("Invalid email!").required("Required"),
        // numero_telephone:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
        // cin:yup.number().required("Required"),
        
        

    });
   const handleClick = (e) => {
console.log(e.target.value)    }

    return (
        <Box m="20px">
          <Header title="CREATE USER" subtitle="Create a New User Profile" />
          { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading" ? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues}  validationSchema={checkoutSchema}>
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
{client.getAllData.length===0? <Alert sx={{ gridColumn: "span 4" }} severity="error">pas de client disponible</Alert>:
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Cin</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    onChange={e=>dispatch(getSingleClient(e.target.value))}
  >
  { getAllData.map(e=> <MenuItem value={e.id}>{e.cin}</MenuItem>)}
  
  </Select>
</FormControl>}
               
            
        
          
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Créer nouveau client
                  </Button>
                </Box>
              </form>
            )}
          </Formik>}
        </Box>
      );
}

export default ClientBus
