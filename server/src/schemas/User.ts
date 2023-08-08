import { Schema, Document, model } from "mongoose";
import { IUser } from "./../types/IUser";

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },

  lastName: String,

  email: { type: String, required: true },

  password: { type: String, required: true },

  role: { type: String, required: true },

  profileImage: String,

  phone: { type: String, required: true },

  address: String,

  dateOfBirth: { type: Date, required: true },
});

export type IUserSchema = Document & IUser;

export default model<IUserSchema>("User", UserSchema);
