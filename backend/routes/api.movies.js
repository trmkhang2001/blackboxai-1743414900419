const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public routes
router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getMovieById);

// Manager-only routes
router.post('/', authMiddleware, roleMiddleware('manager'), moviesController.addMovie);
router.put('/:id', authMiddleware, roleMiddleware('manager'), moviesController.updateMovie);
router.delete('/:id', authMiddleware, roleMiddleware('manager'), moviesController.deleteMovie);

module.exports = router;
