import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchRCP = createAsyncThunk(
    'rcp/fetchRCP',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/RCP/getallRCP`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertRCP = createAsyncThunk(
   'rcp/insertRCP',
   async (rcpData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/RCP/addRCE`, 
         {
            method: 'POST', 
            body: JSON.stringify (rcpData),
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
  export const deleteRCP = createAsyncThunk(
    'rcp/deleteRCP',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/RCP/deleteRCP/${id}`, {
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


     


         
  export const rcpSlice = createSlice({
    name:'rcp',
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
        [fetchRCP.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchRCP.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchRCP.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertRCP.fulfilled]:(state,action)=>{
            state.getAllData.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertRCP.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertRCP.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteRCP.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deleteRCP.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteRCP.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          
          
       
    }
})

export default rcpSlice.reducer