import { Request, Response, NextFunction } from 'express';

export class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err instanceof HttpError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  if (status === 500) {
    console.error('🔥 Server Error:', err);
  }

  res.status(status).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}
