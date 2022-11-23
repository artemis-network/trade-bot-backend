// @desc forgot-password request
// @route /backend/v1/users/forgot-password-request

import { Request, Response } from "express";

import { db } from "../../../../db";
import { EmailSender } from "../../../../util/email";
import { UserServices } from "../../services/user.service";
const { UserModel } = db;

// @access public
export const forgotPasswordSendRequest = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;
    const setNGetToken = async () => {
      const token = UserServices.createToken();
      await UserModel.findOneAndUpdate(
        { email: email },
        {
          $set: { token: token },
        }
      );
      return token;
    };
    const token = await setNGetToken();
    const html: string = EmailSender.getForgotPasswordHTML(token);
    console.log("sending forgot password email to - " + email);
    await EmailSender.sendMail(
      "contact@renderverse.io",
      email,
      "Password Change",
      "",
      html.toString()
    );
    return res.status(200).json({ isEmailSend: true });
  } catch (err) {
    return res.status(200).json({
      isEmailSend: false,
      message: "user does not exists",
    });
  }
};
