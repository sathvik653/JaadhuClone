import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { TVShows } from './pages/TVShows';
import { ContentDetails } from './pages/ContentDetails';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/:type/:id" element={<ContentDetails />} />
        </Routes>
      </div>
    </Router>
  );
}