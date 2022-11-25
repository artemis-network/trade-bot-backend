import mongoose, { Schema, Model, Document } from "mongoose";
import { Exchange, Market } from "../enums";
import { BotSubscriberDoc, BOT_SUBSCRIBER } from "./bot-subscriber.model";

export interface BotInterface {
  name: string;
  pricePerMonth: number;
  status: boolean;
  market: Market;
  exchange: Exchange;
  createdOn: Date;
  coin: string;
  subscribers: BotSubscriberDoc[] | string[];
  leverage: number;
  takeProfit: number;
  stopLoss: number;
}

export interface BotDoc extends Document, BotInterface {}

const botSchema = new Schema({
  name: { type: Schema.Types.String },
  pricePerMonth: { type: Schema.Types.Number },
  status: { type: Schema.Types.Boolean },
  createdOn: { type: Schema.Types.Date, default: new Date(Date.now()) },
  market: { type: Schema.Types.String, enum: Market },
  exchange: { type: Schema.Types.String, enum: Exchange },
  coin: { type: Schema.Types.String },
  subscibers: [{ type: Schema.Types.ObjectId, ref: BOT_SUBSCRIBER }],
  leverage: { type: Schema.Types.Number },
  stopLoss: { type: Schema.Types.Number },
  takeProfit: { type: Schema.Types.Number },
});

export const BOT = "BOT";

export const BotModel: Model<BotDoc> = mongoose.model<BotDoc>(BOT, botSchema);
