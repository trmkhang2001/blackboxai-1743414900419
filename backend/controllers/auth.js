const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

// Register new user
exports.register = async (req, res) => {
  const { email, password, role = 'user' } = req.body;
  try {
    // Only manager can create staff/manager accounts
    if (role !== 'user' && (!req.user || req.user.role !== 'manager')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ 
      id: user.id,
      role: user.role 
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).json({ 
      message: 'Logged in successfully',
      role: user.role 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};
