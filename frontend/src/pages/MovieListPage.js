import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Now Showing</h1>
      {user?.role === 'manager' && (
        <div className="mb-6">
          <Link
            to="/movies/new"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add New Movie
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={movie.posterUrl || 'https://via.placeholder.com/300x450'}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <p className="text-gray-600 mb-2">{movie.duration} mins</p>
              <p className="text-gray-600 mb-4">Rating: {movie.rating}/5</p>
              <Link
                to={`/movies/${movie.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieListPage;