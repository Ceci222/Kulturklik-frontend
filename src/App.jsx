import React from 'react';
import Banner from './components/Banner/Banner';
import SearchBar from './components/SearchBar/SearchBar';
import EventsPage from './pages/EventsPage';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventList from './components/EventList/EventList';
import UpcomingEvents from './components/UpcomingEvents/UpcomingEvents';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Banner />
        <NavBar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<><EventList /><UpcomingEvents /></>} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/conciertos" element={<EventsPage />} />
          <Route path="/Fiestas" element={<EventsPage />} />
          <Route path="/conferencias" element={<EventsPage />} />
          <Route path="/cine-y-audiovisuales" element={<EventsPage />} />
          <Route path="/otros" element={<EventsPage />} />
          <Route path="/upcoming" element={<UpcomingEvents />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;