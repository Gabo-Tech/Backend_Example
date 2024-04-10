// error.middleware.ts
import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  status: 'error';
  message: string;
}

// This middleware function handles errors that occur in the application.
// It sends an error response with the error message and the appropriate status code.
export default function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // In a real-world application, you might also want to log these errors.
  
  // If the headers have already been sent, we must delegate to the default Express error handler
  if (res.headersSent) {
    return next(error);
  }

  const status = error.statusCode || error.status || 500;
  const message = error.message || 'An unexpected error occurred';

  const errorResponse: ErrorResponse = {
    status: 'error',
    message: message,
  };

  res.status(status).send(errorResponse);
}
