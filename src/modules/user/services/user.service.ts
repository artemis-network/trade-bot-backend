import crypto from "crypto";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

export class UserServices {
  static createToken = (): string => {
    try {
      return crypto.randomBytes(32).toString("hex");
    } catch (e) {
      throw new Error("Error");
    }
  };
}

export const SIGNUP_REWARD = 7000;
export const REFERRAL_REWARD = 500;
