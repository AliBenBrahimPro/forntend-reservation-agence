import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchReservationEvent = createAsyncThunk(
    'reservationevent/fetchReservationevent',
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
  export const insertReservationEvent = createAsyncThunk(
   'reservationevent/insertReservationevent',
   async (busData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_evenement/postreservationevenement`, 
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
  export const deleteReservationEvent = createAsyncThunk(
    'reservationevent/deleteReservationevent',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_evenement/deletereservationevenement/${id}`, {
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


         export const getSingleReservationEvent = createAsyncThunk(
          'reservationevent/getSingleReservationevent',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_evenement/getallreservationevenementbyevenement/${id}`)
            const data = await res.json()
            return data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );



               export const editReservationEvent = createAsyncThunk(
                'reservationevent/editReservationevent',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, nb_place, monatnt_total, date_debut,date_fin } = todo;
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/reservation_evenement/updatereservationevenement/${id}`, {
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
               


         
  export const reservationeventSlice = createSlice({
    name:'reservationevent',
    initialState:{
        data:[],
        getAllData:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchReservationEvent.fulfilled]:(state,action)=>{
           state.data =action.payload;
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
         // insert books
         [insertReservationEvent.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertReservationEvent.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertReservationEvent.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteReservationEvent.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.data =state.data.filter((el)=> el.id !==action.payload)
         },
         [deleteReservationEvent.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteReservationEvent.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleReservationEvent.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleReservationEvent.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleReservationEvent.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editReservationEvent.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editReservationEvent.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editReservationEvent.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default reservationeventSlice.reducer