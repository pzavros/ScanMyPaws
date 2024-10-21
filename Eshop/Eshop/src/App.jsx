// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <Router>
      <Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
