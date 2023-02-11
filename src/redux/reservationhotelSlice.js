import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchreservationhotel = createAsyncThunk(
    'reservationhotel/fetchreservationhotel',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_hotel/getallreservationhotel`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )

  export const reservationhotelSlice = createSlice({
    name:'reservationhotel',
    initialState:{
        data:[],
        getAllData:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        [fetchreservationhotel.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchreservationhotel.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchreservationhotel.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },}
})

export default reservationhotelSlice.reducer