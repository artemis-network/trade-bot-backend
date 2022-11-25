import { Request, Response } from "express";
import Razorpay from "razorpay";

enum OrderStatus {
  FAILED = "FAILED",
  CREATED = "CREATED",
}

export const createBotOrder = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const instance = new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID,
      key_secret: process.env.RAZOR_PAY_KEY_SECRET,
    });
    const options = {
      amount: amount, // amount in smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(200).json(OrderStatus.FAILED);
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(200).json(OrderStatus.FAILED);
  }
};
