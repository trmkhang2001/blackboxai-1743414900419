const { Sequelize } = require('sequelize');
const sequelize = require('../db');

// Import models
const User = require('./User');
const Movie = require('./Movie');
const Show = require('./Show');
const Booking = require('./Booking');

// Define associations
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Movie.hasMany(Show, { foreignKey: 'movieId' });
Show.belongsTo(Movie, { foreignKey: 'movieId' });

Show.hasMany(Booking, { foreignKey: 'showId' });
Booking.belongsTo(Show, { foreignKey: 'showId' });

module.exports = {
  sequelize,
  User,
  Movie,
  Show,
  Booking
};