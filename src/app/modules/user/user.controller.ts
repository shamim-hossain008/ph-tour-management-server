import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(httpStatus.BAD_REQUEST, "fake error");

    const user = await UserService.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "User created Successfully",
      user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const UserControllers = {
  createUser,
};
