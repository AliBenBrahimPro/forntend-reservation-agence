import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchReservationTrans = createAsyncThunk(
    'reservationtrans/fetchReservationTrans',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_transport/getallreservationtransport`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const fetchclientReservationTrans = createAsyncThunk(
    'reservationtrans/fetchclientReservationTrans',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/RCT/getclientbyreservation/${id}`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertReservationTrans = createAsyncThunk(
   'reservationtrans/insertReservationTrans',
   async (transData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_transport/addreservationtransport`, 
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
  export const deleteReservationTrans = createAsyncThunk(
    'reservationtrans/deleteReservationTrans',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_transport/deletereservationtransport/${id}`, {
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


         export const getSingleReservationTrans = createAsyncThunk(
          'reservationtrans/getSingleReservationTrans',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_transport/getreservationtransportbyid/${id}`)
            const data = await res.json()
            return data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );
               export const getuserleReservationTrans = createAsyncThunk(
                'reservationtrans/getuserReservationTrans',
                async (id,thunkAPI) => {
                  const {rejectWithValue} = thunkAPI;
                    try{
                      const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_transport/getallreservationtransportbyuser/${id}`)
                  const data = await res.json()
                  return data}
                  catch(error){
                    return rejectWithValue(error.message);
                  }
                }
                     );


               export const editReservationTrans = createAsyncThunk(
                'reservationtrans/editReservationTrans',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, nb_place,type, monatnt_total, date_debut,date_fin,id_transport, userId } = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/reservation_trans/updatereservationtransport/${id}`, {
                        nb_place,
                        monatnt_total,
                        type,
                     
                      date_debut,
                      date_fin,
                      id_transport,
                      userId
                    });
                    
                    return response.data;
                    
                  } catch (error) {
                    console.log(error);
                    return rejectWithValue(error.message);
                  }
                }
              );
               


         
  export const reservationtransSlice = createSlice({
    name:'reservationtrans',
    initialState:{
        data:[],
        getAllData:[],
        getAllDataclient:[],
        getAllDatauser:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchReservationTrans.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchReservationTrans.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchReservationTrans.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         [fetchclientReservationTrans.fulfilled]:(state,action)=>{
          state.getAllDataclient =action.payload;
          state.status ="success";
      state.error =null;
       },
       [fetchclientReservationTrans.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

       },
       [fetchclientReservationTrans.rejected]:(state,action)=>{
      
          state.status ="failed";
          state.error=action.payload;
        },
        [getuserleReservationTrans.fulfilled]:(state,action)=>{
          state.getAllDatauser =action.payload;
          state.status ="success";
      state.error =null;
       },
       [getuserleReservationTrans.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

       },
       [getuserleReservationTrans.rejected]:(state,action)=>{
      
          state.status ="failed";
          state.error=action.payload;
        },
         // insert books
         [insertReservationTrans.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
            state.error =null;
         },
         [insertReservationTrans.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertReservationTrans.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteReservationTrans.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deleteReservationTrans.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteReservationTrans.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleReservationTrans.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleReservationTrans.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleReservationTrans.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editReservationTrans.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editReservationTrans.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editReservationTrans.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default reservationtransSlice.reducer