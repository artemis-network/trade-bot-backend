import "dotenv/config";

const ADMIN = {
  username: process.env.ADMIN_USERNAME || "",
  email: process.env.ADMIN_EMAIL || "",
  password: process.env.ADMIN_PASSWORD || "",
};

const EMAIL_CONFIG = {
  username: process.env.EMAIL_AUTH_USER || "",
  password: process.env.EMAIL_AUTH_PASSWORD || "",
  port: process.env.EMAIL_VERIFICATION_PORT || 25,
  host: process.env.EMAIL_VERIFICATION_HOST || "",
  email: process.env.EMAIL_VERIFICATION_EMAIL || "",
};

const JWT_SECRET = process.env.JWT_SECRET || "";
const GOOGLE_OAUTH_CLIENT = process.env.GOOGLE_OUTH_CLIENT_CREDENTIAL || "";
const MONGO_DB_URL = process.env.MONGO_DB_URL || "";
const PORT = process.env.PORT || 5000;

const API_ADMIN_PASSWORD = process.env.API_ADMIN_PASSWORD || "";

const AWS_CREDS = {
  container: process.env.AWS_S3_CONTAINER || "",
  avatarContainer: process.env.AWS_S3_AVATAR_CONTAINER || "",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  accessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
};

export {
  PORT,
  ADMIN,
  AWS_CREDS,
  JWT_SECRET,
  MONGO_DB_URL,
  EMAIL_CONFIG,
  API_ADMIN_PASSWORD,
  GOOGLE_OAUTH_CLIENT,
  userPrefix,
};

const parentPrefix = "/trade-bot/api/v1";
const userPrefix = parentPrefix + "/users";
export const botsPrefix = parentPrefix + "/bots";
