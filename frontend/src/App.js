import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieListPage from './pages/MovieListPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MovieListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
            <Route path="/shows/:id/book" element={<BookingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;