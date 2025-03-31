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
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50
  },
  bookedSeats: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  seatMap: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {
      rows: 5,
      cols: 10,
      layout: Array(5).fill().map(() => Array(10).fill(false))
    }
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Show;