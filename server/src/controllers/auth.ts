import { NextFunction, RequestHandler, Response } from "express";
import User from "../schemas/User";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IRequest } from "../middlewares/authMiddleware";
import { getUserDTO } from "../utils/dtoUtils";
import { JWT_SECRET } from "../config";
import createHttpError from "http-errors";

interface RegisterBody {
  email: string;
  password: string;
  name: string;
  phone: number;
  dateOfBirth: Date;
}

export const register: RequestHandler<
  unknown,
  unknown,
  RegisterBody,
  unknown
> = async (req, res, next) => {
  const { name, phone, dateOfBirth, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw createHttpError(
        400,
        "User already exists. Please choose a different one or log in instead."
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName: name,
      email,
      phone,
      dateOfBirth,
      role: "user",
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created." });
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  email: string;
  password: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .select("+password +email")
      .exec();

    if (!user) {
      throw createHttpError(400, "Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw createHttpError(400, "Invalid email or password.");
    }

    const payload = {
      id: user._id,
    };

    const token = sign(payload, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, user: getUserDTO(user) });
  } catch (error) {
    next(error);
  }
};

export const authenticate = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw createHttpError(404, "User not found.");
    }

    res.status(200).json({ ...getUserDTO(user), email: user.email });
  } catch (error) {
    next(error);
  }
};
