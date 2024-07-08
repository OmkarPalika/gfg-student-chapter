import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), 'server', '.env') });

const auth = async (req, res, next) => {
  try {
    let token = req.header('Authorization')?.replace('Bearer ', '');

    // If token is not in header, check cookies
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    
    if (!token) {
      return res.status(401).json({ error: 'No authentication token, access denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      if (user.approvalStatus !== 'approved') {
        return res.status(403).json({ error: 'User not approved' });
      }

      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token is not valid' });
    }
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export default auth;