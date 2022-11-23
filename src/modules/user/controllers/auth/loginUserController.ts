import { Request, Response } from "express";
import { db, UserDoc } from "../../../../db";
import { JWT } from "../../../../util/jwt";
const { UserModel } = db;
import bcrypt from "bcrypt";

// @desc app login
// @route /backend/v1/users/login
// @access public
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const doesUserExists = async (): Promise<UserDoc> => {
      const user = await UserModel.findOne({
        $or: [{ username: username }, { email: username }],
      });
      if (user !== null) return user;
      throw new Error("");
    };
    const user = await doesUserExists();
    if (user?.isGoogleAccount) {
      const response = {
        error: true,
        message: "Sign in with Google",
        errorType: "UNAUTHORIZED_ACCESS",
      };
      return res.status(200).json(response);
    }
    const isAuthenticatedUser = bcrypt.compareSync(password, user?.password);
    if (!isAuthenticatedUser) {
      const response = {
        error: true,
        message: "invalid username or password",
        errorType: "INVALID_CRENDENTAILS",
      };
      return res.status(200).json(response);
    }

    if (!user?.isVerified) {
      const response = {
        error: true,
        message: "verify email, to login",
        errorType: "UNAUTHORIZED_EMAIL",
      };
      return res.status(200).json(response);
    }

    const token: string = JWT.generateJWTToken(user?._id);
    const response = {
      error: false,
      accessToken: token,
      username: username,
      name: user.fullName,
      userId: user._id,
      errorType: "NONE",
    };
    return res.status(200).json(response);
  } catch (err: any) {
    const response = {
      errorType: "INVALID_CREDENTIALS",
      message: "username or email does not exists",
      error: true,
    };
    return res.status(200).json(response);
  }
};
