// authentication-service/src/middleware/errorHandler.js

function errorHandler(err, req, res, next) {
  console.error('Auth Service Error:', err.message);
  
  const statusCode = err.status || 500;
  const message = err.message || 'An unexpected error occurred in the Authentication Service';

  return res.status(statusCode).json({
    error: true,
    message
  });
}

export { errorHandler };