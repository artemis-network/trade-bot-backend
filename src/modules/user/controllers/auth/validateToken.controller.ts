import { Request, Response } from "express";
import { db } from "../../../../db";
const { UserModel } = db;

// @access public
// @desc validate user email by token
// @route /backend/v1/users/validate/:token
// @param token : string
export const validateToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const isValidToken = async (): Promise<boolean> => {
      const query = await UserModel.findOne({ token: token });
      if (query !== null) return true;
      return false;
    };
    const isValid = await isValidToken();
    await UserModel.findOneAndUpdate(
      { token: token },
      {
        $set: {
          isVerified: isValid,
        },
      }
    );
    return res.status(200).json({ isVerified: isValid });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      isVerified: false,
      message: "user does not exists",
    });
  }
};
