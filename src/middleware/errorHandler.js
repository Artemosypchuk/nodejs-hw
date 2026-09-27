import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  const isDev = process.env.NODE_ENV === 'development';

  res.status(500).json({
    message: err.message || 'Internal Server Error',
    ...(isDev && { stack: err.stack }),
  });
};
