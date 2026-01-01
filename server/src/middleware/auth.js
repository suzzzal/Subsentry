/**
 * Authentication middleware - Development/Testing version
 * 
 * In production, this should be replaced with proper JWT verification
 * (e.g., using Clerk's authentication middleware)
 * 
 * For development/testing, you can pass userId in the Authorization header
 * as: Authorization: Bearer <userId>
 * 
 * Example: Authorization: Bearer user123
 */
const auth = (req, res, next) => {
  // In production, replace this with proper JWT verification
  // For Clerk integration, use Clerk's middleware to verify JWT tokens
  
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const userId = authHeader.substring(7); // Extract userId after "Bearer "
    
    // Set user in request object
    req.user = {
      id: userId,
    };
  }
  
  // If no auth header, req.user will be undefined
  // The requireAuth middleware will handle the 401 response
  
  next();
};

export default auth;

