// middleware/authorize.js
const authorize = (roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user?.role)) {
        throw new Error('Unauthorized');
      }
      next();
    } catch (error) {
      console.error('Authorization error:', error.message);
      res.status(403).json({ error: 'Unauthorized' });
    }
  };
};

export default authorize;
