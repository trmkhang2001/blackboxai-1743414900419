const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  posterUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 120
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
});

module.exports = Movie;