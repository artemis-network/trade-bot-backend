import { getBots } from "./bot/getBots.controller";
import { executeOrder } from "./orders/executeOrder.controller";

export const BotController = {
  getBots,
  executeOrder,
};
