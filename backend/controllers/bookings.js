const { Booking, Show } = require('../models');

exports.createBooking = async (req, res) => {
  try {
    const { showId, seatNumber, totalPrice } = req.body;
    
    // Get the show
    const show = await Show.findByPk(showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // Validate seat number format (e.g. "A1", "B5")
    if (!/^[A-Z]\d+$/.test(seatNumber)) {
      return res.status(400).json({ message: 'Invalid seat number format' });
    }

    // Check if seat is already booked
    if (show.bookedSeats.includes(seatNumber)) {
      return res.status(400).json({ message: 'Seat already booked' });
    }

    // Create booking
    const booking = await Booking.create({
      userId: req.userId,
      showId,
      seatNumber,
      totalPrice
    });

    // Update show's booked seats
    await show.update({
      bookedSeats: [...show.bookedSeats, seatNumber]
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.userId },
      include: ['Show']
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    // Only manager can see all bookings
    if (req.userRole !== 'manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const bookings = await Booking.findAll({
      include: ['Show']
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all bookings' });
  }
};

exports.getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: ['Show']
    });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Only manager or booking owner can view details
    if (req.userRole !== 'manager' && booking.userId !== req.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking details' });
  }
};

exports.getSalesStats = async (req, res) => {
  try {
    // Only manager can view sales stats
    if (req.userRole !== 'manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const totalBookings = await Booking.count();
    const totalRevenue = await Booking.sum('totalPrice');
    const avgRevenue = await Booking.findAll({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('totalPrice')), 'avgRevenue']
      ]
    });

    res.json({
      totalBookings,
      totalRevenue,
      avgRevenue: avgRevenue[0].dataValues.avgRevenue
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales stats' });
  }
};

// Staff ticket management functions
exports.searchBookingByCode = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.query.code, {
      include: ['Show']
    });
    if (!booking) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error searching ticket' });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    await booking.update({ status });
    res.json({ message: 'Status updated successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket status' });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Booking.findAll({
      include: ['Show'],
      order: [['createdAt', 'DESC']]
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets' });
  }
};
