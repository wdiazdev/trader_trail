import { Request, Response, NextFunction } from "express"
export interface CustomRequest extends Request {
  user?: {
    userId: string
    access_token: string
  }
}

export type AsyncRequestHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => Promise<any>
