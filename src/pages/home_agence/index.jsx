import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchBus } from '../../redux/busSlice'
import { fetchAvion } from '../../redux/avionSlice'
import { fetchHotels } from '../../redux/hotelSlice'
import { fetchEvent } from '../../redux/eventSlice'
import { Alert, CircularProgress, Grid } from '@mui/material'
import moment from 'moment'
import MediaCard from '../Link Agence/Bus/MediaCard'
import MediaCardHotel from '../Link Agence/Hotel/MediaCard'
import MediaCardAvion from '../Link Agence/Avion/MediaCard'
import MediaCardProg from '../Link Agence/Programme/MediaCard'
import MediaCardEvent from '../Link Agence/Evenement/MediaCard'
import busimg from "../../assets/bus.jpg";
import avionimg from "../../assets/avion.jpg";
import { fetchProgramme } from "../../redux/programmeSlice";
import tozeur from "../../assets/tozeur.jpg";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { getSingleUser } from "../../redux/userSlice";

const HomeAgence = () => {
  const tokenss=localStorage.getItem('tokens')
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:780px)");
  const isNonTablet = useMediaQuery("(min-width:992px)");
  const isNonDesktop = useMediaQuery("(min-width:1280x)");
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const {getAllData} = useSelector(state=>state.bus)
  const {getAllDataAvion} = useSelector(state=>state.avion)
  const {getAllDataHotel} = useSelector(state=>state.hotels)
  const {getAllDataEvent} = useSelector(state=>state.event)
  const {getAllDataprogramme} = useSelector(state=>state.programme)

const dispatch = useDispatch();

