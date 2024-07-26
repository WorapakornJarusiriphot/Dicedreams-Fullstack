import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box } from '@mui/material';

const LayoutMain = () => {
  const [events, setEvents] = useState([]);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'transparent' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <Outlet context={{ addEvent }} />
        <Footer />
      </Box>
    </Box>
  );
};

export default LayoutMain;
