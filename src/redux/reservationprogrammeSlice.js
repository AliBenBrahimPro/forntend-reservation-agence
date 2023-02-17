import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const countResevationprogramme= createAsyncThunk(
  'reservationprogramme/countreservationprogramme',
  async (tokens,thunkAPI) => {
    console.log("token",tokens)
    const {rejectWithValue} = thunkAPI;
      try{
        const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation/countreservation`)
    const data = await res.json()
    return data}
    catch(error){
      return rejectWithValue(error.message);
    }
  }
)   
          
  export const reservationprogramme = createSlice({
    name:'reservationprogramme',
    initialState:{
        data:[],
        countreservationprogramme:0,
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
           //login
           [countResevationprogramme.fulfilled]:(state,action)=>{
            state.countreservationprogramme = action.payload.nb;
            state.status ="success";
            state.error =null;
         },
         [countResevationprogramme.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [countResevationprogramme.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          
       
    }
})

export default reservationprogramme.reducer