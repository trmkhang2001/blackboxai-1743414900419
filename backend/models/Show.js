const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Show = sequelize.define('Show', {
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  theater: {
    type: DataTypes.STRING,
    allowNull: false
  },
  showTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Show;