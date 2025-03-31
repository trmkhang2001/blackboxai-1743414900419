const express = require('express');
const router = express.Router();
const showsController = require('../controllers/shows');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public routes
router.get('/', showsController.getAllShows);
router.get('/:id', showsController.getShowById);

// Manager-only routes
router.post('/', authMiddleware, roleMiddleware('manager'), showsController.addShow);
router.put('/:id', authMiddleware, roleMiddleware('manager'), showsController.updateShow);
router.delete('/:id', authMiddleware, roleMiddleware('manager'), showsController.deleteShow);

module.exports = router;