import { Request, Response } from "express";
import { newOrderSchema } from "../validation/validation";
import { OrderServices } from "../services/order-services";

const orderServices = new OrderServices();

export class OrderController {
  async create(req: Request, res: Response): Promise<void> {
    const body = req.body;
    const validation = await newOrderSchema(body);

    if (validation?.error !== undefined) {
      res
        .status(global.httpStatus.BAD_REQUEST)
        .json({ message: validation.error.details[0].message });
    } else {
      try {
        // create a new order
        const order = await orderServices.createOrder(
          req.user._id,
          body.productId
        );
        res.status(global.httpStatus.OK).json(order);
      } catch (error) {
        res
          .status(error.status || global.httpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    }
  }

  async getOrderByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user._id;
      const order = await orderServices.getOrderByUser(userId);
      res.status(global.httpStatus.OK).json(order);
    } catch (error) {
      throw {
        status: error.status || global.httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || "Internal Error Occured",
      };
    }
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderServices.getAllOrders();
      res.status(global.httpStatus.OK).json(orders);
    } catch (error) {
      throw {
        status: error.status || global.httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || "Internal Error Occured",
      };
    }
  }
}
