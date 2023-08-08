import { NextFunction, Response } from "express";
import Place from "../schemas/Place";
import User from "../schemas/User";
import { IReview } from "../types/IReview";
import { IRequest } from "../middlewares/authMiddleware";
import { IUser } from "../types/IUser";
import createHttpError from "http-errors";

export const putReview = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;

  const { rating, comment, placeId } = req.body;

  if (!placeId || !userId || !rating) {
    throw createHttpError(400, "Invalid data.");
  }

  try {
    const place = await Place.findById(placeId).populate("reviews.user");

    if (!place) {
      throw createHttpError(404, "Place not found.");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw createHttpError(404, "User not found.");
    }

    const newReview: IReview = {
      _id: undefined!,
      user: userId,
      rating: rating,
      comment: comment,
    };

    const review = await Place.findOne({ "reviews.user": userId });

    if (review) {
      place.reviews = place.reviews.filter((item) => {
        const user = item.user as IUser;
        return user._id.toString() !== userId.toString();
      });

      place.reviews.push(newReview);
    } else {
      place.reviews.push(newReview);
    }

    await place.save();
    res.status(201).json({ message: "Review created." });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;

  const { placeId } = req.body;

  if (!placeId || !userId) {
    throw createHttpError(400, "Invalid data.");
  }

  try {
    const place = await Place.findById(placeId).populate("reviews.user");

    if (!place) {
      throw createHttpError(404, "Place not found.");
    }

    place.reviews = place.reviews.filter((item) => {
      const user = item.user as IUser;
      return user._id.toString() !== userId.toString();
    });

    await place.save();
    res.status(200).json({ message: "Review deleted." });
  } catch (error) {
    next(error);
  }
};
