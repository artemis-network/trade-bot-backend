import cors from "cors";
import express, { Request, Response } from "express";
import { json } from "body-parser";
import bodyParser from "body-parser";

// import routes here
import { PORT } from "./config";
import { userRoutes } from "./modules/user/user.routes";

const app = express();

const init = async () => {
  console.log(`App is runing on port ${PORT}`);
};

// enables cors
app.use(cors());

// this code enables to send & recieve the json data
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// pass routes as args to app.use function
app.use(userRoutes);

// ping route
app.get("/", (req, res) => res.send("🚀  WELCOME TO AXLEGAMES"));

app.listen(PORT, async () => await init());
