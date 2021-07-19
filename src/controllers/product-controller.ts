import { Request, Response } from "express";
import { newProductSchema } from "../validation/validation";
import { ProductServices } from "../services/product-services";

const productServices = new ProductServices();

export class ProductController {
  async create(req: Request, res: Response): Promise<void> {
    const body = req.body;
    const validation = await newProductSchema(body);

    if (validation?.error !== undefined) {
      res
        .status(global.httpStatus.BAD_REQUEST)
        .json({ message: validation.error.details[0].message });
    } else {
      try {
        const product = await productServices.createProduct(body.name, body.price);
        res.status(global.httpStatus.OK).json(product);
      } catch (error) {
        res.status(error.status || global.httpStatus.BAD_REQUEST).json({ message: error.message });
      }
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await productServices.getAllProducts();
      res.status(global.httpStatus.OK).json(products);
    } catch (error) {
      res.status(error.status || global.httpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}
