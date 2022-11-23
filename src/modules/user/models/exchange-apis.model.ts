import mongoose, { Schema, Model, Document } from "mongoose";
import { Exchange } from "../enums";
import { BotDoc } from "./bots.model";
import { USER, UserDoc } from "./user.model";

export interface ExchangeApiInterface {
  name: string;
  apiId: string;
  apiKey: string;
  apiSecret: string;
  user: string | UserDoc;
  createdOn: Date;
  bot: BotDoc | string;
  status: boolean;
}

export interface ExchangeApiDoc extends ExchangeApiInterface, Document {}

const exchangeApiSchema = new Schema({
  name: { type: Schema.Types.String },
  apiId: { type: Schema.Types.String },
  apiKey: { type: Schema.Types.String },
  apiSecret: { type: Schema.Types.String },
  user: { type: Schema.Types.ObjectId, ref: USER },
  exchange: { type: Schema.Types.String, enum: Exchange },
  createdOn: { type: Schema.Types.Date, default: new Date(Date.now()) },
  status: { type: Schema.Types.Boolean },
});
export const EXCHANGE_API = "EXCHANGE_API";

export const ExchangeApiModel: Model<ExchangeApiDoc> =
  mongoose.model<ExchangeApiDoc>(EXCHANGE_API, exchangeApiSchema);
