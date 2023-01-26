import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchHotels = createAsyncThunk(
    'hotels/fetchHotels',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/hotel/getallhotel`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertHotels = createAsyncThunk(
   'hotels/insertHotels',
   async (hotelData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/hotel/addhotel`, 
         {
            method: 'POST', 
            body: JSON.stringify (hotelData),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },

         } );
        
      const data =await res.json();
        return data
      }catch(error){
      return rejectWithValue(error.message);
   }
   }
 )


  export const deleteHotels = createAsyncThunk(
    'hotels/deleteHotels',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/hotel/deletehotel/${id}`, {
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


         export const getSingleHotels = createAsyncThunk(
          'hotels/getSingleHotels',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/hotel/getonehotel/${id}`)
            const data = await res.json()
            console.log('single :',data)
            return data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );
               export const editHotels = createAsyncThunk(
                'hotels/editHotels',
                async (hotelData,id) => {
                  try{
                 const response =   await fetch(`${process.env.REACT_APP_BASE_URL}/api/hotel/updatehotel/${id}`, {
                          method: 'PUT',
                          body: JSON.stringify (hotelData),
                          headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                          },
                          });
                          return response.data;
                          } catch (error) {
                          return console.log(error.message);
                          }
                }
                     );


         
  export const hotelSlice = createSlice({
    name:'hotels',
    initialState:{
        data:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchHotels.fulfilled]:(state,action)=>{
           state.data =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchHotels.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchHotels.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertHotels.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertHotels.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertHotels.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteHotels.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.data =state.data.filter((el)=> el.id !==action.payload)
         },
         [deleteHotels.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteHotels.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleHotels.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleHotels.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleHotels.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
       
    }
})

export default hotelSlice.reducer