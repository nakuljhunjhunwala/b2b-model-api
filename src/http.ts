import dotenv = require("dotenv");
import * as bodyParser from "body-parser";
import express = require("express");
import { ValidationError } from "@hapi/joi";

dotenv.config();

import { globalSettings } from "./settings/globals";
import { configureRoutes } from "./routes";
import { LoggerContainer } from "./settings/logger";
import { BaseError } from "./responses/base-response";
import { errorCodes } from "./settings/error-codes";
import mongoose from "mongoose";

const app: express.Application = express();
app.enable("etag");
app.set("etag", "strong");

const logger = LoggerContainer.instance.getLogger("HTTP");
const normalizePort: (value: string | number) => number = (
  value: string | number
) => {
  const port = Number(value);
  if (isNaN(port)) {
    logger.error("Port must have numeric value");
    process.exit(1);
  }
  if (port > 0) return port;
  logger.error("Invalid port number");
  process.exit(1);
};

function run(): void {
  globalSettings();

  app.use(bodyParser.json({ limit: "5mb" }));
  app.use(bodyParser.json({ type: "application/*+json", limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: "5mb",
    })
  );
  configureRoutes(app);
  app.use(
    async (
      err: BaseError & ValidationError,
      req: express.Request,
      res: express.Response
    ) => {
      if (err.isJoi) {
        logger.info(err.details[0]);
        err.status = 400;
        err.message = err.details[0].message;
        err.code = errorCodes.BAD_REQUEST.code;
        delete err.details;
      }
      // eslint-disable-next-line no-constant-condition
      if (!err.status || 500) {
        return res.status(err.status || 500).json({
          name: err.name || "Error",
          code: err.code || "UNKNOWN",
          status: err.status || 500,
          message: "Something went wrong",
          details: null,
        });
      }
      res.status(err.status).json({
        name: err.name || "Error",
        code: err.code || "UNKNOWN",
        status: err.status || 500,
        message: err.message,
        details: err.details || null,
      });
    }
  );

  const httpPort: number = normalizePort(process.env.PORT || 8888);
  app.listen(httpPort, "0.0.0.0", async () => {
    mongoose.connect(
      process.env.MONGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );
    logger.info("Platform configuration server started", { port: httpPort });
  });
}

run();
