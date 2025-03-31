const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getMovieById);

// Protected routes (require authentication)
router.post('/', authMiddleware, moviesController.addMovie);

module.exports = router;
