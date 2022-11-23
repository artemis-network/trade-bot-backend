// @desc validate user email by token
// @route /backend/v1/users/change-password/:token
// @param token : string

import { Request, Response } from "express";
import { UserServices } from "../../services/user.service";

import { db } from "../../../../db";
const { UserModel } = db;

import bcrypt from "bcrypt";

// @access public
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const isValidToken = async (): Promise<boolean> => {
      const query = await UserModel.findOne({ token: token });
      if (query !== null) return true;
      return false;
    };
    const isValid = await isValidToken();
    if (isValid) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = await UserModel.findOne({ token: token });
      await user?.updateOne({ $set: { password: hash } });
      const newToken = UserServices.createToken();
      await UserModel.findOneAndUpdate(
        { token: token },
        {
          $set: { token: newToken },
        }
      );
      return res.status(200).json({ isPasswordChanged: true });
    }
    return res.status(200).json({ isPasswordChanged: false });
  } catch (err) {
    return res.status(500).json(err);
  }
};
