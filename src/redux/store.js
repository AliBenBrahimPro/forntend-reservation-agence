import {configureStore} from '@reduxjs/toolkit'
import avionSlice from './avionSlice'
import busSlice from './busSlice'
import clientSlice from './clientSlice'
import eventSlice from './eventSlice'
import hotelSlice from './hotelSlice'
import programmeSlice  from './programmeSlice'
import reservationbusSlice from './reservationbusSlice'
export const store = configureStore({
    reducer:{
        hotels:hotelSlice,
        bus:busSlice,
        event:eventSlice,
        reservationbus:reservationbusSlice,
        client:clientSlice,
        avion:avionSlice,
        programme:programmeSlice,

    },
})