import { Request, Response } from "express";
import { db } from "../../../../db";
import { Role, UserServices } from "../../services/user.service";
const { UserModel } = db;
import bcrypt from "bcrypt";
import { EmailSender } from "../../../../util/email";

// @access public
// @desc creating new user
// @route /backend/v1/users/register
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, referralCode } = req.body;

    // lambda function
    const doesUserExists = async (): Promise<boolean> => {
      const user = await UserModel.findOne({
        $or: [{ username: username }, { email: email }],
      });
      if (user !== null) return true;
      return false;
    };

    //checking does user already exists
    if (await doesUserExists()) {
      const response = {
        status: "USER_ALREADY_EXIST",
        message: "Username or Email already in use",
        error: true,
      };
      return res.status(200).json(response);
    }

    // creating token, hashing password
    const token: string = UserServices.createToken();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // creating new user
    const { _id } = await UserModel.create({
      username: username,
      email: email,
      password: hash,
      token: token,
      isActivated: false,
      isGoogleAccount: false,
      isVerified: false,
      userType: Role.USER.toString(),
      avatarUrl:
        "https://axlegames-avatars.s3.ap-south-1.amazonaws.com/user.png",
    });

    // send verfication email
    const html: string = EmailSender.getEmailVerificationHTML(token);
    console.log("sending verification email to - " + email);
    await EmailSender.sendMail(
      "contact@renderverse.io",
      email,
      "Welcome to Axle games, Please Verify Your Email",
      "",
      html.toString()
    );

    const response = {
      message: "Successfully created",
      errorType: "NONE",
      error: false,
    };
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      message: err,
    });
  }
};
