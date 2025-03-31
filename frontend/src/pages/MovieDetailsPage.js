import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(`/api/movies/${id}`);
        if (!movieResponse.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch shows for this movie
        const showsResponse = await fetch(`/api/shows?movieId=${id}`);
        if (!showsResponse.ok) {
          throw new Error('Failed to fetch shows');
        }
        const showsData = await showsResponse.json();
        setShows(showsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading movie details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!movie) {
    return <div className="text-center py-8">Movie not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/3">
          <img
            src={movie.posterUrl || 'https://via.placeholder.com/300x450'}
            alt={movie.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-600 mb-4">{movie.duration} mins</p>
          <p className="text-gray-600 mb-4">Rating: {movie.rating}/5</p>
          <p className="text-gray-700 mb-6">{movie.description}</p>
          {user?.role === 'manager' && (
            <div className="flex gap-2">
              <Link
                to={`/movies/${movie.id}/edit`}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
              >
                Edit
              </Link>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Available Shows</h2>
      {shows.length === 0 ? (
        <p className="text-gray-600">No shows available for this movie</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shows.map((show) => (
            <div
              key={show.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{show.theater}</h3>
              <p className="text-gray-600 mb-2">
                {new Date(show.showTime).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-2">Price: ${show.price}</p>
              <p className="text-gray-600 mb-4">
                Available Seats: {show.availableSeats}
              </p>
              <Link
                to={`/shows/${show.id}/book`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;