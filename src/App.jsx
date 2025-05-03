import React from 'react';
import Banner from './components/Banner';
import SearchBar from './components/SearchBar';
import EventInfoPanel from './components/EventInfoPanel';
import EventList from './components/EventList';
import UpcomingEvents from './components/UpcomingEvents';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
    <Banner />
    <SearchBar />
    <EventInfoPanel/>
    <EventList />
    <UpcomingEvents />
    <Footer />
  </div>
  );
}

export default App;
