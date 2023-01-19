import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchHotels = createAsyncThunk(
    'hotels/fetchHotels',
    async (_,thunkAPI) => {
        try{
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hotel/getallhotel`)
      return response.data}
      catch(error){
        console.log(error)
      }
    }
  )
  export const deleteHotels = createAsyncThunk(
    'hotels/fetchHotels',
    async (id,thunkAPI) => {
        try{
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/hotel/deletehotel/${id}`)
      return response}
      catch(error){
        console.log(error)
      }
    }
  )
  export const hotelSlice = createSlice({
    name:'hotels',
    initialState:{
        data:[],
        status:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchHotels.fulfilled]:(state,action)=>{
           state.data =action.payload;
           state.status ="success";
        },
        [fetchHotels.pending]:(state)=>{
           state.status ="loading";
        },
        [fetchHotels.rejected]:(state)=>{
           state.status ="failed";
        },
        //delete Hotels
        [deleteHotels.fulfilled]:(state,action)=>{
            state.data =action.payload;
            state.status ="success";
         },
         [deleteHotels.pending]:(state)=>{
            state.status ="loading";
         },
         [deleteHotels.rejected]:(state)=>{
            state.status ="failed";
         },
    }
})

export default hotelSlice.reducer