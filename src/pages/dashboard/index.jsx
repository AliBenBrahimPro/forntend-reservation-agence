import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import MediaCard from "../Link Agence/Bus/MediaCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { countAvion } from '../../redux/avionSlice';
import { countHotel } from '../../redux/hotelSlice';
import { countBus } from '../../redux/busSlice';
import { countEvent } from '../../redux/eventSlice';
import { countUser } from '../../redux/userSlice';
import { countProg } from '../../redux/programmeSlice';
import { countResevationevent } from '../../redux/reservationeventSlice';
import { countResevationhotel } from '../../redux/reservationhotelSlice';
import { countResevationtransport,countResevationtransportavion,countResevationtransportbus } from '../../redux/reservationtransSlice';
import { countResevationprogramme } from '../../redux/reservationprogrammeSlice';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ExploreIcon from '@mui/icons-material/Explore';
import Histogram from 'react-chart-histogram';
import DonutChart from 'react-donut-chart';
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isNonTablet = useMediaQuery("(min-width:992px)");
  const isNonDesktop = useMediaQuery("(min-width:1280x)");
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const dispatch =useDispatch();
  const {countavion} = useSelector(state=>state.avion)
  const {counthotel} = useSelector(state=>state.hotels)
  const {countbus} = useSelector(state=>state.bus)
  const {countevent} = useSelector(state=>state.event)
  const {countuser} = useSelector(state=>state.user)
  const {countprog} = useSelector(state=>state.programme)
  const {counttransport} = useSelector(state=>state.reservationtrans)
  const {counttransportbus} = useSelector(state=>state.reservationtrans)
  const {counttransportavion} = useSelector(state=>state.reservationtrans)
  const {countreservationhotel} = useSelector(state=>state.reservationhotel)
  const {countreservationevent} = useSelector(state=>state.reservationEvent)
  const {countreservationprogramme} = useSelector(state=>state.reservationprogramme)
  const reservationtitle=['Reservation Hotel','Reservation Transport','reservation Evenement','Reservation Programmes']
  const data = [countreservationhotel, counttransport, countreservationevent,countreservationprogramme];
  const options = { fillColor:'#6870fa', strokeColor: '#6870fa' };

    useEffect(()=>{
      dispatch(countAvion())
      dispatch(countHotel())
      dispatch(countBus())
      dispatch(countEvent())
      dispatch(countUser())
      dispatch(countProg())
      dispatch(countResevationhotel())
      dispatch(countResevationtransport())
      dispatch(countResevationtransportavion())
      dispatch(countResevationtransportbus())
      dispatch(countResevationevent())
      dispatch(countResevationprogramme())
         },[])
  return (
    <Box m="20px">
      {/* HEADER */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="tableau de bord" subtitle="Bienvenue sur votre tableau de bord" />

        <Box>
        </Box>
      </Box>
 

      {/* GRID & CHARTS */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
     
      <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={counthotel}
              subtitle="Nombre des Hotel :"
              icon={
                <ApartmentIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={countavion}
              subtitle="Nombre des Avion :"
              icon={
                <AirplanemodeActiveIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={countbus}
              subtitle="Nombre des Bus :"
              icon={
                <DirectionsBusIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={countevent}
              subtitle="Nombre des Evenements :"
              icon={
                <LocalActivityIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={countprog}
              subtitle="Nombre des Programmes :"
              icon={
                <ExploreIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={countuser}
              subtitle="Nombre des Agences :"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]}>
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                    style={{padding: "20px"}}
                  >
                   Reservation
                  </Typography>
                </Box>
              </Box>
              <Histogram
                  xLabels={reservationtitle}
                  yValues={data}
                  width='800px'
                  height='300px'
                  options={options}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box
            backgroundColor={colors.primary[400]}
            maxHeight="100vh"
            overflow="auto"
            m="25px 0 0 0"
          >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  style={{padding: "20px"}}
                  >
                   Reservation Transport 
                  </Typography>
                  </Box>
                  <DonutChart
                        data={[
                          {
                            label: 'Avion',
                            value: (parseInt(counttransportbus)/parseInt(counttransport))*100,
                          },
                          {
                            label: 'Bus',
                            value: (parseInt(counttransportavion)/parseInt(counttransport))*100,
                          },
                        ]}
                        strokeColor={'emptyColor'}
                        colors={["#4cceac","#6870fa"]}
                        width="360"
                        height="300"
                      />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
