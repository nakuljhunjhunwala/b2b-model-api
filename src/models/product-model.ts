import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Product = mongoose.model("Product", userSchema);

export interface IProduct {
  _id?: mongoose.Schema.Types.ObjectId ;
  name?: string;
  price?: number;
}
