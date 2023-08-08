import express from "express";
import { getImage } from "../controllers/image";

const imageRouter = express.Router();

imageRouter.get("/:imageName", getImage);

export default imageRouter;
