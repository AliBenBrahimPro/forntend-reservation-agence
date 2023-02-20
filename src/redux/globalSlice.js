import { createSlice} from '@reduxjs/toolkit'
const initialState = {
filter: 2,
nbr: '',
}
export const filterSlice = createSlice({
name: 'productFilter',
initialState,
reducers: {
setFilter: (state, action) => {
state.filter= action.payload
},
setNbr: (state, action) => {
    state.nbr= action.payload
    }

,}
})
export const { setFilter} = filterSlice.actions
export const { setNbr} = filterSlice.actions
export default filterSlice.reducer 