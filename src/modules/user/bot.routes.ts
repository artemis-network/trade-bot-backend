import express from "express";
import { botsPrefix } from "../../config";
import { BotController } from "./controllers/bot.controller";

const router = express.Router();
router.get(`${botsPrefix}`, BotController.getBots);

export { router as botRoutes };
