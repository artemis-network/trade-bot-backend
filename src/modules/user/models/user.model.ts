import mongoose, { Schema, Model, Document } from "mongoose";

export interface UserInterface {
  username: string;
  email: string;
  password: string;
  isGoogleAccount: Boolean;
  isVerified: Boolean;
  isActivated: Boolean;
  token: string;
  userType: string;
  fullName: string;
  avatarUrl: string;
  createdOn: Date;
}

export interface UserDoc extends UserInterface, Document {}

const userSchema = new Schema({
  username: { type: Schema.Types.String, required: true, unique: true },
  email: { type: Schema.Types.String, required: true, unique: true },
  password: { type: Schema.Types.String, requried: true },
  referralCode: { type: Schema.Types.String },
  createdOn: { type: Schema.Types.Date, default: new Date(Date.now()) },
  isGoogleAccount: { type: Schema.Types.Boolean, required: true },
  isVerified: { type: Schema.Types.Boolean, required: true },
  isActivated: { type: Schema.Types.Boolean, required: true },
  token: { type: Schema.Types.String },
  fullName: { type: Schema.Types.String },
  avatarUrl: { type: Schema.Types.String },
  userType: {
    type: Schema.Types.String,
    enum: ["ADMIN", "USER", "GUEST"],
    default: "USER",
  },
});
export const USER = "USER";

export const UserModel: Model<UserDoc> = mongoose.model<UserDoc>(
  USER,
  userSchema
);
