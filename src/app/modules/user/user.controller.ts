import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
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
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "User Created Successfully",
      user,
    });
  }
);

// Get All user
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await UserService.getAllUsers();

  res.status(httpStatus.OK).json({
    success: true,
    message: "All Users Retrieved Successfully",
    data: users,
  });
};

export const UserControllers = {
  createUser,
  getAllUsers,
};
