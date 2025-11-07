const { verifyToken } = require('../utils/jwt');
const Admin = require('../models/admin/Admin');
const Student = require('../models/student/Student');
const Faculty = require('../models/faculty/Faculty');

const protect = (roles = []) => {
  return async (req, res, next) => {
    try {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
      }

      const decoded = verifyToken(token);
      
      let user;
      if (decoded.role === 'admin' || decoded.role === 'superadmin') {
        user = await Admin.findById(decoded.id).select('-password');
      } else if (decoded.role === 'student') {
        user = await Student.findById(decoded.id).select('-password');
      } else if (decoded.role === 'faculty') {
        user = await Faculty.findById(decoded.id).select('-password');
      }

      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ success: false, message: 'Not authorized for this resource' });
      }

      req.user = user;
      req.userRole = decoded.role;
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  };
};

module.exports = { protect };
