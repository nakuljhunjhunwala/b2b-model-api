import { Request, Response, NextFunction } from "express";
// import { IAuthToken } from "../interfaces/interfaces";
import { verifyToken } from "../token-manager/token-manager";

export async function verify(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req?.header("auth-token");
    if (!token) {
      res
        .status(global.httpStatus.UNAUTHORIZED)
        .json({ message: "Access Denied" });
    } else {
      const verified: object | string = await verifyToken(token);
      const verifiedObject =
        typeof verified === "object" ? verified : JSON.parse(verified);
      if (verifiedObject) {
        req.user = verified;
      } else {
        res
          .status(global.httpStatus.BAD_REQUEST)
          .json({ message: "Invalid Token" });
      }

      next();
    }
  } catch (error) {
    res
      .status(global.httpStatus.BAD_REQUEST)
      .json({ message: error.message || "Invalid Token" });
  }
}

export async function adminVerify(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req?.header("auth-token");
    if (!token) {
      res
        .status(global.httpStatus.UNAUTHORIZED)
        .json({ message: "Access Denied" });
    } else {
      const verified: object | string = await verifyToken(token);
      const verifiedObject =
        typeof verified === "object" ? verified : JSON.parse(verified);

      if (verifiedObject) {
        if (verifiedObject.adminAccess) {
          req.user = verified;
        } else {
          res
            .status(global.httpStatus.BAD_REQUEST)
            .json({ message: "Admin Access Required" });
        }
      } else {
        res
          .status(global.httpStatus.BAD_REQUEST)
          .json({ message: "Invalid Token" });
      }
      next();
    }
  } catch (error) {
    res
      .status(global.httpStatus.BAD_REQUEST)
      .json({ message: error.message || "Invalid Token" });
  }
}
