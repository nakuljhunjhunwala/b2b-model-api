declare namespace NodeJS {
  interface Global {
    httpStatus: any;
    // logger: any;
  }
}

declare namespace Express {
  interface Request {
    user: any;
  }
}
