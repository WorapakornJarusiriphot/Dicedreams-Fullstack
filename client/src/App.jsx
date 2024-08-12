import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';
import EventCard from './EventCard';
import DetailsPage from './DetailsPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events/:post_games_id" element={<DetailsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