useEffect(()=>{
  dispatch(fetchBus())
  dispatch(fetchAvion(tokenss))
  dispatch(fetchHotels())
  dispatch(fetchEvent())
  dispatch(fetchProgramme())
  dispatch(getSingleUser(localStorage.getItem('id')))
     },[dispatch])
     console.log(getAllDataAvion)
  return (
    <Box m="20px">
      {/* HEADER */}

      {getAllDataprogramme.length>0 ? <div>
        <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
       {
        getAllDataprogramme.slice(0,3).map(e=>
          <Grid  item xs={12} sm={4} md={4}>
                    <MediaCardProg PLACE={`${e.point_depart} à ${e.point_arrive}`} busid={e.busId} evenementId={e.evenementId} hotelId={e.hotelId} id={e.id} sub3={`${moment(e.date_fin).format('YYYY-MM-DD')} à ${moment(e.date_fin).format('hh:mm')}`} sub2={`${moment(e.date_debut).format('YYYY-MM-DD')} à ${moment(e.date_debut).format('hh:mm')}`}  image={`${process.env.REACT_APP_BASE_URL}/${e.image_programme}`} title={`${e.nom_programme}`} subtile={`  ${e.capacite}`} onebtn='à partir de' twobtn={e.prix_demi_pension} btn='Réserver' description={e.desc}/>
                    </Grid>
        )
       }
      
    </Grid>
   <Link to='/agence/allprog'><Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginTop: "25px",
              width: '100%',
              marginBottom:'20px'
            }}
            endIcon={<KeyboardDoubleArrowDownIcon/>}
          >
            En voir plus tous les programme disponnible
          </Button></Link></div>:null }
     {getAllData.length>0 ? <div><Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
       {
        getAllData.slice(0,3).map(e=>
          <Grid  item xs={12} sm={4} md={4}>
                    <MediaCard id={e.id} sub3={`${moment(e.date_fin).format('YYYY-MM-DD')} à ${moment(e.date_fin).format('hh:mm')}`} sub2={`${moment(e.date_debut).format('YYYY-MM-DD')} à ${moment(e.date_debut).format('hh:mm')}`}  title={`${e.point_depart} à ${e.point_arrive}`} image={busimg} subtile={`  ${e.nb_place-e.nb_place_reserver}`} onebtn='à partir de' twobtn={e.prix_place} btn='Réserver' description={e.desc}/>
                    </Grid>
        )
       }
      
    </Grid>
   <Link to='/agence/allbus'><Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginTop: "25px",
              width: '100%',
              marginBottom:'20px'
            }}
            endIcon={<KeyboardDoubleArrowDownIcon/>}
          >
            En voir plus tous les bus disponnible
          </Button></Link></div>:null }
          {  getAllDataAvion.length>0 ? 
     <><Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
       { getAllDataAvion.slice(0,3).map(e=>
          <Grid  item xs={12} sm={4} md={4}>
          <MediaCardAvion id={e.id} image={avionimg} title={`${e.point_depart} à ${e.point_arrive}`} sub3={`${moment(e.date_debut).format('YYYY-MM-DD')} à ${moment(e.date_debut).format('hh:mm')}`}   sub2={`${moment(e.date_fin).format('YYYY-MM-DD')} à ${moment(e.date_fin).format('hh:mm')}`} subtile={`  ${e.nb_place-e.nb_place_reserver}`} onebtn='à partir de' twobtn={e.prix_place_simple} btn='Réserver' description={e.nom_avion}/>
          </Grid>
        )}
    </Grid>
   <Link to='/agence/allavion'><Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginTop: "25px",
              width: '100%',
              marginBottom:'20px'
            }}
            endIcon={<KeyboardDoubleArrowDownIcon/>}
          >
            En voir plus tous les Avion disponnible
          </Button></Link> </> :null}
      {getAllDataHotel.length>0 ?<>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
       {
        getAllDataHotel.slice(0,3).map(e=>
          <Grid  item xs={12} sm={4} md={4}>
          <MediaCardHotel stars={e.nb_etoile} id={e.id} sub3={`${moment(e.date_fin).format('YYYY-MM-DD')} à ${moment(e.date_fin).format('hh:mm')}`} sub2={`${moment(e.date_debut).format('YYYY-MM-DD')} à ${moment(e.date_debut).format('hh:mm')}`}  image={`${process.env.REACT_APP_BASE_URL}/${e.image_hotel[0]}`} title={`${e.nom_hotel}`} subtile={`  ${e.capacite-e.nb_place_reserver}`} onebtn='à partir de' twobtn={e.prix_demi_pension} btn='Réserver' description={e.desc}/>
          </Grid>
        )
       }
      
    </Grid>
   <Link to='/agence/allhotel'><Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginTop: "25px",
              width: '100%',
              marginBottom:'20px'
            }}
            endIcon={<KeyboardDoubleArrowDownIcon/>}
          >
            En voir plus tous les Hotel disponnible
          </Button></Link> 
          </>:null}
       {getAllDataEvent.length>0 ? <>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
       {
        getAllDataEvent.slice(0,3).map(e=>
          <Grid  item xs={12} sm={4} md={4}>
          <MediaCardEvent id={e.id} image={`${process.env.REACT_APP_BASE_URL}/${e.image_evenement}`} title={`${e.nom_evenement}`} sub3={`${moment(e.date_debut).format('YYYY-MM-DD')} à ${moment(e.date_debut).format('hh:mm')}`}   sub2={`${moment(e.date_fin).format('YYYY-MM-DD')} à ${moment(e.date_fin).format('hh:mm')}`} subtile={`  ${e.nb_place-e.nb_place_reserver}`} onebtn='à partir de' twobtn={e.prix_evenement} btn='Réserver' description={e.description}/>
          </Grid>
        )
       }
      
    </Grid>
   <Link to='/agence/allevent'><Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginTop: "25px",
              width: '100%',
              marginBottom:'20px'
            }}
            endIcon={<KeyboardDoubleArrowDownIcon/>}
          >
            En voir plus tous les evenement disponnible
          </Button></Link> </>:null}
    </Box>
  );
};

export default HomeAgence;
