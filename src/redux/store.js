import {configureStore} from '@reduxjs/toolkit'
import avionSlice from './avionSlice'
import busSlice from './busSlice'
import clientSlice from './clientSlice'
import eventSlice from './eventSlice'
import hotelSlice from './hotelSlice'
import programmeSlice  from './programmeSlice'
import rctSlice from './rctSlice'
import reservationEventSlice  from './reservationeventSlice'
import reservationhotelSlice from './reservationhotelSlice'
import reservationtransSlice from './reservationtransSlice'
import userSlice from './userSlice'
export const store = configureStore({
    reducer:{
        hotels:hotelSlice,
        bus:busSlice,
        event:eventSlice,
        reservationtrans:reservationtransSlice,
        client:clientSlice,
        avion:avionSlice,
        programme:programmeSlice,
        user:userSlice,
        rct:rctSlice,
        reservationhotel:reservationhotelSlice,
        reservationEvent:reservationEventSlice


    },
})