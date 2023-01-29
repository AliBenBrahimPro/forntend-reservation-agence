import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchAvion = createAsyncThunk(
    'avion/fetchAvion',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/avion/getallavion`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertAvion = createAsyncThunk(
   'avion/insertAvion',
   async (avionData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/avion/addavion`, 
         {
            method: 'POST', 
            body: JSON.stringify (avionData),
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
  export const deleteAvion = createAsyncThunk(
    'avion/deleteAvion',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/avion/deleteavion/${id}`, {
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


         export const getSingleAvion = createAsyncThunk(
          'avion/getSingleAvion',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/avion/getoneavion/${id}`)
            const data = await res.json()
            return data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );



               export const editAvion = createAsyncThunk(
                'avion/editAvion',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, nom_avion,prix_place_simple, reference, point_arrive,point_depart, nb_place, date_debut,date_fin,prix_place_speciale,nb_place_reserver } = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/avion/updateavion/${id}`, {
                        nom_avion,prix_place_simple, reference, point_arrive,point_depart, nb_place, date_debut,date_fin,prix_place_speciale,nb_place_reserver
                    });
                    console.log("response edit",response)
                    return response.data;
                    
                  } catch (error) {
                    console.log(error);
                    return rejectWithValue(error.message);
                  }
                }
              );
               


         
  export const avionSlice = createSlice({
    name:'avion',
    initialState:{
        data:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchAvion.fulfilled]:(state,action)=>{
           state.data =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchAvion.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchAvion.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertAvion.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertAvion.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertAvion.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteAvion.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.data =state.data.filter((el)=> el.id !==action.payload)
         },
         [deleteAvion.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteAvion.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleAvion.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleAvion.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleAvion.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editAvion.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editAvion.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editAvion.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default avionSlice.reducer