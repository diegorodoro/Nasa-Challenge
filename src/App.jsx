import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DetailView from './detailViewAlex/DetailPlanets';
import PlanetCarousel from '../src/components/PlanetCarousel';
import SolarSystem from './components/SolarSystem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanetCarousel />} />
        <Route path="/about" element={<DetailView />} />
        <Route path="/orrey" element={<SolarSystem />} />
      </Routes>
    </Router>
  )
}

export default App