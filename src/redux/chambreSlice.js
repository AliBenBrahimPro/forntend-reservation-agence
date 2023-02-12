import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchChambre = createAsyncThunk(
    'chambre/fetchChambre',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/chambre/getallchambre`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertChambre = createAsyncThunk(
    'chambre/insertChambre',
    async (clientData,thunkAPI) => {
       const {rejectWithValue} = thunkAPI;
 
        try{
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/chambre/addachambre`, 
          {
             method: 'POST', 
             body: JSON.stringify (clientData),
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
  export const getSingleChambre = createAsyncThunk(
    'chambre/getSingleChambre',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/chambre/getonechambre/${id}`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
         );

  export const chambreSlice = createSlice({
    name:'chambre',
    initialState:{
        data:[],
        getAllData:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        [fetchChambre.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchChambre.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchChambre.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         [insertChambre.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertChambre.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertChambre.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          [getSingleChambre.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleChambre.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleChambre.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
        
        
        
        }


})

export default chambreSlice.reducer