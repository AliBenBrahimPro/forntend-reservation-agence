import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchBus = createAsyncThunk(
    'bus/fetchBus',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/bus/getallbus`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertBus = createAsyncThunk(
   'bus/insertBus',
   async (busData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/bus/addbus`, 
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
  export const deleteBus = createAsyncThunk(
    'bus/deleteBus',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/bus/deletebus/${id}`, {
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


         export const getSingleBus = createAsyncThunk(
          'bus/getSingleBus',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/bus/getonebus/${id}`)
            const data = await res.json()
            return data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );



               export const editBus = createAsyncThunk(
                'bus/editBus',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, matricule, reference, nb_place, prix_place, date_debut,date_fin } = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/bus/updatebus/${id}`, {
                      matricule,
                      reference,
                      nb_place,
                      prix_place,
                      date_debut,
                      date_fin
                    });
                    console.log("response edit",response)
                    return response.data;
                    
                  } catch (error) {
                    console.log(error);
                    return rejectWithValue(error.message);
                  }
                }
              );
               


         
  export const busSlice = createSlice({
    name:'bus',
    initialState:{
        data:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchBus.fulfilled]:(state,action)=>{
           state.data =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchBus.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchBus.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertBus.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertBus.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertBus.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteBus.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.data =state.data.filter((el)=> el.id !==action.payload)
         },
         [deleteBus.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteBus.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleBus.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleBus.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleBus.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editBus.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editBus.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editBus.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default busSlice.reducer