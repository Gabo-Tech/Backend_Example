// auth.middleware.ts
import { middleware, errorHandler } from 'supertokens-node/framework/express';
import express from 'express';
import { Request, Response, NextFunction } from 'express';

// Error handling for errors thrown by SuperTokens
export const superTokensErrorHandler = errorHandler();

// Middleware that ensures session verification
export const verifySession = middleware();

// Custom middleware to protect routes
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // superTokens middleware will check if the session is valid
    verifySession(req, res, (err: any) => {
        if (err) {
            // Handle error or pass it along to your custom error handler
            next(err);
        } else {
            // Session is verified, move to next middleware or route handler
            next();
        }
    });
}

// Usage in Express app would be like this:
// app.use('/protectedRoute', authMiddleware, (req, res) => { ... });

// You would also use the SuperTokens error handler in your Express setup like this:
// app.use(superTokensErrorHandler);
