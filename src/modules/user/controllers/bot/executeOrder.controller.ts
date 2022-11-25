import { Request, Response } from "express";
import Binance from "node-binance-api";
import { Exchange, Market } from "../../enums";
import { BotSubscriberDoc } from "../../models/bot-subscriber.model";
import { BotModel } from "../../models/bots.model";

export const executeOrder = async (req: Request, res: Response) => {
  try {
    const { botId, position, trade } = req.body;
    const bot = await BotModel.findById(botId);
    const binance = (apiKey: string, apiSecret: string) => {
      return new Binance().options({
        apiKey: apiKey,
        apiSecret: apiSecret,
      });
    };
    if (bot !== null) {
      const subscibers = bot.subscribers as BotSubscriberDoc[];
      subscibers.map(async (subsciber) => {
        const account = binance(subsciber.apiKey, subsciber.apiSecret);
        let order;
        if (trade === "BUY") {
          order = await account.futuresBuy(
            bot.coin,
            subsciber.quantity,
            position
          );
        }
        if (trade === "SELL") {
          order = await account.futuresSell(
            bot.coin,
            subsciber.quantity,
            position
          );
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

interface OrderConfig {
  coin: string;
  exchange: Exchange;
  market: Market;
  leverage: number;
  takeProfit: number;
  stopLoss: number;
  quantity: number;
}
class OrderFactory {
  // an extended factory for spot, futres, buy & sell
  static executeOrder = async (orderConfig: OrderConfig) => {};
}
