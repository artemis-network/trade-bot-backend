import { Request, Response } from "express";
import { BotSubscriberModel } from "../../models/bot-subscriber.model";
import { BotModel } from "../../models/bots.model";
import { RazorpayModel } from "../../models/razorpay.model";

export const subscribeToBot = async (req: Request, res: Response) => {
  try {
    const {
      botId,
      userId,
      apiKey,
      apiSecret,
      amount,
      razorpayPaymentId,
      razorpayOrderId,
      razorPaySignature,
    } = req.body;

    await RazorpayModel.create({
      isPaid: true,
      amount: amount,
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorPaySignature,
      user: userId,
    });

    const bot = await BotModel.findById(botId);
    if (bot !== null) {
      const subsciber = await BotSubscriberModel.create({
        bot: botId,
        user: userId,
        apiKey: apiKey,
        apiSecret: apiSecret,
        status: true,
        leverage: bot.leverage,
        stopLoss: bot.stopLoss,
        takeProfit: bot.takeProfit,
      });
      await bot.updateOne({
        $set: {
          subscribers: [...bot.subscribers, subsciber._id],
        },
      });
      return res.status(200).json({});
    }
    return res.status(200).json({});
  } catch (error) {
    return res.status(200).json({});
  }
};
