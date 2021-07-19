import jwt from "jsonwebtoken";

export function createToken(result: any): Promise<string> {
  return new Promise((resolve) => {
    const token = jwt.sign(
      { _id: result._id, login: true ,adminAccess: result.admin},
      process.env.SECRET,
      {
        expiresIn: "5m",
      }
    );
    resolve(token);
  });
}

export function resetPasswordToken(userId: string): Promise<string> {
  return new Promise((resolve) => {
    const token = jwt.sign({ _id: userId }, process.env.SECRET, {
      expiresIn: "10m",
    });
    resolve(token);
  });
}

export async function verifyToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const object = jwt.verify(token, process.env.SECRET);
      resolve(object);
    } catch {
      reject(new Error("Invalid Token"));
    }
  });
}
