import { NextFunction, Request, Response } from "express";
import { JWT } from "../util/jwt";

import { UserModel } from "../modules/user/models/user.model";

enum TokenAuthStatus {
  UNAUTHORIZED = "UNAUTHORIZED",
  AUTHORIZED = "AUTHORIZED",
}

export const tokenAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.headers.authorization || "";
    const jwt = JWT.decodeJWTToken(auth);
    const now = new Date(Date.now()).getTime();
    const time = jwt.expires - now;
    const user = await UserModel.findById(jwt.session.userId);
    if (user !== null) return next();
    return res.status(200).json(TokenAuthStatus.UNAUTHORIZED);
  } catch (error) {
    return res.status(200).json(TokenAuthStatus.UNAUTHORIZED);
  }
};
