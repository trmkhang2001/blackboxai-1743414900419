import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoleGuard } from './components/RoleGuard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieListPage from './pages/MovieListPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import StaffDashboard from './pages/StaffDashboard';
import ForbiddenPage from './pages/ForbiddenPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<MovieListPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/movies/:id" element={<MovieDetailsPage />} />
              
              {/* Protected routes */}
              <Route path="/shows/:id/book" element={
                <RoleGuard allowedRoles={['user']}>
                  <BookingPage />
                </RoleGuard>
              } />
              <Route path="/profile" element={
                <RoleGuard allowedRoles={['user']}>
                  <ProfilePage />
                </RoleGuard>
              } />
              <Route path="/staff-dashboard" element={
                <RoleGuard allowedRoles={['staff', 'manager']}>
                  <StaffDashboard />
                </RoleGuard>
              } />
              <Route path="/403" element={<ForbiddenPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
