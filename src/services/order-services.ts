import { ObjectId } from "mongoose";
import { Order, IOrder } from "../models/order-model";
export class OrderServices {
  async createOrder(userId: ObjectId, productId: ObjectId): Promise<IOrder> {
    try {
      return Order.create({
        user: userId,
        product: productId,
      });
    } catch (error) {
      throw {
        message: error.message || "Internal Error Occured",
        status: error.status || 500,
      };
    }
  }

  async getOrderByUser(userId: ObjectId): Promise<IOrder[]> {
    try {
      return Order.find({ user: userId }).populate("product").populate("user","-password");
    } catch (error) {
      throw {
        message: error.message || "Internal Error Occured",
        status: error.status || 500,
      };
    }
  }

  async getAllOrders(): Promise<IOrder[]> {
    try {
      return Order.find({}).populate("product").populate("user","-password");
    } catch (error) {
      throw {
        message: error.message || "Internal Error Occured",
        status: error.status || 500,
      };
    }
  }
}
