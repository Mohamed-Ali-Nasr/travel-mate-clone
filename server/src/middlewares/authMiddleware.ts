import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import createHttpError from "http-errors";

export interface IRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    JWT.verify(token, JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(404).json({
          message: error,
          error,
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        req.userId = (decode as any).id;
        if (!req.userId) {
          throw createHttpError(401, "Invalid token.");
        }
        next();
      }
    });
  } else {
    next(createHttpError(401, "User not authenticated"));
  }
};
