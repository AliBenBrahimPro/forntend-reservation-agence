import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchEvent = createAsyncThunk(
    'event/fetchEvent',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/evenement/getallevenement`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertEvent = createAsyncThunk(
   'event/insertEvent',
   async (eventData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/evenement/addevenement`, 
         {
            method: 'POST', 
            body: JSON.stringify (eventData),
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
  export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/evenement/deleteevenement/${id}`, {
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


         export const getSingleEvent = createAsyncThunk(
          'event/getSingleEvent',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/evenement/getoneevenement/${id}`)
            const data = await res.json()
            return data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );



               export const editEvent = createAsyncThunk(
                'event/editEvent',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, nom_evenement, description, nb_place,nb_place_reserver, prix_evenement, date_debut,date_fin } = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/evenement/updateevenement/${id}`, {
                        nom_evenement,
                        description,
                      nb_place,
                      nb_place_reserver,
                      prix_evenement,
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
               


         
  export const eventSlice = createSlice({
    name:'Event',
    initialState:{
        data:[],
        getAllData:[],
        getAllDataEvent:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchEvent.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.getAllDataEvent =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchEvent.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchEvent.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertEvent.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertEvent.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertEvent.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteEvent.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deleteEvent.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteEvent.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleEvent.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
            state.error =null;
         },
         [getSingleEvent.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleEvent.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editEvent.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editEvent.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editEvent.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default eventSlice.reducer