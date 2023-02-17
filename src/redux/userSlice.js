import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/getAllAgence`)
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertUser = createAsyncThunk(
   'user/insertUser',
   async (userData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/postAgence`, 
         {
            method: 'POST', 
            body: JSON.stringify (userData),
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
  export const deletUser = createAsyncThunk(
    'user/deleteUser',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/detleteuser/${id}`, {
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


         export const getSingleUser = createAsyncThunk(
          'user/getSingleUser',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/getagence/${id}`)
            const data = await res.json()
            return data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );



               export const editUser = createAsyncThunk(
                'user/editUser',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id,code_agence,nom_agence,e_mail,password,numero_telephone,adresse,cp_agence,solde,credit,commition_hotel} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/user/updateAgence/${id}`, {
                      code_agence,nom_agence,e_mail,password,numero_telephone,adresse,cp_agence,solde,credit,commition_hotel
                    });
                    console.log("response edit",response)
                    return response.data;
                    
                  } catch (error) {
                    console.log(error);
                    return rejectWithValue(error.message);
                  }
                }
              );
              
               
              export const login = createAsyncThunk(
                'user/loginuser',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { e_mail,password} = todo;
              
                    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/loginAgence`, {
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

              export const countUser= createAsyncThunk(
                'user/countUser',
                async (tokens,thunkAPI) => {
                  console.log("token",tokens)
                  const {rejectWithValue} = thunkAPI;
                    try{
                      const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/countagence`)
                  const data = await res.json()
                  return data}
                  catch(error){
                    return rejectWithValue(error.message);
                  }
                }
              )        


         
  export const userSlice = createSlice({
    name:'user',
    initialState:{
        data:[],
        countuser:0,
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show agence
        [fetchUser.fulfilled]:(state,action)=>{
           state.data =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchUser.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchUser.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert agence
         [insertUser.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertUser.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertUser.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete user
          [deletUser.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.data =state.data.filter((el)=> el.id !==action.payload)
         },
         [deletUser.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deletUser.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single User
          [getSingleUser.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleUser.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleUser.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit User
          
          [editUser.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editUser.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editUser.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
           //login
           [login.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
            state.error =null;
         },
         [login.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [login.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          [countUser.fulfilled]:(state,action)=>{
            state.countuser= action.payload.nb;
            state.status ="success";
            state.error =null;
         },
         [countUser.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [countUser.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          
       
    }
})

export default userSlice.reducer