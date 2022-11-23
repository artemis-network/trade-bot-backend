import { db } from "./db";
import { Role } from "./modules/user/services/user.service";
import { ADMIN } from "./config";
import bcrypt from "bcrypt";
import { BotModel } from "./modules/user/models/bots.model";
import { bots } from "./modules/user/data/bots.data";

const { UserModel } = db;

export class BootStrap {
  static initUsers = async () => {
    const users = (await UserModel.find()).length;
    if (users <= 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(ADMIN.password, salt);
      const { _id } = await UserModel.create({
        username: ADMIN.username,
        email: ADMIN.email,
        password: hash,
        token: "",
        isActivated: true,
        isGoogleAccount: false,
        isVerified: true,
        userType: Role.ADMIN.toString(),
      });
    }
  };

  static loadBots = async () => {
    const count = await BotModel.countDocuments();
    if (count <= 0) {
      bots.map(async (bot) => {
        await BotModel.create(bot);
      });
    }
  };
}
