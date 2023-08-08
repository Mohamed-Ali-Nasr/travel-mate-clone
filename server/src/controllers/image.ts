import { IRequest } from "../middlewares/authMiddleware";
import { NextFunction, Response } from "express";
import Image from "../schemas/Image";
import createHttpError from "http-errors";

export const uploadImage = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { file } = req;
    if (!file) {
      throw createHttpError(400, "No file uploaded.");
    }
    const newImage = new Image({
      name: Date.now() + file.originalname,
      img: {
        data: file.buffer,
        contentType: file.mimetype,
      },
    });
    await newImage.save();
    res.status(201).json({ message: "Image uploaded.", newImage });
  } catch (error) {
    next(error);
  }
};

export const getImage = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { imageName } = req.params;

  if (!imageName) {
    throw createHttpError(400, "No image requested.");
  }

  try {
    const image = await Image.findOne({ name: imageName });
    if (!image) {
      throw createHttpError(400, "Image not found.");
    }
    res.set("Content-Type", image.img.contentType.toString());
    res.status(200).send(Buffer.from(image.img.data.buffer));
  } catch (error) {
    next(error);
  }
};
