import { IUser } from "./user.interface";
import { User } from "./user.model";

// Create user
const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;

  const user = await User.create({
    name,
    email,
  });
  return user;
};

// get all user
const getAllUsers = async () => {
  const users = await User.find({});

  return users;
};

export const UserService = {
  createUser,
  getAllUsers,
};

// route matching -> controller -> service -> model -> DB
