import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchReservationBus = createAsyncThunk(
    'reservationbus/fetchReservationBus',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_bus/getallreservationbus`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertReservationBus = createAsyncThunk(
   'reservationbus/insertReservationBus',
   async (busData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_bus/addreservationbus`, 
         {
            method: 'POST', 
            body: JSON.stringify (busData),
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
  export const deleteReservationBus = createAsyncThunk(
    'reservationbus/deleteReservationBus',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_bus/deletereservationbus/${id}`, {
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


         export const getSingleReservationBus = createAsyncThunk(
          'reservationbus/getSingleReservationBus',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_bus/getreservationbusbybus/${id}`)
            const data = await res.json()
            return data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );



               export const editReservationBus = createAsyncThunk(
                'reservationbus/editReservationBus',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, nb_place, monatnt_total, date_debut,date_fin } = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/reservation_bus/updatereservationbus/${id}`, {
                        nb_place,
                        monatnt_total,
                 
                     
                      date_debut,
                      date_fin
                    });
                    
                    return response.data;
                    
                  } catch (error) {
                    console.log(error);
                    return rejectWithValue(error.message);
                  }
                }
              );
               


         
  export const reservationbusSlice = createSlice({
    name:'reservationbus',
    initialState:{
        data:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchReservationBus.fulfilled]:(state,action)=>{
           state.data =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchReservationBus.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchReservationBus.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertReservationBus.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertReservationBus.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertReservationBus.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteReservationBus.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.data =state.data.filter((el)=> el.id !==action.payload)
         },
         [deleteReservationBus.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteReservationBus.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleReservationBus.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleReservationBus.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleReservationBus.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editReservationBus.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editReservationBus.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editReservationBus.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default reservationbusSlice.reducer