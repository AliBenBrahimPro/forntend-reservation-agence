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
            return data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );
               export const editHotels = createAsyncThunk(
                'hotels/editHotels',
                async (todo, { rejectWithValue }) => {
                  try{
                    const { id, services_equipements:{
                      climatisation,
                      restaurant,
                      centreAffaires,
                      piscine,
                      television,
                      boutiqueCadeaux,
                      change,
                      bar,
                      plage,
                      cafe,
                      ascenseur,
                      tennis,
                      animauxAutorises
                  },nom_hotel, e_mail, numero_telephone,adresse, nb_etoile, prix_chambre_double,prix_chambre_single,prix_chambre_triple,prix_chambre_quadruple,prix_demi_pension,prix_pension_complete,prix_all_inclusive,commision,date_debut,date_fin,image_hotel,capacite } = todo;

                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/hotel/updatehotel/${id}`, {
                      services_equipements:{
                        climatisation,
                        restaurant,
                        centreAffaires,
                        piscine,
                        television,
                        boutiqueCadeaux,
                        change,
                        bar,
                        plage,
                        cafe,
                        ascenseur,
                        tennis,
                        animauxAutorises
                    },nom_hotel, e_mail, numero_telephone,adresse, nb_etoile, prix_chambre_double,prix_chambre_single,prix_chambre_triple,prix_chambre_quadruple,prix_demi_pension,prix_pension_complete,prix_all_inclusive,commision,date_debut,date_fin,image_hotel,capacite
                    });
                          return response.data;
                          } catch (error) {
                          return rejectWithValue(error.message);
                          }
                }
                     );

                     export const countHotel = createAsyncThunk(
                      'hotels/countHotel',
                      async (_,thunkAPI) => {
                        const {rejectWithValue} = thunkAPI;
                          try{
                            const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/hotel/getcounthotel`)
                        const data = await res.json()
                        return data}
                        catch(error){
                          return rejectWithValue(error.message);
                        }
                      }
                    )
      
         
  export const hotelSlice = createSlice({
    name:'hotels',
    initialState:{
        data:[],
        getAllData:[],
        getAllDataHotel:[],
        counthotel:0,
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchHotels.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.getAllDataHotel =action.payload;
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
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
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
          [countHotel.fulfilled]:(state,action)=>{
            state.counthotel =action.payload.nb;
            state.status ="success";
            state.error =null;
         },
         [countHotel.pending]:(state)=>{
            state.status ="loading";
            state.error =null;
 
         },
         [countHotel.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          
       
    }
})

export default hotelSlice.reducer