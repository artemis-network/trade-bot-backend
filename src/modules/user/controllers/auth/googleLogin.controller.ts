import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_OAUTH_CLIENT } from "../../../../config";

import { db, UserDoc } from "../../../../db";
import { JWT } from "../../../../util/jwt";
import { Role, SIGNUP_REWARD } from "../../services/user.service";
const { UserModel } = db;

const client: any = new OAuth2Client(GOOGLE_OAUTH_CLIENT);

// @access public
// @desc google-login for web app
// @route /backend/v1/users/google-login
export const googleLogin = async (req: Request, res: Response) => {
  const { token, name, avatarUrl } = req.body;
  console.log(req.body);
  const verifyGoogleTokenAndFetchCredentials = async () => {
    const { payload } = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_OAUTH_CLIENT,
    });
    const { email, email_verified } = payload;
    console.log(req.body);
    const username = email.split("@")[0];
    return { email: email, username: username, emailVerified: email_verified };
  };
  const { username, email, emailVerified } =
    await verifyGoogleTokenAndFetchCredentials();

  if (emailVerified) {
    try {
      const doesUserExists = async (): Promise<boolean> => {
        const user = await UserModel.findOne({
          $or: [{ username: username }, { email: email }],
        });
        if (user !== null) return true;
        return false;
      };
      const isExists = await doesUserExists();
      if (isExists) {
        const user = await UserModel.findOne({ email: email });
        if (user?.isGoogleAccount === false) {
          const response = {
            error: true,
            message: "It's not a google account, SignIn with Email & Password",
            errorType: "UNAUTHORIZED_ACCESS",
          };
          return res.status(200).json(response);
        }

        const token: string = JWT.generateJWTToken(user?._id);
        const response = {
          error: false,
          errorType: "NONE",
          username: username,
          userId: user?._id,
          name: user?.fullName,
          accessToken: token,
        };
        return res.status(200).json(response);
      }
      const { _id, fullName }: UserDoc = await UserModel.create({
        fullName: name,
        username: username,
        avatarUrl:
          avatarUrl ||
          "https://axlegames-avatars.s3.ap-south-1.amazonaws.com/user.png",
        email: email,
        password: "",
        token: "",
        isActivated: false,
        isGoogleAccount: true,
        isVerified: false,
        userType: Role.USER.toString(),
      });
      console.log(fullName);
      const token: string = JWT.generateJWTToken(_id);

      const response = {
        error: false,
        errorType: "NONE",
        username: username,
        userId: _id,
        accessToken: token,
        name: fullName,
      };
      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
      return res.status(200).json({ message: err });
    }
  }
};
