import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { catchAsync } from "../../utils/catchAsync";
import { verifyToken } from "../../utils/jwt";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

// create new user
// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     throw new AppError(httpStatus.BAD_REQUEST, "fake error");

//     const user = await UserService.createUser(req.body);

//     res.status(httpStatus.CREATED).json({
//       message: "User created Successfully",
//       user,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     console.log(err);
//     next(err);
//   }
// };

const createUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response,next: NextFunction) => {
    const user = await UserService.createUser(req.body);

    // res.status(httpStatus.CREATED).json({
    //   message: "User Created Successfully",
    //   user,
    // });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  }
);
// update user
const updateUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const token = req.headers.authorization;
    const verifiedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;
    const payload = req.body;
    const user = await UserService.updatedUser(userId, payload, verifiedToken);

    // res.status(httpStatus.CREATED).json({
    //   message: "User Created Successfully",
    //   user,
    // });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Updated Successfully",
      data: user,
    });
  }
);

// Get All user
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserService.getAllUsers();

  // res.status(httpStatus.OK).json({
  //   success: true,
  //   message: ,
  //   data: users,
  // });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "All Users Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
};

export const UserControllers = {
  createUser,
  getAllUsers,
  updateUser,
};
