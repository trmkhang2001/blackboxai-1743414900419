const { Booking, Show } = require('../models');

exports.createBooking = async (req, res) => {
  try {
    const { showId, seatNumber, totalPrice } = req.body;
    const booking = await Booking.create({
      userId: req.userId,
      showId,
      seatNumber,
      totalPrice
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