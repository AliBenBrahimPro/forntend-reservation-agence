import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchProgramme = createAsyncThunk(
    'programme/fetchProgramme',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/programme/getallprogramme`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertProgramme = createAsyncThunk(
   'programme/insertProgramme',
   async (programmeData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/programme/addprogramme`, 
         {
            method: 'POST', 
            body: JSON.stringify (programmeData),
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
  export const deleteProgramme = createAsyncThunk(
    'programme/deleteProgramme',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/programme/deleteprogramme/${id}`, {
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


         export const getSingleProgramme = createAsyncThunk(
          'programme/getSingleProgramme',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/programme/getoneprogramme/${id}`)
            const data = await res.json()
            return data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );



               export const editProgramme = createAsyncThunk(
                'programme/editProgramme',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, nom_programme,date_debut, date_fin, hotelId,busId, avionId, evenementId } = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/programme/updateprogramme/${id}`, {
                        nom_programme,date_debut, date_fin, hotelId,busId, avionId, evenementId 
                    });
                    console.log("response edit",response)
                    return response.data;
                    
                  } catch (error) {
                    console.log(error);
                    return rejectWithValue(error.message);
                  }
                }
              );
               
              export const countProg = createAsyncThunk(
                'programme/countProg',
                async (tokens,thunkAPI) => {
                  console.log("token",tokens)
                  const {rejectWithValue} = thunkAPI;
                    try{
                      const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/programme/countprogramme`)
                  const data = await res.json()
                  return data}
                  catch(error){
                    return rejectWithValue(error.message);
                  }
                }
              )


         
  export const programmeSlice = createSlice({
    name:'programme',
    initialState:{
        data:[],
        getAllData:[],
        getAllDataprogramme:[],
        countprog:0,
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchProgramme.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.getAllDataprogramme =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchProgramme.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchProgramme.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertProgramme.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertProgramme.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertProgramme.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteProgramme.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deleteProgramme.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteProgramme.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleProgramme.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleProgramme.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleProgramme.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editProgramme.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editProgramme.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editProgramme.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          [countProg.fulfilled]:(state,action)=>{
            state.countprog= action.payload.nb;
            state.status ="success";
            state.error =null;
         },
         [countProg.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [countProg.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          
       
    }
})

export default programmeSlice.reducer