import { Request, Response } from "express";
import { newUserSchema, loginUserSchema } from "../validation/validation";
import hashPassword from "../validation/hashPassword";
import { createToken } from "../token-manager/token-manager";
import { UserServices } from "../services/user-services";

const userServices = new UserServices();
export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    const body = req.body;
    const validation = await newUserSchema(body);

    if (validation?.error !== undefined) {
      res
        .status(global.httpStatus.BAD_REQUEST)
        .json({ message: validation.error.details[0].message });
    } else {
      const userPassword = hashPassword(body.password);
      try {
        const newUser = {
          name: body.name,
          email: body.email,
          password: userPassword,
        };
        const user = await userServices.createUser(newUser);
        const token = await createToken(user);
        res
          .header("auth-token", token)
          .status(global.httpStatus.OK)
          .json({ authToken: token });
      } catch (err) {
        console.log(err);

        res.status(err.status || global.httpStatus.BAD_REQUEST).json({
          message: err.message || "Error While creating user",
        });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const body = req.body;
    const validation = await loginUserSchema(body);

    if (validation?.error !== undefined) {
      res
        .status(global.httpStatus.BAD_REQUEST)
        .json({ message: validation.error.details[0].message });
    } else {
      const userPassword = hashPassword(body.password);

      try {
        const user = await userServices.login(body.email, userPassword);
        const token = await createToken(user);
        res
          .header("auth-token", token)
          .status(global.httpStatus.OK)
          .json({ authToken: token });
      } catch (err) {
        res.status(err.status || global.httpStatus.BAD_REQUEST).json({
          message: err.message || "Error While Logging In",
        });
      }
    }
  }
}
