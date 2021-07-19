/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Joi, { ValidationResult } from "@hapi/joi";

export function newUserSchema(data): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const Schema = Joi.object({
      name: Joi.string().required().min(3),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const returnObject = Schema.validate(data);
    resolve(returnObject);
  });
}

export function loginUserSchema(data): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const Schema = Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const returnObject = Schema.validate(data);
    resolve(returnObject);
  });
}

export function newProductSchema(data): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const Schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
    });

    const returnObject = Schema.validate(data);
    resolve(returnObject);
  });
}


export function newOrderSchema(data): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const Schema = Joi.object({
      productId: Joi.string().required(),
    });

    const returnObject = Schema.validate(data);
    resolve(returnObject);
  });
}
