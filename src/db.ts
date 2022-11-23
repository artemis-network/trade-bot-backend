import mongoose from "mongoose";
import { MONGO_DB_URL } from "./config";

import {
  UserInterface,
  UserDoc,
  UserModel,
  USER,
} from "./modules/user/models/user.model";

mongoose
  .connect("mongodb://localhost:27017/trade-bot")
  .then(() => console.log("🚀  Database connection initialized..."))
  .catch((err) => console.log("👉  Database connection failed... " + err));

mongoose.connection
  .on("open", () => console.log("🚀  Database connected Successfully"))
  .on("error", (err) => console.log("👉  Error" + err))
  .on("disconnected", () => console.log("🚨  Database disconnected..."));

export const db = {
  // Modals
  UserModel,
};

export const namming = {
  USER,
};

export {
  // Types
  UserInterface,
};

export {
  // Docs
  UserDoc,
};
