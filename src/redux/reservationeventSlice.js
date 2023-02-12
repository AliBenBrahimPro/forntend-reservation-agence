import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchReservationEvent = createAsyncThunk(
  'reservationEvent/fetchReservationevent',
  async (_,thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
      try{
        const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_evenement/getallreservationevenement`)
    const data = await res.json()
    return data}
    catch(error){
      return rejectWithValue(error.message);
    }
  }
)
export const getuserleReservationevent = createAsyncThunk(
  'reservationEvent/getuserReservationevent',
  async (id,thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
      try{
        const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_evenement/getallreservationevenementbyuser/${id}`)
    const data = await res.json()
    return data}
    catch(error){
      return rejectWithValue(error.message);
    }
  }
       );
  export const reservationEventSlice = createSlice({
    name:'reservationEvent',
    initialState:{
        data:[],
        getAllData:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        [fetchReservationEvent.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
           state.error =null;
        },
        [fetchReservationEvent.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchReservationEvent.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         [getuserleReservationevent.fulfilled]:(state,action)=>{
          state.getAllData =action.payload;
          state.status ="success";
          state.error =null;
       },
       [getuserleReservationevent.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

       },
       [getuserleReservationevent.rejected]:(state,action)=>{
      
          state.status ="failed";
          state.error=action.payload;
        },}
})

export default reservationEventSlice.reducer