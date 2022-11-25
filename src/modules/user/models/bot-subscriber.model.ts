import mongoose, { Schema, Model, Document } from "mongoose";
import { BOT, BotDoc } from "./bots.model";
import { USER, UserDoc } from "./user.model";

export interface BotSubscriberInterface {
  bot: BotDoc | string;
  user: UserDoc | string;
  apiKey: string;
  apiSecret: string;
  createdOn: Date;
  status: boolean;
  leverage: number;
  stopLoss: number;
  takeProfit: number;
  quantity: number;
}

export interface BotSubscriberDoc extends Document, BotSubscriberInterface {}

const botSchema = new Schema({
  bot: {
    type: Schema.Types.ObjectId,
    ref: BOT,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER,
  },
  apiKey: { type: Schema.Types.String },
  apiSecret: { type: Schema.Types.String },
  createdOn: { type: Schema.Types.Date, default: new Date(Date.now()) },
  status: { type: Schema.Types.Boolean },
  leverage: { type: Schema.Types.Number },
  stopLoss: { type: Schema.Types.Number },
  takeProfit: { type: Schema.Types.Number },
  quantity: { type: Schema.Types.Number },
});

export const BOT_SUBSCRIBER = "BOT_SUBSCRIBER";

export const BotSubscriberModel: Model<BotSubscriberDoc> =
  mongoose.model<BotSubscriberDoc>(BOT_SUBSCRIBER, botSchema);
