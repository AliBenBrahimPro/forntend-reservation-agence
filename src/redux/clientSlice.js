import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchClient = createAsyncThunk(
    'client/fetchClient',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/client/getallclient`)
      const data = await res.json()
      return data
    }
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertClient = createAsyncThunk(
   'client/insertClient',
   async (clientData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/client/postclient`, 
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
  export const deleteClient = createAsyncThunk(
    'client/deleteClient',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/client/deleteclient/${id}`, {
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


         export const getSingleClient = createAsyncThunk(
          'client/getSingleClient',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/client/getclient/${id}`)
            const data = await res.json()
            return data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );
               export const getSinglebymailClient = createAsyncThunk(
                'client/getSinglebymailClient',
                async (todo,thunkAPI) => {
                  const { e_mail } = todo;

                  const {rejectWithValue} = thunkAPI;
                    try{
                      const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/client/getclientbyemail/`,
                      {
                        e_mail
                      })

                  const data = await res.json()
                  return data}
                  catch(error){
                    return rejectWithValue(error.message);
                  }
                }
                     );



              //  export const editClient = createAsyncThunk(
              //   'client/editClient',
              //   async (todo, { rejectWithValue }) => {
              //     try {
              //       const { id, matricule, reference, nb_place,nb_place_reserver, prix_place, date_debut,date_fin } = todo;
              
              //       const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/client/updateclient/${id}`, {
              //         matricule,
              //         reference,
              //         nb_place,
              //         nb_place_reserver,
              //         prix_place,
              //         date_debut,
              //         date_fin
              //       });
              //       console.log("response edit",response)
              //       return response.data;
                    
              //     } catch (error) {
              //       console.log(error);
              //       return rejectWithValue(error.message);
              //     }
              //   }
              // );
               


         
  export const clientSlice = createSlice({
    name:'client',
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
        [fetchClient.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchClient.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchClient.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertClient.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertClient.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertClient.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteClient.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deleteClient.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteClient.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleClient.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleClient.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleClient.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [getSinglebymailClient.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [getSinglebymailClient.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [getSinglebymailClient.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default clientSlice.reducer