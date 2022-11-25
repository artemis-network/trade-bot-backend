import mongoose, { Schema, Model, Document } from "mongoose";
import { USER, UserDoc } from "./user.model";

export interface RazorPayInterface {
  userId: string | UserDoc;
  orderId: string;
  paymentId: string;
  signature: string;
  amount: number;
  isPaid: boolean;
}

export interface RazorpayDoc extends Document, RazorPayInterface {}

const razorpaySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: USER },
  orderId: { type: Schema.Types.String },
  paymentId: { type: Schema.Types.String },
  signature: { type: Schema.Types.String },
  amount: { type: Schema.Types.Number },
  isPaid: { type: Schema.Types.Boolean },
});

export const RAZORPAY = "RAZORPAY";

export const RazorpayModel: Model<RazorpayDoc> = mongoose.model<RazorpayDoc>(
  RAZORPAY,
  razorpaySchema
);
