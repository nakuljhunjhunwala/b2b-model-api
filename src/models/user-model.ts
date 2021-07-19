import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: 8,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

export const User = mongoose.model("User", userSchema);

export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId ;
  name?: string;
  email?: string;
  password?: string;
  admin?: boolean ;
}
