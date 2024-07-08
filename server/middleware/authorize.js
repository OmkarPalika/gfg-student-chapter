// middleware/authorize.js
const authorize = (roles) => {
  return (req, res, next) => {
    try {
      // Check if user's role is included in the roles array
      if (!roles.includes(req.user?.role)) {
        throw new Error('Unauthorized');
      }
      next(); // Proceed to the next middleware if authorized
    } catch (error) {
      console.error('Authorization error:', error.message);
      res.status(403).json({ error: 'Unauthorized' }); // Send 403 Forbidden for unauthorized access
    }
  };
};

export default authorize;
