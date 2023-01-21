import {configureStore} from '@reduxjs/toolkit'
import busSlice from './busSlice'
import eventSlice from './eventSlice'
import hotelSlice from './hotelSlice'
export const store = configureStore({
    reducer:{
        hotels:hotelSlice,
        bus:busSlice,
        event:eventSlice
    },
})