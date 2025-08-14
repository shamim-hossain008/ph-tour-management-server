import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";

// Create user
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  // check user by email
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email already exists");
  }
  //  password hashing
  const hashedPassword = await bcryptjs.hash(password as string, 10);

  // const isPasswordMatch = await bcryptjs.compare(
  //   password as string,
  //   hashedPassword
  // );

  const authProvider: IAuthProvider = {
    provider: "credential",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

// get all user
const getAllUsers = async () => {
  const users = await User.find({});

  const totalUsers = await User.countDocuments();

  return {
    data: users,
    meta: {
      totalUsers,
    },
  };
};

export const UserService = {
  createUser,
  getAllUsers,
};

// route matching -> controller -> service -> model -> DB
