import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">MovieBooking</Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.role === 'user' && (
                <>
                  <Link to="/movies" className="hover:text-blue-200">
                    <i className="fas fa-film mr-1"></i> Movies
                  </Link>
                  <Link to="/profile" className="hover:text-blue-200">
                    <i className="fas fa-user mr-1"></i> Profile
                  </Link>
                </>
              )}
              {(user.role === 'staff' || user.role === 'manager') && (
                <Link to="/staff-dashboard" className="hover:text-blue-200">
                  <i className="fas fa-tachometer-alt mr-1"></i> Dashboard
                </Link>
              )}
              {user.role === 'manager' && (
                <Link to="/admin" className="hover:text-blue-200">
                  <i className="fas fa-cog mr-1"></i> Admin
                </Link>
              )}
              <button 
                onClick={logout}
                className="hover:text-blue-200"
              >
                <i className="fas fa-sign-out-alt mr-1"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">
                <i className="fas fa-sign-in-alt mr-1"></i> Login
              </Link>
              <Link to="/register" className="hover:text-blue-200">
                <i className="fas fa-user-plus mr-1"></i> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
