import { Schema, Document, model } from "mongoose";
import { IImage } from "../types/IImage";

const imageSchema: Schema = new Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

export type IImageSchema = Document & IImage;

export default model<IImageSchema>("Image", imageSchema);
