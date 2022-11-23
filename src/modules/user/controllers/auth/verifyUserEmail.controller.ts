import { Request, Response } from "express";
import { db } from "../../../../db";
const { UserModel } = db;

export const verifyUserEmail = async (req: Request, res: Response) => {
  try {
    const { username, token } = req.body;
    const user = await UserModel.findOne({ username: username });
    if (!user?.$isEmpty) {
      if (user?.token === token) {
        user?.updateOne({
          $set: {
            token: "",
            isVerified: true,
          },
        });
        await user?.save();
        const result = { message: "email verified", error: false };
        res.status(200).json(result);
      }
      const result = { message: "invalid token", error: true };
      res.status(200).json(result);
    }
    const result = { message: "user does not exits", error: true };
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
};
