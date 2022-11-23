import { Request, Response } from "express";
import { db } from "../../../../db";
const { BotModel } = db;

export const getBots = async (req: Request, res: Response) => {
  try {
    const response = await BotModel.find();
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json(error);
  }
};
