// App.js
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import WeatherForecast from './components/WeatherForecast';
import HourlyForecast from './components/HourlyForecast';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/"  element={<WeatherForecast />} />
        <Route path="/:day" element={<HourlyForecast />} />        
      </Routes>
    </Router>
  );
}

export default App;
