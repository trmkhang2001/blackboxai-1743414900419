const jwt = require('jsonwebtoken');

module.exports = (requiredRole) => {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userRole = decoded.role; // Add role to request object
      
      // Check if user has required role or higher
      const roleHierarchy = ['user', 'staff', 'manager'];
      if (roleHierarchy.indexOf(decoded.role) < roleHierarchy.indexOf(requiredRole)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};