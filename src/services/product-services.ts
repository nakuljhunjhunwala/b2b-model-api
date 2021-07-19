import { Product, IProduct } from "../models/product-model";

export class ProductServices {
  async createProduct(name:string,price:number): Promise<IProduct> {
    try {
      return await Product.create({
        name: name,
        price: price,
      });
    } catch (error) {
      throw {
        message: error.message || "Internal error Occured",
        status: error.status || 500,
      };
    }
  }

  async getAllProducts(): Promise<IProduct[]> {
    try {
      return await Product.find({});
    } catch (error) {
      throw {
        message: error.message || "Internal error Occured",
        status: error.status || 500,
      };
    }
  }
}
