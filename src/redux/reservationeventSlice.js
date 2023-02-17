import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchReservationEvent = createAsyncThunk(
  'reservationEvent/fetchReservationevent',
  async (_,thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
      try{
        const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_evenement/getallreservationevenement`)
    const data = await res.json()
    return data}
    catch(error){
      return rejectWithValue(error.message);
    }
  }
)
export const getuserleReservationevent = createAsyncThunk(
  'reservationEvent/getuserReservationevent',
  async (id,thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
      try{
        const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_evenement/getallreservationevenementbyuser/${id}`)
    const data = await res.json()
    return data}
    catch(error){
      return rejectWithValue(error.message);
    }
  }
       );
       export const deleteReservationeVENT = createAsyncThunk(
        'reservationEvent/deleteReservationEVENT',
        async (id,thunkAPI) => {
          const {rejectWithValue} = thunkAPI;
            try{
       await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_evenement/deletereservationevenement/${id}`, {
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
             export const getSingleReservationEvent = createAsyncThunk(
              'reservationEvent/getSingleReservationevent',
              async (id,thunkAPI) => {
                const {rejectWithValue} = thunkAPI;
                  try{
                    const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_evenement/getreservationevenementbyid/${id}`)
                const data = await res.json()
                return data}
                catch(error){
                  return rejectWithValue(error.message);
                }
              }
                   );
    
    
    
                   export const editReservationEvent = createAsyncThunk(
                    'reservationEvent/editReservationevent',
                    async (todo, { rejectWithValue }) => {
                      try {
                        const { id, nb_place,evenementId,userId, monatnt_total, date_debut,date_fin } = todo;
                        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/reservation_evenement/updatereservationevenement/${id}`, {
                            nb_place,
                            monatnt_total,
                            date_debut,
                            date_fin,
                            userId,
                            evenementId
                        });
                        
                        return response.data;
                        
                      } catch (error) {
                        console.log(error);
                        return rejectWithValue(error.message);
                      }
                    }
                  );
                  export const countResevationevent= createAsyncThunk(
                    'reservationEvent/countreservationevent',
                    async (tokens,thunkAPI) => {
                      console.log("token",tokens)
                      const {rejectWithValue} = thunkAPI;
                        try{
                          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/reservation_evenement/countreservationevent`)
                      const data = await res.json()
                      return data}
                      catch(error){
                        return rejectWithValue(error.message);
                      }
                    }
                  )  
                  
                  export const fetchclientReservationEvent = createAsyncThunk(
                    'reservationEvent/fetchclientReservationevent',
                    async (id,thunkAPI) => {
                      const {rejectWithValue} = thunkAPI;
                        try{
                          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/RCE/getclientbyreservation/${id}`)
                      const data = await res.json()
                      return data}
                      catch(error){
                        return rejectWithValue(error.message);
                      }
                    }
                  )     
  export const reservationEventSlice = createSlice({
    name:'reservationEvent',
    initialState:{
        data:[],
        getAllData:[],
        getonereservationevent:[],
        countreservationvent:0,
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        [fetchReservationEvent.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
           state.error =null;
        },
        [fetchReservationEvent.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchReservationEvent.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         [getuserleReservationevent.fulfilled]:(state,action)=>{
          state.getAllData =action.payload;
          state.status ="success";
          state.error =null;
       },
       [getuserleReservationevent.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

       },
       [getuserleReservationevent.rejected]:(state,action)=>{
      
          state.status ="failed";
          state.error=action.payload;
        },
        [deleteReservationeVENT.fulfilled]:(state,action)=>{
          state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
          state.status ="success";
          state.error =null;
       },
       [deleteReservationeVENT.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

       },
       [deleteReservationeVENT.rejected]:(state,action)=>{
      
          state.status ="failed";
          state.error=action.payload;
        },
        [getSingleReservationEvent.fulfilled]:(state,action)=>{
          state.data = action.payload;
          state.getonereservationevent = action.payload;
          state.status ="success";
      state.error =null;
       },
       [getSingleReservationEvent.pending]:(state)=>{
        state.status ="loading";
        state.error =null;

       },
       [getSingleReservationEvent.rejected]:(state,action)=>{
      
        state.status ="failed";
        state.error=action.payload;
        },
        //edit hotel
        
        [editReservationEvent.fulfilled]: (state, action) => {
         
          return {
            ...state,
            data: action.payload,
           
          };
        },
        [editReservationEvent.pending]: (state, action) => {
          return {
            ...state,
            status:"loading"
          };
        },
        [editReservationEvent.rejected]: (state, action) => {
          return {
            ...state,
            status:"rejected",
            error:action.payload
          };
        },
        [countResevationevent.fulfilled]:(state,action)=>{
          state.countreservationevent= action.payload.nb;
          state.status ="success";
          state.error =null;
       },
       [countResevationevent.pending]:(state)=>{
        state.status ="loading";
        state.error =null;

       },
       [countResevationevent.rejected]:(state,action)=>{
      
        state.status ="failed";
        state.error=action.payload;
        },
        [fetchclientReservationEvent.fulfilled]:(state,action)=>{
          state.data= action.payload;
          state.status ="success";
          state.error =null;
       },
       [fetchclientReservationEvent.pending]:(state)=>{
        state.status ="loading";
        state.error =null;

       },
       [fetchclientReservationEvent.rejected]:(state,action)=>{
      
        state.status ="failed";
        state.error=action.payload;
        },
      }
})

export default reservationEventSlice.reducer