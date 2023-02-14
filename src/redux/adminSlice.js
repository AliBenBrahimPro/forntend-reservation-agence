import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

               
              export const loginadmin = createAsyncThunk(
                'admin/loginuadmin',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { e_mail,password} = todo;
              
                    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/loginadmin`, {
                    e_mail,password
                    });
                    console.log("response login",response)
                    return response.data;
                    
                  } catch (error) {
                    console.log(error);
                    return rejectWithValue(error.message);
                  }
                }
              );

               


         
  export const adminSlice = createSlice({
    name:'admin',
    initialState:{
        data:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
           //login
           [loginadmin.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
            state.error =null;
         },
         [loginadmin.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [loginadmin.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          
       
    }
})

export default adminSlice.reducer