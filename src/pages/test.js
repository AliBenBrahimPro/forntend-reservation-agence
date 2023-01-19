import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {fetchHotels} from '../redux/hotelSlice'
import useSWR from 'swr';
import axios from 'axios';

export default function VirtualizedList() {
//   const hotels = useSelector(state=>state.hotels)
// const dispatch = useDispatch();

// useEffect(()=>{
//  dispatch(fetchHotels())

//     },[dispatch])

//     useEffect(()=>{

//      console.log('products : ', hotels)
//          },[hotels])
const fetcher = (url) => fetch(url).then((res) => res.json());



const { data, error, isLoading } =useSWR(`${process.env.REACT_APP_BASE_URL}/api/hotel/getallhotel`,fetcher);
    console.log("data :",data)
  return (
    <Box
      sx={{ height:'100%', width: '100%', display:'flex',justifyContent:'center', alignContent:'center',alignItems:'center'}}
    >
{error?<div>failed to load</div>:isLoading? <div>loading...</div>:<div>hello {data[0].nom_hotel} !</div>
}     </Box>
  );
}