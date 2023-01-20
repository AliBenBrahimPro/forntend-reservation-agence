import {configureStore} from '@reduxjs/toolkit'
import busSlice from './busSlice'
import hotelSlice from './hotelSlice'
export const store = configureStore({
    reducer:{
        hotels:hotelSlice,
        bus:busSlice,
    },
})