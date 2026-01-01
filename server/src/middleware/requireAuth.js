/**
 * Authentication middleware
 * Ensures that req.user.id exists before allowing access to protected routes
 * In a production app, this would verify JWT tokens or session data
 */
const requireAuth = (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

export default requireAuth;

