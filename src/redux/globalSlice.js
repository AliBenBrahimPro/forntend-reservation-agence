import { createSlice} from '@reduxjs/toolkit'
const initialState = {
filter: 2,
client: "",
next:0,
}
export const filterSlice = createSlice({
name: 'productFilter',
initialState,
reducers: {
setFilter: (state, action) => {
state.filter= action.payload
},
setClient: (state, action) => {
    state.client= action.payload
    },
setNext: (state, action) => {
        state.next= action.payload
        }
},

},
)
export const { setFilter} = filterSlice.actions
export const { setClient} = filterSlice.actions
export const { setNext} = filterSlice.actions
export default filterSlice.reducer 