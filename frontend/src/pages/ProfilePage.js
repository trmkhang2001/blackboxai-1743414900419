import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings/user', {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="mb-4">Please login to view your profile</p>
        <a href="/login" className="text-blue-600 hover:underline">Login here</a>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Role:</span> {user.role}</p>
        </div>
        <button
          onClick={logout}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p>You have no bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{booking.Show?.Movie?.title}</h3>
                    <p className="text-gray-600">{booking.Show?.theater}</p>
                    <p className="text-gray-600">
                      {new Date(booking.Show?.showTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${booking.totalPrice}</p>
                    <p className={`text-sm ${
                      booking.status === 'confirmed' ? 'text-green-600' : 
                      booking.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {booking.status}
                    </p>
                  </div>
                </div>
                <p className="mt-2">Seats: {booking.seatNumber}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;