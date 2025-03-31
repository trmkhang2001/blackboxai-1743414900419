const { Show } = require('../models');

exports.getAllShows = async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shows' });
  }
};

exports.addShow = async (req, res) => {
  const { movie_id, room_id, start_time, end_time } = req.body;
  try {
    // Only manager can add shows
    if (req.userRole !== 'manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const show = await Show.create({ movie_id, room_id, start_time, end_time });
    res.status(201).json(show);
  } catch (error) {
    res.status(500).json({ message: 'Error creating show' });
  }
};

exports.getShowById = async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) return res.status(404).json({ message: 'Show not found' });
    res.json(show);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching show' });
  }
};

exports.updateShow = async (req, res) => {
  const { movie_id, room_id, start_time, end_time } = req.body;
  try {
    // Only manager can update shows
    if (req.userRole !== 'manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const [updated] = await Show.update(
      { movie_id, room_id, start_time, end_time },
      { where: { id: req.params.id } }
    );
    if (!updated) return res.status(404).json({ message: 'Show not found' });
    const updatedShow = await Show.findByPk(req.params.id);
    res.json(updatedShow);
  } catch (error) {
    res.status(500).json({ message: 'Error updating show' });
  }
};

exports.deleteShow = async (req, res) => {
  try {
    // Only manager can delete shows
    if (req.userRole !== 'manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const deleted = await Show.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Show not found' });
    res.json({ message: 'Show deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting show' });
  }
};