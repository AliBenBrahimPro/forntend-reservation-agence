import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import Topbar from "./pages/global/Topbar";
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
import VirtualizedList from "./pages/test";
import EditHotel from "./pages/Hotel/EditHotel";
import ListHotel from "./pages/Hotel/ListHotel";
import BusForm from "./pages/Bus/BusForm";
import EditBus from "./pages//Bus/EditBus";
import ListBus from "./pages/Bus/ListBus";
import EventForm from "./pages/Event/EventForm";
import EditEvent from "./pages/Event/EditEvent";
import ListEvent from "./pages/Event/ListEvent";
import ReservationBus from "./pages/Reservation/ReservationBus";
import ReservationEvnt from "./pages/Reservation/ReservationEvnt";
import ReservationClient from "./pages/Reservation/ReservationClient";

function RouteApp() {
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
                <Route path="/busForm" element={<BusForm />} />
                <Route path="/busForm/:id" element={<EditBus />} />
                <Route path="/eventForm" element={<EventForm />} />
                <Route path="/eventForm/:id" element={<EditEvent />} />
                <Route path="/listHotel" element={<ListHotel />} />
                <Route path="/listbus" element={<ListBus />} />
                <Route path="/listevent" element={<ListEvent />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                
                </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
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
<Route path="/home" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/agence" element={<Agence/>}/>
    <Route path="/test" element={<VirtualizedList/>}/>
    <Route path="/reservationbus/:id" element={<ReservationBus />} />
    <Route path="/client/:id" element={<ReservationClient />} />
    <Route path="/reservationevenement/:id" element={<ReservationEvnt />} />
    <Route path="/*" element={ <RouteApp />} />
</Routes>
            </main>
          </div>
    </ColorModeContext.Provider>
  );
};

export default App;
