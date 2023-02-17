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
  export const getuserleReservationhotel = createAsyncThunk(
    'reservationhotel/getuserReservationhotel',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_hotel/getalluserreservationhotel/${id}`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
         );
         export const deleteReservationhotel = createAsyncThunk(
          'reservationhotel/deleteReservationhotel',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
         await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_hotel/deletereservationhotel/${id}`, {
               method: 'DELETE',
               headers: {
               'Content-type': 'application/json; charset=UTF-8',
               },
               });
               return id;
               } catch (error) {
               return rejectWithValue(error.message);
               }
               }
               );

               export const insertReservationhotel = createAsyncThunk(
                'reservationhotel/insertReservationhotel',
                async (transData,thunkAPI) => {
                   const {rejectWithValue} = thunkAPI;
                 const iduser=  localStorage.getItem('id')
             
                    try{

                      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_hotel/addreservationhotel`, 
                      {
                         method: 'POST', 
                         body: JSON.stringify (transData),
                         headers: {
                         'Content-type': 'application/json; charset=UTF-8',
                         },
             
                      } );
                      const data =await res.json();
                      return data;
                      }catch(error){
                      return rejectWithValue(error.message);
                   }
                   }
                 )
                 export const countResevationhotel= createAsyncThunk(
                  'reservationhotel/countHotel',
                  async (tokens,thunkAPI) => {
                    console.log("token",tokens)
                    const {rejectWithValue} = thunkAPI;
                      try{
                        const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_hotel/countreservationhotel`)
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
        countreservationhotel:0,
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
         },
         [getuserleReservationhotel.fulfilled]:(state,action)=>{
          state.getAllData =action.payload;
          state.status ="success";
      state.error =null;
       },
       [getuserleReservationhotel.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

       },
       [getuserleReservationhotel.rejected]:(state,action)=>{
      
          state.status ="failed";
          state.error=action.payload;
        },
        [deleteReservationhotel.fulfilled]:(state,action)=>{
          state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
          state.status ="success";
          state.error =null;
       },
       [deleteReservationhotel.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

       },
       [deleteReservationhotel.rejected]:(state,action)=>{
      
          state.status ="failed";
          state.error=action.payload;
        },
        [insertReservationhotel.fulfilled]:(state,action)=>{
          state.data.push(action.payload);
          state.status ="success";
          state.error =null;
       },
       [insertReservationhotel.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

       },
       [insertReservationhotel.rejected]:(state,action)=>{
      
          state.status ="failed";
          state.error=action.payload;
        },
        [countResevationhotel.fulfilled]:(state,action)=>{
          state.countreservationhotel= action.payload.nb;
          state.status ="success";
          state.error =null;
       },
       [countResevationhotel.pending]:(state)=>{
        state.status ="loading";
        state.error =null;

       },
       [countResevationhotel.rejected]:(state,action)=>{
      
        state.status ="failed";
        state.error=action.payload;
        },
      }
})

export default reservationhotelSlice.reducer