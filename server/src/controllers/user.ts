import { NextFunction, Response } from "express";
import User from "../schemas/User";
import bcrypt from "bcryptjs";
import { IRequest } from "../middlewares/authMiddleware";
import Image from "../schemas/Image";
import createHttpError from "http-errors";

export const updateProfile = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const image = req.file;
  const { name, password } = JSON.parse(req.body.profile);

  if (!image && !name && !password) {
    throw createHttpError(400, "Missing data");
  }

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    let imageName = undefined;
    if (image) {
      imageName = Date.now() + image.originalname;

      const newImage = new Image({
        name: imageName,
        img: {
          data: image.buffer,
          contentType: image.mimetype,
        },
      });
      await newImage.save();
      user.profileImage = imageName;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (name) {
      user.firstName = name;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    next(error);
  }
};
