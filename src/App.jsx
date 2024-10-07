import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DetailView from './detailViewAlex/DetailPlanets';
import PlanetCarousel from './components/PlanetCarousel';
import SolarSystem from './components/SolarSystem';
import Team from './team/team';
import IframeComponent from './components/about';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanetCarousel />} />
        <Route path="/about" element={<DetailView />} />
        <Route path="/about_Team" element={<IframeComponent />} />
        <Route path="/team" element={<Team />} />Team
        <Route path="/orrey" element={<SolarSystem />} />
      </Routes>
    </Router>
  )
}

export default App