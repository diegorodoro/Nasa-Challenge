import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DetailView from './detailViewAlex/DetailPlanets';
import PlanetCarousel from '../src/components/PlanetCarousel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanetCarousel />} />
        <Route path="/about" element={<DetailView />} />
      </Routes>
    </Router>
  )
}

export default App