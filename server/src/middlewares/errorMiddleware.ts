import { Request, Response, NextFunction } from "express"

interface CustomError extends Error {
  statusCode?: number
  status?: string
  details?: any
}

const errorMiddleware = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  const isProduction = process.env.NODE_ENV === "production"

  res.status(error.statusCode || 500).json({
    success: false,
    status: error.status,
    message: error.message,
    ...(isProduction ? {} : { stack: error.stack, details: error.details }),
  })
}

export default errorMiddleware
