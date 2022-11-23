import mongoose, { Schema, Model, Document } from "mongoose";
import { BOT, BotDoc } from "./bots.model";
import { USER, UserDoc } from "./user.model";

export interface BotConfigInterface {
  bot: BotDoc | string;
  user: UserDoc | string;
  leverage: number;
  stopLoss: number;
  takeProfit: number;
}

export interface BotConfig extends Document, BotConfigInterface {}

const botSchema = new Schema({
  bot: {
    type: Schema.Types.ObjectId,
    ref: BOT,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER,
  },
  leverage: {
    type: Schema.Types.Number,
  },
  stopLoss: {
    type: Schema.Types.Number,
  },
  takeProfit: {
    type: Schema.Types.Number,
  },
});

export const BOT_CONFIG = "BOT_CONFIG";

export const BotConfigModel: Model<BotConfig> = mongoose.model<BotConfig>(
  BOT_CONFIG,
  botSchema
);
