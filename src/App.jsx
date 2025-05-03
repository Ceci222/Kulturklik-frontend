import React from 'react';
import './App.css';
import Banner from './components/Banner';
import SearchBar from './components/SearchBar';
import EventList from './components/EventList';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
    <Banner />
    <SearchBar />
    <EventInfoPanel/>
    <EventList />
    <VideoSection />
    <UpcomingEvents />
    <Footer />
  </div>
  );
}

export default App;
