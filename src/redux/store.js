import {configureStore} from '@reduxjs/toolkit'
import busSlice from './busSlice'
import eventSlice from './eventSlice'
import hotelSlice from './hotelSlice'
import reservationbusSlice from './reservationbusSlice'
export const store = configureStore({
    reducer:{
        hotels:hotelSlice,
        bus:busSlice,
        event:eventSlice,
        reservationbus:reservationbusSlice
    },
})