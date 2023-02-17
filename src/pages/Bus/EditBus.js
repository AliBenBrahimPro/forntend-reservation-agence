import React,{useEffect} from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch ,useSelector} from 'react-redux';
import Swal from 'sweetalert2'
import { insertBus,getSingleBus,editBus } from '../../redux/busSlice';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import { useNavigate } from "react-router-dom";

function EditBus() {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch =useDispatch();
  const {id} = useParams();
  const {data} = useSelector(state=>state.bus)
  const bus = useSelector(state=>state.bus)
  useEffect(()=>{
    dispatch(getSingleBus(id))
        },[])  
  const handleFormSubmit = (values) => {
      console.log(values);
      dispatch(editBus(values)).then((data)=>{
        console.log("data",data)
        if(data.type==="bus/editBus/fulfilled" ){
         Swal.fire(
                   'Success',
                   `${data.payload.matricule} a ete modifie avec succes`,
                   'success'
                 ) 
                 navigate('/admin/listbus')
        }else{
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: "Quelque chose s'est mal passé!",
               })}
       })
  };

  const checkoutSchema = yup.object().shape({
      matricule:yup.string().required("Required"),
      reference:yup.string().required("Required"),
      nb_place:yup.number().required("Required"),
      nb_place_reserver:yup.number().required("Required"),
      prix_place:yup.number().required("Required"),
      date_debut:yup.date().required("Required"),
      date_fin:yup.date().required("Required"),

  })
  return (
    <Box m="20px">
    <Header title="Creer nouveau BUS" subtitle="Ajouter nouveau BUS" />

    <Formik onSubmit={handleFormSubmit} initialValues={data} enableReinitialize={true} validationSchema={checkoutSchema}>
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
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Matricule"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.matricule}
              name="matricule"
              error={!!touched.matricule && !!errors.matricule}
              helperText={touched.matricule && errors.matricule}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
                  disabled
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Reference"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.reference}
                    name="reference"
                    error={!!touched.reference && !!errors.reference}
                    helperText={touched.reference && errors.reference}
                    sx={{ gridColumn: "span 2" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Point départ"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.point_depart}
                    name="point_depart"
                    error={!!touched.point_depart && !!errors.point_depart}
                    helperText={touched.point_depart && errors.point_depart}
                    sx={{ gridColumn: "span 2" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Point arrive"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.point_arrive}
                    name="point_arrive"
                    error={!!touched.point_arrive && !!errors.point_arrive}
                    helperText={touched.point_arrive && errors.point_arrive}
                    sx={{ gridColumn: "span 2" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Déscription"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.desc}
                    name="desc"
                    error={!!touched.desc && !!errors.desc}
                    helperText={touched.desc && errors.desc}
                    sx={{ gridColumn: "span 2" }}
                  />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Nombre de place"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nb_place}
              name="nb_place"
              error={!!touched.nb_place && !!errors.nb_place}
              helperText={touched.nb_place && errors.nb_place}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
            disabled
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Nombre de place reserver"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nb_place_reserver}
                    name="nb_place_reserver"
                    error={!!touched.nb_place_reserver && !!errors.nb_place_reserver}
                    helperText={touched.nb_place_reserver && errors.nb_place_reserver}
                    sx={{ gridColumn: "span 4" }}
                  />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Prix de place"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.prix_place}
              name="prix_place"
              error={!!touched.prix_place && !!errors.prix_place}
              helperText={touched.prix_place && errors.prix_place}
              sx={{ gridColumn: "span 4" }}
            />
          <TextField
              fullWidth
              variant="filled"
              type="datetime-local"
              label="Date début"
              onBlur={handleBlur}
              onChange={handleChange}
              value={moment(values.date_debut).format("YYYY-MM-DD[T]HH:mm:ss")}
              name="date_debut"
              error={!!touched.date_debut && !!errors.date_debut}
              helperText={touched.date_debut && errors.date_debut}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="datetime-local"
              label="Date fin"
              onBlur={handleBlur}
              onChange={handleChange}
              value={moment(values.date_fin).format("YYYY-MM-DD[T]HH:mm:ss")}
              name="date_fin"
              inputProps={{ min: values.date_debut}}
              error={!!touched.date_fin && !!errors.date_fin}
              helperText={touched.date_fin && errors.date_fin}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Modifier bus
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  )
}

export default EditBus