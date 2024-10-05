import './App.css';
import { useState } from 'react';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import User from './pages/User/User';
import FaqsPage from './pages/FaqsPage/FaqsPage';
import DiscoveryAnalyzer from './pages/DiscoveryAnalyzer/DiscoveryAnalyzer';
import ExoEarthAnalyzer from './pages/ExoEarthAnalyzer/ExoEarthAnalyzer';
import HabitabilityAnalyzer from './pages/HabitabilityAnalyzer/HabitibilityAnalyzer';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

const AppRoutes = () => {
  const location = useLocation();
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  return (
    <div className="app--outer">
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home onSelectPlanet={setSelectedPlanet} selectedPlanet={selectedPlanet}/>} />
        <Route path="/create-user" exact element={<User key={location.pathname} onSelectPlanet={setSelectedPlanet} />} />
        <Route path="/faqs" exact element={<FaqsPage key={location.pathname} onSelectPlanet={setSelectedPlanet}/>} />
        <Route path="/habitability-predictor" exact element={<HabitabilityAnalyzer key={location.pathname} onSelectPlanet={setSelectedPlanet} selectedPlanet={selectedPlanet}/>} />
        <Route path="/discovery-method-analyzer" exact element={<DiscoveryAnalyzer key={location.pathname} onSelectPlanet={setSelectedPlanet}/>} />
        <Route path="/exo-earth-comparator" exact element={<ExoEarthAnalyzer key={location.pathname} />} onSelectPlanet={setSelectedPlanet}/>
      </Routes>
    </div>
  );
};

export default App;
