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
    // Only manager can add movies
    if (req.userRole !== 'manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }
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

exports.updateMovie = async (req, res) => {
  const { title, description, poster_url } = req.body;
  try {
    // Only manager can update movies
    if (req.userRole !== 'manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const [updated] = await Movie.update(
      { title, description, poster_url },
      { where: { id: req.params.id } }
    );
    if (!updated) return res.status(404).json({ message: 'Movie not found' });
    const updatedMovie = await Movie.findByPk(req.params.id);
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: 'Error updating movie' });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    // Only manager can delete movies
    if (req.userRole !== 'manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const deleted = await Movie.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie' });
  }
};
