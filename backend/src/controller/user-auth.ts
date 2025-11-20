import { NextFunction, Request, Response } from "express";
import { AccountLoginScheam, AccountCreateScheam } from "../utils/index";
import bcrypt, { genSalt } from "bcrypt";
import { UserModel } from "../database/database-scheam";
import jwt from "jsonwebtoken";

export const CreateAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const account_vaildated_data = AccountCreateScheam.parse(req.body);
    const { username, email, password } = account_vaildated_data;
    // check user is  already exist
    const isuser_exits = await UserModel.findOne({ email });
    if (isuser_exits) {
      return res.status(400).json({
        status: false,
        message: "Account already exist with this Email !",
      });
    }
    const SALT = await genSalt(10);
    const password_hasing = await bcrypt.hash(password, SALT);
    // save to db
    const user_account = await new UserModel({
      username,
      password: password_hasing,
      email,
    });
    user_account.save();
    res.status(201).json({
      status: true,
      message: "Account Create Succesfully",
      data: {
        username,
        email,
      },
    });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    next(error);
  }
};

// Login
export const LoginAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const account_vaildated_data = AccountLoginScheam.parse(req.body);
    const { email, password } = account_vaildated_data;

    //check user first
    const isuser_exits = await UserModel.findOne({ email });
    if (!isuser_exits) {
      return res.status(400).json({
        status: false,
        message: "Account  not found please create account first !",
      });
    }
    //
    const is_passwordMatch = await bcrypt.compare(password, isuser_exits.password);
    if (!is_passwordMatch) {
      return res.status(404).json({
        status: false,
        message: "Incorrect Password ",
      });
    }
    // token
    if (!process.env.JWT_TOKEN) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    const token = jwt.sign(
      { _id: isuser_exits?._id, email: isuser_exits?.email },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      status: true,
      message: "Login to account ",
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    next(error);
  }
};
