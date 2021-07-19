import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
});

export const Order = mongoose.model("Order", userSchema);

export interface IOrder {
  _id?: mongoose.Schema.Types.ObjectId ;
  user?: mongoose.Schema.Types.ObjectId ;
  order?: mongoose.Schema.Types.ObjectId ;
}
