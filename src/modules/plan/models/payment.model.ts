import mongoose, { Schema, Model, Document } from "mongoose";

export interface ReferralInterface {
  referralCode: string;
}

export interface ReferralDoc extends Document, ReferralInterface {}

const referralSchema = new Schema({
  referralCode: {
    type: Schema.Types.String,
    required: true,
  },
});

export const REFERRAL = "REFERRAL";

export const ReferralModel: Model<ReferralDoc> = mongoose.model<ReferralDoc>(
  REFERRAL,
  referralSchema
);
