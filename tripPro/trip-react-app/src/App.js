import './App.css'
import Header from './components/fragments/Header'
import Navigation from './components/fragments/Navigation'
import Footer from './components/fragments/Footer'
import {Routes, Route } from 'react-router-dom';
import MainContent from "./components/fragments/MainContent";
import ClientList from './components/client/ClientList'
import ClientDetails from './components/client/ClientDetails'
import ClientForm from './components/client/ClientForm'
import TripList from './components/trip/TripList'
import TripDetails from './components/trip/TripDetails'
import TripForm from './components/trip/TripForm'
import ClientTripList from './components/clientTrip/ClientTripList'
import ClientTripDetails from './components/clientTrip/ClientTripDetails'
import ClientTripForm from './components/clientTrip/ClientTripForm'

function App() {
    return (
        <>
            <Header/>
            <Navigation />
            <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="clients">
                    <Route index={true} element={<ClientList />} />
                    <Route path="details/:idClient" element={<ClientDetails />} />
                    <Route path="add" element={<ClientForm />} />
                    <Route path="edit/:idClient" element={<ClientForm />} />
                </Route>
                <Route path="trips">
                    <Route index={true} element={<TripList />} />
                    <Route path="details/:idTrip" element={<TripDetails />} />
                    <Route path="add" element={<TripForm />} />
                    <Route path="edit/:idTrip" element={<TripForm />} />
                </Route>
                <Route path="cts">
                    <Route index={true} element={<ClientTripList />} />
                    <Route path="details/:idCT" element={<ClientTripDetails />} />
                    <Route path="add" element={<ClientTripForm />} />
                    <Route path="edit/:idCT" element={<ClientTripForm />} />
                </Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
