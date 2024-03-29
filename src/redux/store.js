import {configureStore} from '@reduxjs/toolkit'
import adminSlice from './adminSlice'
import avionSlice from './avionSlice'
import busSlice from './busSlice'
import chambreSlice from './chambreSlice'
import clientSlice from './clientSlice'
import eventSlice from './eventSlice'
import hotelSlice from './hotelSlice'
import programmeSlice  from './programmeSlice'
import rctSlice from './rctSlice'
import reservationEventSlice  from './reservationeventSlice'
import reservationhotelSlice from './reservationhotelSlice'
import reservationtransSlice from './reservationtransSlice'
import reservationprogramme from './reservationprogrammeSlice'
import userSlice from './userSlice'
import  filterSlice from './globalSlice'

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
        reservationEvent:reservationEventSlice,
        chambre:chambreSlice,
        admin:adminSlice,
        reservationprogramme:reservationprogramme,
        productFilter: filterSlice
        


    },
})