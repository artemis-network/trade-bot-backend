import { UserAuthController } from "./controllers/user.controllers";

import express, { Request } from "express";
import { userPrefix } from "../../config";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "avatars/");
  },
  filename: async function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("avatar");

router.post(`${userPrefix}/login`, UserAuthController.loginUser);
router.post(`${userPrefix}/register`, UserAuthController.registerUser);
router.post(`${userPrefix}/google-login`, UserAuthController.googleLogin);
router.get(`${userPrefix}/validate/:token`, UserAuthController.validateToken);

router.post(
  `${userPrefix}/forgot-password/request`,
  UserAuthController.forgotPasswordSendRequest
);
router.post(
  `${userPrefix}/change-password/:token`,
  UserAuthController.changePassword
);

router.post(`${userPrefix}/verify-user`, UserAuthController.verifyUserEmail);

export { router as userRoutes };
