import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BookingPage = () => {
  const { id: showId } = useParams();
  const [show, setShow] = useState(null);
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch show details
        const showResponse = await fetch(`/api/shows/${showId}`);
        if (!showResponse.ok) {
          throw new Error('Failed to fetch show details');
        }
        const showData = await showResponse.json();
        setShow(showData);

        // Fetch movie details
        const movieResponse = await fetch(`/api/movies/${showData.movieId}`);
        if (!movieResponse.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [showId]);

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          showId,
          seatNumber: selectedSeats.join(','),
          totalPrice: selectedSeats.length * show.price
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const bookingData = await response.json();
      navigate(`/bookings/${bookingData.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading show details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!show || !movie) {
    return <div className="text-center py-8">Show not found</div>;
  }

  // Generate seat map (10 rows x 5 columns)
  const seatRows = [];
  for (let row = 1; row <= 10; row++) {
    const rowSeats = [];
    for (let col = 1; col <= 5; col++) {
      const seatNumber = `${String.fromCharCode(64 + row)}${col}`;
      const isBooked = show.availableSeats < 50; // Simplified logic
      const isSelected = selectedSeats.includes(seatNumber);

      rowSeats.push(
        <button
          key={seatNumber}
          className={`w-8 h-8 m-1 rounded flex items-center justify-center 
            ${isBooked ? 'bg-red-500 cursor-not-allowed' : 
              isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          disabled={isBooked}
          onClick={() => !isBooked && handleSeatSelect(seatNumber)}
        >
          {col}
        </button>
      );
    }
    seatRows.push(
      <div key={row} className="flex items-center">
        <div className="w-8 text-center font-medium">{String.fromCharCode(64 + row)}</div>
        {rowSeats}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Book Tickets for {movie.title}</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-semibold mb-4">Select Seats</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-center mb-4">
              <div className="w-full h-8 bg-gray-300 mb-2"></div>
              <p className="text-sm">Screen</p>
            </div>
            <div className="flex flex-col items-center">
              {seatRows}
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 mr-2"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 mr-2"></div>
                <span>Booked</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                <span>Selected</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="space-y-2 mb-4">
              <p><span className="font-medium">Movie:</span> {movie.title}</p>
              <p><span className="font-medium">Theater:</span> {show.theater}</p>
              <p><span className="font-medium">Showtime:</span> {new Date(show.showTime).toLocaleString()}</p>
              <p><span className="font-medium">Seats:</span> {selectedSeats.join(', ') || 'None selected'}</p>
              <p><span className="font-medium">Price per seat:</span> ${show.price}</p>
              <p className="font-medium">Total: ${selectedSeats.length * show.price}</p>
            </div>
            <button
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
              className={`w-full py-2 px-4 rounded-lg text-white 
                ${selectedSeats.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;