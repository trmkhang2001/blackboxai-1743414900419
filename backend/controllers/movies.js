const { Movie } = require('../models');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
};

exports.addMovie = async (req, res) => {
  const { title, description, poster_url } = req.body;
  try {
    const movie = await Movie.create({ title, description, poster_url });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error creating movie' });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie' });
  }
};