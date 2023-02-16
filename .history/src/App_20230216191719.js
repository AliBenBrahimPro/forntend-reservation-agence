import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import { MyProSidebarAgence } from "./pages/global/sidebar/sidebarContextAgence";
import TopbarAgence from "./pages/global/TopbarAgence";
import Agence from "./pages/Agence/index"
import Login from "./pages/login/index"
import Home from "./pages/Home/Home"
import Dashboard from "./pages/dashboard";
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import Form from "./pages/form";
import Calendar from "./pages/calendar";
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";
import Geography from "./pages/geography";
import Hotelform from "./pages/Hotel/HotelForm";
import EditHotel from "./pages/Hotel/EditHotel";
import ListHotel from "./pages/Hotel/ListHotel";
import BusForm from "./pages/Bus/BusForm";
import EditBus from "./pages//Bus/EditBus";
import ListBus from "./pages/Bus/ListBus";
import EventForm from "./pages/Event/EventForm";
import EditEvent from "./pages/Event/EditEvent";
import ListEvent from "./pages/Event/ListEvent";

import FormAvion from "./pages/Avion/FormAvion";
import ListAvion from "./pages/Avion/ListAvion";
import EditAvion from "./pages/Avion/EditAvion";
import ProgrammeForm from "./pages/Programme/FormProg";
import ListProgramme from "./pages/Programme/ListProg";
import EditProgramme from "./pages/Programme/EditProg";
import UserForm from "./pages/User/UserForm";
import ListUser from "./pages/User/Listuser";
import EditUser from "./pages/User/Edituser";
import AllBus from "./pages/Link Agence/Bus/AllBus";
import ReservationEvnt from "./pages/Link Agence/Evenement/ReservationEvnt";
import ReservationClient from "./pages/Link Agence/Reservation/ReservationClient";
import Topbar from "./pages/global/Topbar";
import Test from "./pages/test";
import FormClientAgence from "./pages/Link Agence/Client/FormClientAgence";
import AllHotel from "./pages/Link Agence/Hotel/AllHotel";
import ListClientAgence from "./pages/Link Agence/Client/ListClientAgence";
import Reservation from "./pages/Link Agence/Reservation/Reservation";
import AllAvion from "./pages/Link Agence/Avion/AllAvion";
import ReservationAvion from "./pages/Link Agence/Avion/ReservationAvion";
import AllEvent from "./pages/Link Agence/Evenement/AllEvent";
import AllProg from "./pages/Link Agence/Programme/AllProg";
import ClientAvion from "./pages/Link Agence/Avion/ClientAvion";
import HomeAgence from "./pages/home_agence";
import ReservationBus from "./pages/Link Agence/Bus/ReservationBus";
import ClientBus from "./pages/Link Agence/Bus/ClientBus";
import ClientEvent from "./pages/Link Agence/Evenement/ClientEvent";
import HotelDetails from "./pages/Link Agence/Hotel/HotelDetails";
import Chambre from "./pages/Link Agence/chambre/Chambre";
import ListreservationHotel from "./pages/listereservation/listereservationhotel";
import ListreservationTransport from "./pages/listereservation/listereservationtransport";
import ListreservationEvent from "./pages/listereservation/listereservationevent";
import ClientReserver from "./pages/listereservation/clientreserver";
import ListreservationHoteluser from "./pages/listereservationuser/listereservationhotel";
import ListreservationTransportuser from "./pages/listereservationuser/listereservationtransport";
import ListreservationEventuser from "./pages/listereservationuser/listereservationevent";
import ClientReserveruser from "./pages/listereservationuser/clientreserver";
import UpdateReservationBus from "./pages/updatereservation/updatereservationtrans";
import UpdateReservationAvion from "./pages/updatereservation/updatereservationavion";
import UpdateReservationevent from "./pages/updatereservation/updatereservationevent";
import ReservationCH from "./pages/Link Agence/chambre/reservationClient";
import NoClient from "./pages/Link Agence/components/NoClient";
import ChooseClient from "./pages/Link Agence/components/ChooseClient";
import ExistClient from "./pages/Link Agence/components/ExistClient";
import ClientForm from "./pages/Link Agence/components/ClientForm";
import NewClientHotel from "./pages/Link Agence/Hotel/NewClientHotel";
import FormProgAgence from "./pages/Link Agence/Programme/FormProgAgence";
import Ccp from "./pages/Link Agence/Programme/Ccp";
import Ecp from "./pages/Link Agence/Programme/EcP";
import Ncp from "./pages/Link Agence/Programme/Ncp";
import Fcp from "./pages/Link Agence/Programme/Fcp";
import Stepers from "./pages/Link Agence/Programme/stepers";
import RCH from "./pages/Link Agence/Programme/RCH";

function LinkAdmin() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyProSidebarProvider>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <Topbar />
            <Routes>
            <Route path="/" element={<Dashboard />} />
             <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />

                <Route path="/hotelform" element={<Hotelform />} />
                <Route path="/hotelform/:id" element={<EditHotel />} />
                <Route path="/listHotel" element={<ListHotel />} />

                <Route path="/busForm" element={<BusForm />} />
                <Route path="/busForm/:id" element={<EditBus />} />
                <Route path="/listbus" element={<ListBus />} />

                <Route path="/eventForm" element={<EventForm />} />
                <Route path="/eventForm/:id" element={<EditEvent />} />
                <Route path="/listevent" element={<ListEvent />} />

                <Route path="/avionForm" element={<FormAvion />} />
                <Route path="/avionForm/:id" element={<EditAvion />} />
                <Route path="/listavion" element={<ListAvion />} />

                <Route path="/programmeForm" element={<ProgrammeForm />} />
                <Route path="/programmeForm/:id" element={<EditProgramme />} />
                <Route path="/listprogramme" element={<ListProgramme />} />
                
                <Route path="/userForm" element={<UserForm />} />
                <Route path="/userForm/:id" element={<EditUser />} />
                <Route path="/listuser" element={<ListUser />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                
                <Route path="/listreservationhotel" element={<ListreservationHotel/>}/>
                <Route path="/listreservationtransport" element={<ListreservationTransport/>}/>
                <Route path="/listreservationevenement" element={<ListreservationEvent/>}/>
                <Route path="/listclientreservation/:id" element={<ClientReserver/>}/>

                </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
function LinkAgence() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyProSidebarAgence>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <TopbarAgence />
            <Routes>
            <Route path="/" element={<HomeAgence />} />
             <Route path="/dashboard" element={<HomeAgence/>} />
                <Route path="/team" element={<Team />} />
                <Route path="/clientavion/:id" element={<ClientAvion />} />
                <Route path="/chooseclient/:id" element={<ChooseClient />} />
                <Route path="/existclient" element={<ExistClient />} />
                <Route path="/clientform/:id" element={<ClientForm />} />
                <Route path="/reservationCH/:id" element={<ReservationCH />} />
                <Route path="/noclient" element={<NoClient />} />
                <Route path="/clientbus/:id" element={<ClientBus />} />
                <Route path="/clientevent/:id" element={<ClientEvent />} />
                <Route path="/client/:id" element={<ReservationClient />} />

                

                {/* display */}
                <Route path="/allbus" element={<AllBus />} />
                <Route path="/allavion" element={<AllAvion />} />
                <Route path="/allhotel" element={<AllHotel />} />
                <Route path="/allevent" element={<AllEvent />} />
                <Route path="/allprog" element={<AllProg/>} />
                {/* reservation */}
                <Route path="/reservationbus/:id" element={<ReservationBus />} />
                <Route path="/reservationavion/:id" element={<ReservationAvion />} />
                {/* hotel */}
                <Route path="/reservationevenement/:id" element={<ReservationEvnt />} />
                <Route path="/hotelform/:id" element={<EditHotel />} />
                <Route path="/listHotel" element={<ListHotel />} />
                <Route path="/hoteldetails/:id" element={<HotelDetails />} />
                <Route path="/chambre/:id" element={<Chambre />} />
                <Route path="/newclienthotel/:id" element={<NewClientHotel />} />
                {/* bus */}
                <Route path="/busForm" element={<BusForm />} />
                <Route path="/busForm/:id" element={<EditBus />} />
                <Route path="/listbus" element={<ListBus />} />
                {/* evenet */}
                <Route path="/eventForm" element={<EventForm />} />
                <Route path="/eventForm/:id" element={<EditEvent />} />
                <Route path="/listevent" element={<ListEvent />} />
                {/* avion */}
                <Route path="/avionForm" element={<FormAvion />} />
                <Route path="/avionForm/:id" element={<EditAvion />} />
                <Route path="/listavion" element={<ListAvion />} />
                {/* programme */}
                <Route path="/programmeForm" element={<ProgrammeForm />} />
                <Route path="/programmeForm/:id" element={<EditProgramme />} />
                <Route path="/listprogramme" element={<ListProgramme />} />
                <Route path="/ccp/:id" element={<Ccp />} />
                <Route path="/ecp" element={<Ecp />} />
                <Route path="/ncp/:id" element={<Ncp />} />
                <Route path="/fcp/:id" element={<Fcp />} />
                <Route path="/Stepers" element={<Stepers />} />
                <Route path="/rchp" element={<RCH />} />
                <Route path="/formprogagence/:id" element={<FormProgAgence />} />
                <Route path="/rct/:id" element={<FormProgAgence />} />


                {/* agence */}
                <Route path="/userForm" element={<UserForm />} />
                <Route path="/userForm/:id" element={<EditUser />} />
                <Route path="/listuser" element={<ListUser />} />
                {/* client */}
                <Route path="/formclient" element={<FormClientAgence />} />
                <Route path="/formclient/:id" element={<EditUser />} />
                <Route path="/listclient" element={<ListClientAgence />} />

                <Route path="/reservation" element={<Reservation />} />
               
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />

                <Route path="/listuserreservationhotel" element={<ListreservationHoteluser/>}/>
                <Route path="/listuserreservationtransport" element={<ListreservationTransportuser/>}/>
                <Route path="/updatereservationtransportbus/:id" element={<UpdateReservationBus/>}/> 
               <Route path="/updatereservationtransportavion/:id" element={<UpdateReservationAvion/>}/>
                <Route path="/listuserreservationevenement" element={<ListreservationEventuser/>}/>
                <Route path="/updatereservationevenement/:id" element={<UpdateReservationevent/>}/>
                <Route path="/listuserclientreservation/:id" element={<ClientReserveruser/>}/>
                
                </Routes>
            </main>
          </div>
        </MyProSidebarAgence>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}


const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
        <CssBaseline />
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Routes>
<Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/test" element={<Test/>}/>
    
  
    <Route path="/admin/*" element={ <LinkAdmin />} />
    <Route path="/agence/*" element={ <LinkAgence />} />
</Routes>
            </main>
          </div>
    </ColorModeContext.Provider>
  );
};

export default App;
