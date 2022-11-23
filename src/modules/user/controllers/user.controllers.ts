import { changePassword } from "./auth/changePassword.controller";
import { forgotPasswordSendRequest } from "./auth/forgotPasswordRequest.controller";
import { googleLogin } from "./auth/googleLogin.controller";
import { loginUser } from "./auth/loginUserController";
import { registerUser } from "./auth/registerUser.controller";
import { validateToken } from "./auth/validateToken.controller";
import { verifyUserEmail } from "./auth/verifyUserEmail.controller";

export const UserAuthController = {
  changePassword,
  forgotPasswordSendRequest,
  googleLogin,
  loginUser,
  registerUser,
  validateToken,
  verifyUserEmail,
};
