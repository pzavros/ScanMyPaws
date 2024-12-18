// src/App.jsx
import React from 'react';
import HomePage from './Pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNavbar from './components/StaticComponents/BottomNavBar';
import PetsPage from './Pages/PetsPage';
import NotificationsPage from './Pages/NotificationsPage';
import PlannerPage from './Pages/PlannerPage';
import TopNavbar from './components/StaticComponents/TopNabBar';

const App = () => {
  return (
    <Router>
    <TopNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/planner" element={<PlannerPage />} />
      </Routes>
      <BottomNavbar />
    </Router>
  );
};

export default App;
