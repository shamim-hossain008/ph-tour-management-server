/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";

import { ZodError } from "zod";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ✅ Always define once so you can reuse it in any block
  const errorSources: { path: string; message: string }[] = [];
  let statusCode = 500;
  let message = `Something Went Wrong!!! ${err.message}`;

  // mongoose duplicate key error
  if (err.code === 11000) {
    const duplicate = err.message.match(/"([^"]*)"/);
    statusCode = 400;
    message = `${duplicate ? duplicate[1] : "Field"} already exists!!`;
    // Object id error / cast error
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid MongoDB ObjectID. Please provide a valid id";
  }
  // zorError
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = "ZodError";

    err.issues.forEach((issue: any) => {
      errorSources.push({
        path: issue.path.join("."),
        message: issue.message,
      });
    });
  }
  // Mongoose Validation error
  else if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors);
    const errorSources: any = [];

    errors.forEach((errorObject: any) =>
      errorSources.push({
        path: errorObject.path,
        message: errorObject.message,
      })
    );
    message = "Validation Error";
  }

  // AppError হলে trusted error
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  //  error (unexpected bug)
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};

// export const globalErrorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let statusCode = 500;
//   let message = `Something Went Wrong!!! ${err.message}`;

//   if (err instanceof AppError) {
//     statusCode = err.statusCode;
//     message = err.message;
//   } else if (err instanceof Error) {
//     statusCode = 500;
//     message = err.message;
//   }

//   res.status(statusCode).json({
//     success: false,
//     message,
//     error: {
//       statusCode,
//       message: err.message,
//     },

//     stack: envVars.NODE_ENV === "development" ? err.stack : null,
//   });
// };
