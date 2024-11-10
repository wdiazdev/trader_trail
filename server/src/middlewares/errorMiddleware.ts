import { Request, Response, NextFunction } from "express"

interface CustomError extends Error {
  statusCode?: number
  status?: string
}

const errorMiddleware = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  // Set default status code and status if not provided by the error
  error.statusCode = error.statusCode || 500
  error.status = error.status || "error"

  // Send response with error details
  res.status(error.statusCode).json({
    success: false,
    status: error.status,
    message: error.message,
  })
}

export default errorMiddleware
