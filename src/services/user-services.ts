import { User, IUser } from "../models/user-model";

export class UserServices {
  async createUser(user: IUser): Promise<IUser> {
    try {
      const userExist = await this.findUserByEmail(user.email);
      console.log(userExist);
      if (userExist) {
        throw {
          status: 409,
          message: "User alreadyy exist",
        };
      } else {
        console.log("reached here");

        return await User.create({
          email: user.email,
          password: user.password,
          name: user.name,
        });
      }
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error Ocurred while creating user",
      };
    }
  }

  async login(email: string, password: string): Promise<IUser> {
    try {
      const user: IUser = await User.findOne({ email: email });

      if (user) {
        if (user.password === password) {
          return user;
        } else {
          throw {
            status: 401,
            message: "Invalid password",
          };
        }
      } else {
        throw {
          status: 404,
          message: "Invalid email",
        };
      }
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error Ocurred while finding user",
      };
    }
  }

  async findUserByEmail(email: string): Promise<IUser> {
    try {
      return User.findOne({ email: email });
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error Ocurred while finding user",
      };
    }
  }
}
