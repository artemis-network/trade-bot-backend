import mongoose, { Schema, Model, Document } from "mongoose";
import { Exchange, Market } from "../enums";

export interface BotInterface {
  name: string;
  pricePerMonth: number;
  exchange: Exchange;
  status: boolean;
  market: Market;
  createdOn: Date;
}

export interface BotDoc extends Document, BotInterface {}

const botSchema = new Schema({
  name: { type: Schema.Types.String },
  pricePerMonth: { type: Schema.Types.Number },
  exhange: { type: Schema.Types.String, enum: Exchange },
  status: { type: Schema.Types.Boolean },
  createdOn: { type: Schema.Types.Date, default: new Date(Date.now()) },
  market: { type: Schema.Types.String, enum: Market },
});

export const BOT = "BOT";

export const BotModel: Model<BotDoc> = mongoose.model<BotDoc>(BOT, botSchema);
